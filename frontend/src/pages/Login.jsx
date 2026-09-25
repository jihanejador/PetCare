import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Lock, Mail} from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await login(formData);
      if (data.user?.role === 'pro') {
        navigate('/pro/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Identifiants incorrects');
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
            <span className="text-sm text-emerald-200 hidden sm:inline">Pas encore de compte ?</span>
            <Link 
              to="/register" 
              className="bg-[#FFB2C9] hover:bg-[#ff9eb9] text-[#0D3B36] font-black text-sm px-6 py-2.5 rounded-full transition-all shadow-md transform hover:scale-105"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 my-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#EAF2EA] text-[#0D3B36] mb-2">
              <Heart className="w-6 h-6 text-[#FFB2C9] fill-[#FFB2C9]" />
            </div>
            <h2 className="text-3xl font-black text-[#0D3B36]">Connexion</h2>
            <p className="text-sm text-slate-500 font-medium">Ravi de vous revoir parmi nous !</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-bold p-3 rounded-xl border border-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="email" 
                  required 
                  placeholder="exemple@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm transition-all" 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0D3B36] uppercase tracking-wider mb-1">Mot de passe</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-[#F7F9F7] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D3B36] font-medium text-sm transition-all" 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#0D3B36] hover:bg-[#15534c] text-white py-3.5 rounded-xl font-bold transition duration-200 shadow-lg flex items-center justify-center gap-2 mt-2"
            >
              Se connecter 
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 font-medium pt-2">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="text-[#0D3B36] font-bold underline hover:text-[#88B04B]">
              Créer un compte
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