import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-[#0c3239] text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div 
        onClick={() => navigate(user?.role === 'pro' ? '/pro/dashboard' : '/dashboard')}
        className="text-2xl font-black tracking-tight cursor-pointer flex items-center gap-2"
      >
        <span className="text-[#82c341]">- BestPet -</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Component NotificationDropdown */}
        {user && <NotificationDropdown />}

        <button
          onClick={() => navigate('/profile')}
          className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full font-semibold text-gray-200 transition-all cursor-pointer border border-white/10"
        >
          {user?.name ? `${user.name} (${user.role?.toUpperCase()})` : 'Visiteur'}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500/20 hover:bg-red-500 text-red-200 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-red-500/30"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}