import { useState, useEffect } from 'react';
import ServiceForm from '../components/ServiceForm';
import { getServices, createService, updateService, deleteService } from '../services/serviceApi';

export default function ServicesTest() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const categories = [
    { id: 1, name: "Garde d'animaux" },
    { id: 2, name: 'Toilettage' },
    { id: 3, name: 'Éducation & Dressage' },
  ];

  const fetchServices = async () => {
    try {
      const response = await getServices();
      setServices(response.data.data || response.data);
    } catch (err) {
      console.error('Erreur chargement services:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

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
        setMessage(' Service créé avec succès !');
      }
      fetchServices();
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else if (err.response?.status === 403) {
        alert("Action non autorisée (Seul le propriétaire Pro peut modifier/supprimer)");
      } else if (err.response?.status === 401) {
        alert("Veuillez vous connecter d'abord !");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingService(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce service ?')) {
      try {
        await deleteService(id);
        setMessage('Service supprimé avec succès !');
        fetchServices();
      } catch (err) {
        console.error('Erreur suppression:', err.response?.data || err);
        if (err.response?.status === 403) {
          alert("Vous n'êtes pas autorisé à supprimer ce service !");
        } else if (err.response?.status === 401) {
          alert("Session expirée. Veuillez vous reconnecter.");
        } else {
          alert("Erreur lors de la suppression du service.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] p-6 space-y-8">
      {message && (
        <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl text-center font-medium max-w-xl mx-auto">
          {message}
        </div>
      )}

      {}
      <div className="max-w-xl mx-auto">
        {editingService && (
          <div className="mb-2 flex justify-between items-center bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-800 text-sm">
            <span>Modification du service: <strong>{editingService.title}</strong></span>
            <button 
              onClick={handleCancelEdit} 
              className="text-xs bg-amber-200 hover:bg-amber-300 px-2 py-1 rounded font-semibold text-amber-900"
            >
              Annuler
            </button>
          </div>
        )}
        <ServiceForm 
          categories={categories} 
          initialData={editingService} 
          onSubmit={handleSubmitService} 
          isLoading={isLoading} 
        />
      </div>

      {}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-xl mx-auto space-y-4">
        <h3 className="text-xl font-bold text-[#0c3239]">Mes Services</h3>
        {services.length === 0 ? (
          <p className="text-gray-400 text-sm">Aucun service pour le moment.</p>
        ) : (
          services.map((s) => (
            <div key={s.id} className="p-4 border rounded-xl bg-gray-50 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-[#0c3239] text-base">{s.title}</h4>
                <p className="text-emerald-700 font-bold text-sm">{s.price} DH / heure</p>
                {s.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{s.description}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleEdit(s)} 
                  className="px-3 py-1 bg-teal-50 hover:bg-teal-100 text-teal-700 text-xs font-semibold rounded-lg border border-teal-200"
                >
                  Modifier
                </button>
                <button 
                  onClick={() => handleDelete(s.id)} 
                  className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-lg border border-red-200"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}