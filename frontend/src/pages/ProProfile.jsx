import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

export default function ProProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pro, setPro] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/pros/${id}`)
      .then((res) => {
        setPro(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur profil pro:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="bg-[#faf9f6] min-h-screen">
        <Navbar />
        <div className="text-center py-20 font-bold text-gray-500">Chargement du profil...</div>
      </div>
    );
  }

  if (!pro) {
    return (
      <div className="bg-[#faf9f6] min-h-screen">
        <Navbar />
        <div className="text-center py-20 font-bold text-red-500">Professionnel introuvable.</div>
      </div>
    );
  }

  const photoUrl = pro.photo 
    ? (pro.photo.startsWith('http') ? pro.photo : `http://127.0.0.1:8000/storage/${pro.photo}`)
    : null;

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-12">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#0c3239] transition cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour aux services
        </button>

        {}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#82c341] shrink-0 bg-gray-100 flex items-center justify-center">
            {photoUrl ? (
              <img src={photoUrl} alt={pro.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-bold text-[#0c3239]">{pro.name?.charAt(0)}</span>
            )}
          </div>

          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h1 className="text-3xl font-black text-[#0c3239]">{pro.name}</h1>
              {}
              <div className="flex items-center justify-center md:justify-start gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full w-fit">
                <span className="text-amber-500 font-bold text-sm">⭐ {pro.avg_rating || '4.8'}</span>
                <span className="text-xs text-gray-500">({pro.reviews_count || 0} avis)</span>
              </div>
            </div>

            <p className="text-sm font-semibold text-[#82c341]">📍 {pro.city || 'Maroc'}</p>
            <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">{pro.description || 'Aucune description disponible pour ce professionnel.'}</p>
          </div>
        </div>

        {}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-[#0c3239]">Services proposés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pro.services?.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold bg-[#f3a6b8]/20 text-[#0c3239] px-2.5 py-0.5 rounded-full">
                    {service.category?.name || 'Général'}
                  </span>
                  <h3 className="font-bold text-[#0c3239] mt-2">{service.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1">{service.description}</p>
                  <p className="text-sm font-black text-[#82c341] mt-2">{service.price} DH/h</p>
                </div>
                <button className="px-4 py-2 bg-[#0c3239] hover:bg-[#82c341] hover:text-[#0c3239] text-white text-xs font-bold rounded-xl transition-all">
                  Réserver
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}