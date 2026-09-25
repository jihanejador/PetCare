import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Lock, Mail, User, Phone, MapPin } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', password_confirmation: '', role: 'client', city: '', phone: ''
  });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const res = await register(formData);
      if (res.user?.role === 'pro') {
        navigate('/pro/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrors(err.response?.data?.errors || {});
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-[#0D3B36] font-sans flex flex-col justify-between">
      <header className="bg-[#0D3B36] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span className="text-[#FFB2C9]">•</span> PetCare <span className="text-[#FFB2C9]">•</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-emerald-200 hidden sm:inline">Déjà inscrit ?</span>
            <Link 
              to="/login" 
              className="bg-[#FFB2C9] hover:bg-[#ff9eb9] text-[#0D3B36] font-black text-sm px-6 py-2.5 rounded-full transition-all shadow-md transform hover:scale-105"
            >
              Connexion
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#EAF2EA] text-[#0D3B36] mb-2">
              <Heart className="w-6 h-6 text-[#88B04B] fill-[#88B04B]" />
            </div>
            <h2 className="text-3xl font-black text-[#0D3B36]">Créer un compte</h2>
            <p className="text-sm text-slate-500 font-medium">Rejoignez la communauté PetCare dès aujourd'hui</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Nom complet</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-2.5 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm" 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name[0]}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  required 
                  placeholder="exemple@email.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm" 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{errors.email[0]}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Téléphone</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="tel" 
                    placeholder="06 00 00 00 00"
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm" 
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Ville</label>
                <div className="relative">
                  <MapPin className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Casablanca"
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm" 
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Je suis un</label>
              <select 
                className="w-full px-4 py-2.5 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm" 
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="client">Propriétaire d'animal (Client)</option>
                <option value="pro">Professionnel (Pet Sitter / Service)</option>
              </select>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Mot de passe</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm" 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  />
                </div>
                {errors.password && <p className="text-red-500 text-xs font-semibold mt-1">{errors.password[0]}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Confirmation</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="password" 
                    required 
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm" 
                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} 
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#0D3B36] hover:bg-[#15534c] text-white py-3.5 rounded-xl font-bold transition duration-200 shadow-lg flex items-center justify-center gap-2 mt-4"
            >
              S'inscrire 
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 font-medium pt-2">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="text-[#0D3B36] font-bold underline hover:text-[#88B04B]">
              Se connecter
            </Link>
          </p>
        </div>
      </main>

      <footer className="bg-[#0D3B36] text-emerald-300 py-4 text-center text-xs">
        © {new Date().getFullYear()} PetCare. All Rights Reserved.
      </footer>
    </div>
  );
}