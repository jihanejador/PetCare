import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', password_confirmation: '', role: 'client', city: '', phone: ''
  });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Inscription réussie !');
    } catch (err) {
      setErrors(err.response?.data?.errors || {});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Inscription</h2>
        <div>
          <label className="block text-sm font-medium">Nom complet</label>
          <input type="text" required className="w-full mt-1 p-2 border rounded-md" 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input type="email" required className="w-full mt-1 p-2 border rounded-md" 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Rôle</label>
          <select className="w-full mt-1 p-2 border rounded-md" 
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
            <option value="client">Propriétaire d'animal</option>
            <option value="pro">Professionnel</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Mot de passe</label>
          <input type="password" required className="w-full mt-1 p-2 border rounded-md" 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirmer le mot de passe</label>
          <input type="password" required className="w-full mt-1 p-2 border rounded-md" 
            onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} />
        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700">
          S'inscrire
        </button>
      </form>
    </div>
  );
}