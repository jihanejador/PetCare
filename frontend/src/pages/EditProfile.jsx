import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../services/serviceApi';

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    description: '',
  });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProfile()
      .then((res) => {
        const data = res.data;
        setFormData({
          name: data.name || '',
          phone: data.phone || '',
          city: data.city || '',
          description: data.description || '',
        });
        if (data.photo) {
          setPreview(`http://127.0.0.1:8000/storage/${data.photo}`);
        }
      })
      .catch((err) => console.error('Erreur chargement profil:', err));
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('phone', formData.phone);
    data.append('city', formData.city);
    data.append('description', formData.description);
    if (photo) {
      data.append('photo', photo);
    }

    try {
      const response = await updateProfile(data);
      setMessage('Profil mis à jour avec succès !');
      
      const updatedUser = response.data.user;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      if (setUser) setUser(updatedUser);
    } catch (err) {
      console.error('Erreur update:', err);
      setMessage('Erreur lors de la mise à jour.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-sm border">
      <h2 className="text-2xl font-bold text-[#0c3239] mb-6">Modifier mon profil</h2>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm text-center font-medium ${
          message.includes('succès') ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 bg-gray-100 flex items-center justify-center">
            {preview ? (
              <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400 font-bold text-2xl">
                {formData.name ? formData.name[0].toUpperCase() : 'U'}
              </span>
            )}
          </div>
          <label className="cursor-pointer text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200">
            Changer la photo
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nom complet</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full mt-1 p-2.5 border rounded-xl focus:ring-2 focus:ring-[#0c3239] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full mt-1 p-2.5 border rounded-xl focus:ring-2 focus:ring-[#0c3239] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Ville</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            className="w-full mt-1 p-2.5 border rounded-xl focus:ring-2 focus:ring-[#0c3239] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full mt-1 p-2.5 border rounded-xl focus:ring-2 focus:ring-[#0c3239] focus:outline-none"
            maxLength={1000}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0c3239] text-white py-3 rounded-xl font-bold hover:bg-[#15464f] transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
        </button>
      </form>
    </div>
  );
}