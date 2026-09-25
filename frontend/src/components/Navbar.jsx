import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const dashboardPath = user?.role === 'pro' ? '/pro/dashboard' : '/dashboard';

  return (
    <nav className="bg-[#0D3B36] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        
        <div 
          onClick={() => navigate(dashboardPath)}
          className="text-2xl font-black tracking-tight cursor-pointer flex items-center gap-2"
        >
          <span className="text-[#FFB2C9]">•</span> PetCare <span className="text-[#FFB2C9]">•</span>
        </div>

        
        <div className="flex items-center gap-3 sm:gap-4">
          
          
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 text-xs font-bold bg-[#124842] hover:bg-[#185d55] px-4 py-2 rounded-full text-white transition-all border border-emerald-800 shadow-sm"
          >
            
            <span>
              {user?.name ? `${user.name} ` : 'Visiteur'}
              <span className="text-[#88B04B] font-extrabold text-[10px] uppercase ml-1">
                ({user?.role || 'Guest'})
              </span>
            </span>
          </button>

          
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-[#FFB2C9]/10 hover:bg-[#FFB2C9] text-[#FFB2C9] hover:text-[#0D3B36] px-4 py-2 rounded-full text-xs font-black transition-all border border-[#FFB2C9]/30 shadow-sm cursor-pointer"
          >
            
            <span className="hidden sm:inline">Déconnexion</span>
          </button>

        </div>
      </div>
    </nav>
  );
}