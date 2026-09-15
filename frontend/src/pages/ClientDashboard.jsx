import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getServices } from '../services/serviceApi';
import Navbar from '../components/Navbar';

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchFilteredServices();
  }, [search, city, categoryId, page]);

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-12">
      <Navbar />

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

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black text-[#0c3239]">Services Disponibles</h2>
          <span className="text-xs font-bold text-gray-500">{pagination.total || 0} résultat(s)</span>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500 font-bold">Chargement des services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => {
              const proPhoto = s.user?.photo || s.user?.avatar;
              const photoUrl = proPhoto
                ? (proPhoto.startsWith('http') ? proPhoto : `http://127.0.0.1:8000/storage/${proPhoto}`)
                : null;

              return (
                <div key={s.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold bg-[#f3a6b8]/20 text-[#0c3239] px-3 py-1 rounded-full">
                        {s.category?.name || 'Général'}
                      </span>
                      <span className="text-xs font-semibold text-gray-400">📍 {s.user?.city || 'Maroc'}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0c3239]">{s.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{s.description}</p>
                    
                    {}
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
                    <button className="px-5 py-2.5 bg-[#0c3239] hover:bg-[#82c341] hover:text-[#0c3239] text-white text-xs font-extrabold rounded-full transition-all shadow-sm">
                      Réserver
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {pagination.last_page > 1 && (
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
    </div>
  );
}