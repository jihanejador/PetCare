import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getServices, getFavorites, toggleFavorite } from '../services/serviceApi';
import Navbar from '../components/Navbar';

function StarRating({ rating, setRating = null, readOnly = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => setRating && setRating(star)}
          className={`text-base transition-transform ${
            !readOnly ? 'hover:scale-125 cursor-pointer' : 'cursor-default'
          } ${star <= Math.round(rating || 0) ? 'text-amber-400' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [myRendezvous, setMyRendezvous] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ date: '', time: '' });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState({ type: '', text: '' });

  const [selectedRdvForReview, setSelectedRdvForReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  const categories = [
    { id: 1, name: "Garde d'animaux" },
    { id: 2, name: 'Toilettage' },
    { id: 3, name: 'Éducation & Dressage' },
    { id: 4, name: 'Vétérinaire' }
  ];

  const fetchFilteredServices = async () => {
    setLoading(true);
    try {
      const res = await getServices({ search, city, category_id: categoryId, page });
      setServices(res.data.data || []);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total,
      });
    } catch (err) {
      console.error('Erreur chargement services:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRendezvous = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get('http://127.0.0.1:8000/api/rendezvous/client', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMyRendezvous(res.data || []);
    } catch (err) {
      console.error('Erreur chargement mes rendezvous:', err);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      const favs = res.data || [];
      setFavoriteIds(favs.map((f) => f.id));
    } catch (err) {
      console.error('Erreur chargement favoris:', err);
    }
  };

  useEffect(() => {
    fetchFilteredServices();
    fetchMyRendezvous();
    fetchFavorites();
  }, [search, city, categoryId, page]);

  const handleToggleFavorite = async (serviceId) => {
    try {
      const res = await toggleFavorite(serviceId);
      if (res.data.is_favorited) {
        setFavoriteIds((prev) => [...prev, serviceId]);
      } else {
        setFavoriteIds((prev) => prev.filter((id) => id !== serviceId));
      }
    } catch (err) {
      console.error('Erreur toggle favorite:', err);
    }
  };

  const handleBookService = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:8000/api/rendezvous',
        {
          service_id: selectedService.id,
          date: bookingData.date,
          time: bookingData.time,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setBookingMessage({ type: 'success', text: 'Rendez-vous demandé avec succès !' });
      await fetchMyRendezvous();

      setTimeout(() => {
        setIsModalOpen(false);
        setBookingMessage({ type: '', text: '' });
        setBookingData({ date: '', time: '' });
      }, 1200);
    } catch (err) {
      console.error('Erreur réservation:', err);
      setBookingMessage({ type: 'error', text: err.response?.data?.message || 'Erreur lors de la réservation.' });
    } finally {
      setBookingLoading(false);
    }
  };

  const handleCancelRDV = async (id) => {
    if (!window.confirm('Voulez-vous vraiment annuler ce rendez-vous ?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://127.0.0.1:8000/api/rendezvous/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMyRendezvous((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: 'Cancelled' } : item))
      );
    } catch (err) {
      console.error('Erreur annulation:', err);
      alert(err.response?.data?.message || "Erreur lors de l'annulation.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!selectedRdvForReview) return;

    setReviewLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://127.0.0.1:8000/api/reviews',
        {
          service_id: selectedRdvForReview.service_id,
          rendezvous_id: selectedRdvForReview.id,
          rating: rating,
          comment: comment,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Avis ajouté avec succès !');
      await fetchMyRendezvous();
      setSelectedRdvForReview(null);
      setComment('');
      setRating(5);
    } catch (err) {
      console.error('Erreur envoi avis:', err);
      const msg = err.response?.data?.message || 'Erreur lors de l’envoi de l’avis.';
      alert(msg);
    } finally {
      setReviewLoading(false);
    }
  };

  const displayedServices = showOnlyFavorites
    ? services.filter((s) => favoriteIds.includes(s.id))
    : services;

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-12">
      <Navbar />

      {}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-[#0c3239] rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl">
          <div className="max-w-xl space-y-4 z-10">
            <span className="text-[#82c341] text-xs md:text-sm font-bold tracking-wider uppercase">
              Worry-Free Pet Parenting
            </span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Big hearts for <span className="text-[#f3a6b8]">little paws..</span>
            </h1>
            <p className="text-gray-300 text-sm">
              We treat your furry family members exactly like our own. Trouvez rapidement les meilleurs professionnels près de chez vous.
            </p>

            <div className="bg-white p-3 rounded-2xl shadow-xl text-gray-800 grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
              <input
                type="text"
                placeholder="Nom ou service..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="p-3 bg-gray-50 rounded-xl text-xs focus:outline-none border border-gray-100"
              />
              <input
                type="text"
                placeholder="Ville (ex: Casablanca)"
                value={city}
                onChange={(e) => { setCity(e.target.value); setPage(1); }}
                className="p-3 bg-gray-50 rounded-xl text-xs focus:outline-none border border-gray-100"
              />
              <select
                value={categoryId}
                onChange={(e) => { setCategoryId(e.target.value); setPage(1); }}
                className="p-3 bg-gray-50 rounded-xl text-xs focus:outline-none border border-gray-100 font-medium"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden lg:flex gap-4">
            <div className="w-60 h-80 bg-[#82c341] rounded-full overflow-hidden flex items-end justify-center border-4 border-white/20 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500" 
                alt="Pet" 
                className="h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {}
      {myRendezvous.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
          <h2 className="text-2xl font-black text-[#0c3239]">Mes Rendez-vous</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myRendezvous.map((rdv) => (
              <div key={rdv.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-[#0c3239]">{rdv.service?.title || 'Service'}</h4>
                    <p className="text-xs text-gray-500">{rdv.date} à {rdv.time}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    rdv.status?.toLowerCase() === 'completed' ? 'bg-blue-100 text-blue-800' :
                    rdv.status?.toLowerCase() === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                    rdv.status?.toLowerCase() === 'cancelled' || rdv.status?.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {rdv.status}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-50 flex justify-end">
                  {rdv.status?.toLowerCase() === 'pending' && (
                    <button
                      onClick={() => handleCancelRDV(rdv.id)}
                      className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition cursor-pointer"
                    >
                      Annuler
                    </button>
                  )}

                  {rdv.status?.toLowerCase() === 'completed' && (
                    rdv.review ? (
                      <span className="text-xs text-emerald-600 font-bold italic py-1">Avis envoyé ✓</span>
                    ) : (
                      <button
                        onClick={() => setSelectedRdvForReview(rdv)}
                        className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-[#0c3239] text-xs font-black rounded-xl transition cursor-pointer"
                      >
                        ★ Laisser un avis
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-[#0c3239]">
              {showOnlyFavorites ? 'Mes Services Favoris' : 'Services Disponibles'}
            </h2>
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                showOnlyFavorites
                  ? 'bg-rose-500 text-white shadow-md'
                  : 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
              }`}
            >
              <span>{showOnlyFavorites ? '❤️ Tous les services' : '❤️ Voir Favoris'}</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">
                {favoriteIds.length}
              </span>
            </button>
          </div>
          <span className="text-xs font-bold text-gray-500">{displayedServices.length} résultat(s)</span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500 font-bold">Chargement des services...</div>
        ) : displayedServices.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl text-center text-gray-400 font-bold text-sm border border-gray-100">
            {showOnlyFavorites ? "Vous n'avez aucun service dans vos favoris." : "Aucun service trouvé."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedServices.map((s) => {
              const proPhoto = s.user?.photo || s.user?.avatar;
              const photoUrl = proPhoto
                ? (proPhoto.startsWith('http') ? proPhoto : `http://127.0.0.1:8000/storage/${proPhoto}`)
                : null;

              const isReserved = myRendezvous.some(
                (rdv) => Number(rdv.service_id) === Number(s.id) && 
                (rdv.status?.toLowerCase() === 'pending' || rdv.status?.toLowerCase() === 'accepted')
              );

              const isFav = favoriteIds.includes(s.id);
              const avgRating = Number(s.reviews_avg_rating || s.avg_rating || 0);
              const reviewsCount = s.reviews_count ?? s.reviews?.length ?? 0;

              return (
                <div key={s.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold bg-[#f3a6b8]/20 text-[#0c3239] px-3 py-1 rounded-full">
                        {s.category?.name || 'Général'}
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-400">{s.user?.city || 'Maroc'}</span>
                        
                        {}
                        <button
                          onClick={() => handleToggleFavorite(s.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 hover:bg-rose-50 border border-gray-100 transition cursor-pointer"
                          title={isFav ? "Retirer des favoris" : "Ajouter aux favoris"}
                        >
                          <span className="text-base leading-none">
                            {isFav ? '❤️' : '🤍'}
                          </span>
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-[#0c3239]">{s.title}</h3>

                    {}
                    <div className="flex items-center gap-1.5 pt-0.5">
                      <StarRating rating={avgRating} readOnly={true} />
                      <span className="text-xs font-black text-[#0c3239]">
                        {avgRating ? avgRating.toFixed(1) : '0.0'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        ({reviewsCount} avis)
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2">{s.description}</p>
                    
                    <div 
                      onClick={() => navigate(`/pro/${s.user?.id}`)} 
                      className="flex items-center gap-2 pt-2 border-t border-gray-50 cursor-pointer hover:opacity-80 transition"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                        {photoUrl ? (
                          <img 
                            src={photoUrl} 
                            alt={s.user?.name || 'Pro'} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="font-bold text-xs text-[#0c3239]">
                            {s.user?.name ? s.user.name.charAt(0).toUpperCase() : 'P'}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-gray-700 hover:underline">{s.user?.name}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase tracking-wider font-bold">Tarif</span>
                      <span className="text-lg font-black text-[#82c341]">{s.price} DH/h</span>
                    </div>

                    {isReserved ? (
                      <button 
                        disabled
                        className="px-5 py-2.5 bg-gray-200 text-gray-500 text-xs font-extrabold rounded-full cursor-not-allowed shadow-none"
                      >
                        Déjà réservé ✓
                      </button>
                    ) : (
                      <button 
                        onClick={() => {
                          setSelectedService(s);
                          setIsModalOpen(true);
                        }}
                        className="px-5 py-2.5 bg-[#0c3239] hover:bg-[#82c341] hover:text-[#0c3239] text-white text-xs font-extrabold rounded-full transition-all shadow-sm cursor-pointer"
                      >
                        Réserver
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!showOnlyFavorites && pagination.last_page > 1 && (
          <div className="flex justify-center gap-2 pt-8">
            {Array.from({ length: pagination.last_page }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setPage(index + 1)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                  page === index + 1 ? 'bg-[#0c3239] text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-[#0c3239]">Réserver un rendez-vous</h3>
            <p className="text-xs text-gray-500">
              Service : <span className="font-bold text-[#0c3239]">{selectedService.title}</span>
            </p>

            {bookingMessage.text && (
              <div className={`p-3 rounded-xl text-xs font-semibold text-center ${
                bookingMessage.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {bookingMessage.text}
              </div>
            )}

            <form onSubmit={handleBookService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Date du rendez-vous</label>
                <input 
                  type="date" 
                  required
                  value={bookingData.date}
                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0c3239] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Heure</label>
                <input 
                  type="time" 
                  required
                  value={bookingData.time}
                  onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-[#0c3239] outline-none"
                />
              </div>

              <button 
                type="submit" 
                disabled={bookingLoading}
                className="w-full bg-[#82c341] text-[#0c3239] py-3 rounded-xl font-black hover:bg-[#72ad37] transition duration-200 text-xs disabled:opacity-50 cursor-pointer"
              >
                {bookingLoading ? 'Envoi en cours...' : 'Confirmer la demande'}
              </button>
            </form>
          </div>
        </div>
      )}

      {}
      {selectedRdvForReview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button 
              type="button"
              onClick={() => setSelectedRdvForReview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold"
            >
              ✕
            </button>

            <h3 className="text-lg font-extrabold text-[#0c3239]">
              Évaluer le service: {selectedRdvForReview.service?.title}
            </h3>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Note (sur 5)</label>
                <StarRating rating={rating} setRating={setRating} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">Commentaire</label>
                <textarea
                  rows="3"
                  maxLength="500"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Partagez votre expérience (facultatif)..."
                  className="w-full text-xs p-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#82c341]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedRdvForReview(null)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={reviewLoading}
                  className="px-4 py-2 bg-[#82c341] hover:bg-[#72ad37] text-[#0c3239] text-xs font-black rounded-xl cursor-pointer"
                >
                  {reviewLoading ? 'Envoi...' : 'Publier l’avis'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}