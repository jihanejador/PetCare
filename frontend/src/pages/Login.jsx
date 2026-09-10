import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData);
      alert('Connexion réussie !');
      window.location.href = '/test-services';
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Connexion</h2>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            required 
            className="w-full mt-1 p-2 border rounded-md" 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input 
            type="password" 
            required 
            className="w-full mt-1 p-2 border rounded-md" 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          />
        </div>

        <button type="submit" className="w-full bg-[#0c3239] hover:bg-[#15464f] text-white py-2 rounded-md transition duration-200 font-medium">
          Se connecter
        </button>
      </form>
    </div>
  );
}