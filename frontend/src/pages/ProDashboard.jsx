import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ServiceForm from '../components/ServiceForm';
import { getServices, createService, updateService, deleteService } from '../services/serviceApi';

export default function ProDashboard() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [rendezvousList, setRendezvousList] = useState([]);
  const [loadingRendezvous, setLoadingRendezvous] = useState(false);

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

  const fetchRendezvous = async () => {
    setLoadingRendezvous(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://127.0.0.1:8000/api/pro/rendezvous', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRendezvousList(res.data);
    } catch (err) {
      console.error('Erreur chargement rendezvous:', err);
    } finally {
      setLoadingRendezvous(false);
    }
  };

  useEffect(() => {
    fetchMyServices();
    fetchRendezvous();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://127.0.0.1:8000/api/rendezvous/${id}/status`,
        { status: newStatus },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
        }
      );

      setMessage(`Statut mis à jour : ${newStatus}`);
      
      setRendezvousList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
      );

      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Erreur changement statut:', err.response?.data || err);
      const serverMessage = err.response?.data?.message || 'Erreur lors de la mise à jour du statut.';
      alert(`Erreur: ${serverMessage}`);
    }
  };

  const handleSubmitService = async (formData, setErrors) => {
    setIsLoading(true);
    setMessage('');
    try {
      if (editingService) {
        await updateService(editingService.id, formData);
        setMessage('Service modifié avec succès !');
        setEditingService(null);
      } else {
        await createService(formData);
        setMessage('Service publié avec succès !');
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
        setMessage('Service supprimé avec succès !');
        fetchMyServices();
      } catch (err) {
        alert('Erreur lors de la suppression.');
      }
    }
  };

  const totalCompleted = rendezvousList.filter(
    (r) => r.status?.toLowerCase() === 'completed' || r.status?.toLowerCase() === 'accepted'
  ).length;

  const validRatings = services
    .map((s) => Number(s.reviews_avg_rating || s.avg_rating || 0))
    .filter((rating) => rating > 0);

  const averageRating = validRatings.length
    ? (validRatings.reduce((acc, curr) => acc + curr, 0) / validRatings.length).toFixed(1)
    : '0.0';

  return (
    <div className="bg-[#faf9f6] min-h-screen pb-12">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="bg-[#0c3239] text-white p-6 rounded-3xl shadow-lg flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Espace Professionnel</h1>
            <p className="text-xs text-gray-300 mt-1">Gérez vos prestations et traitez les demandes de rendez-vous</p>
          </div>
          <span className="bg-[#82c341] text-[#0c3239] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
            Compte PRO
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 block uppercase">Services actifs</span>
              <span className="text-2xl font-black text-[#0c3239]">{services.length}</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#82c341] flex items-center justify-center font-bold text-lg">
              
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 block uppercase">Missions traitées</span>
              <span className="text-2xl font-black text-[#0c3239]">{totalCompleted}</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
              
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 block uppercase">Note moyenne</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-[#0c3239]">{averageRating}</span>
                <span className="text-amber-400 text-lg">★</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold text-lg">
              ⭐
            </div>
          </div>
        </div>

        {message && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-2xl text-xs font-bold">
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#0c3239]">Demandes de Rendez-vous</h2>
            <span className="text-xs font-bold text-gray-500">{rendezvousList.length} demande(s)</span>
          </div>

          {loadingRendezvous ? (
            <div className="text-center py-6 text-gray-500 font-bold text-xs">Chargement des demandes...</div>
          ) : rendezvousList.length === 0 ? (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 text-center text-xs font-bold text-gray-400">
              Aucune demande de rendez-vous reçue pour le moment.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rendezvousList.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-[#0c3239]">{item.client?.name || 'Client'}</span>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                        item.status === 'Completed' || item.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'Accepted' || item.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'Cancelled' || item.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600">Service : <span className="font-bold text-[#0c3239]">{item.service?.title}</span></p>
                    <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-xl font-medium">
                       {item.date} &nbsp;•&nbsp; {item.time}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-50 flex justify-end gap-2">
                    {item.status?.toLowerCase() === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Accepted')}
                          className="px-3 py-1.5 bg-[#82c341] hover:bg-[#72ad37] text-[#0c3239] text-xs font-black rounded-xl transition"
                        >
                          Accepter
                        </button>
                        <button
                          onClick={() => handleStatusChange(item.id, 'Cancelled')}
                          className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition"
                        >
                          Refuser
                        </button>
                      </>
                    ) : item.status?.toLowerCase() === 'accepted' ? (
                      <button
                        onClick={() => handleStatusChange(item.id, 'Completed')}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
                      >
                        Marquer comme terminé
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400 font-bold italic py-1">Demande traitée</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
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