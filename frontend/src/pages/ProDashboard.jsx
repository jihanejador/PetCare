import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ServiceForm from '../components/ServiceForm';
import { getServices, createService, updateService, deleteService } from '../services/serviceApi';

export default function ProDashboard() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    { id: 1, name: "Garde d'animaux" },
    { id: 2, name: 'Toilettage' },
    { id: 3, name: 'Éducation & Dressage' },
    { id: 4, name: 'Vétérinaire' },
  ];

  const fetchMyServices = async () => {
    try {
      const res = await getServices();
      const allServices = res.data.data || res.data;
      setServices(allServices);
    } catch (err) {
      console.error('Erreur chargement services:', err);
    }
  };

  useEffect(() => {
    fetchMyServices();
  }, []);

  const handleSubmitService = async (formData, setErrors) => {
    setIsLoading(true);
    setMessage('');
    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        setMessage(' Service modifié avec succès !');
        setEditingService(null);
      } else {
        await createService(formData);
        setMessage(' Service publié avec succès !');
      }
      fetchMyServices();
      return true;
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.status === 403) {
        alert("Accès refusé ! Vous n'êtes pas autorisé.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce service ?')) {
      try {
        await deleteService(id);
        setMessage(' Service supprimé avec succès !');
        fetchMyServices();
      } catch (err) {
        alert('Erreur lors de la suppression.');
      }
    }
  };

  return (
    <div className="bg-[#faf9f6] min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-[#0c3239] text-white p-6 rounded-3xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Espace Professionnel</h1>
            <p className="text-xs text-gray-300 mt-1">Gérez vos prestations et publiez de nouvelles offres</p>
          </div>
          <span className="bg-[#82c341] text-[#0c3239] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
            Compte PRO
          </span>
        </div>

        {message && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ServiceForm
              categories={categories}
              initialData={editingService}
              onSubmit={handleSubmitService}
              isLoading={isLoading}
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-extrabold text-[#0c3239]">Mes Services Publiés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-[#0c3239]">{item.title}</h3>
                      <span className="text-xs bg-[#82c341]/20 text-[#0c3239] font-black px-2.5 py-1 rounded-full">
                        {item.price} DH/h
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex justify-end gap-2 pt-3 border-t border-gray-50">
                    <button
                      onClick={() => { setEditingService(item); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold rounded-xl"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}