import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

      <div className="flex items-center gap-6">
        <span className="text-xs bg-white/10 px-3 py-1.5 rounded-full font-semibold text-gray-200">
          {user?.name ? ` ${user.name} (${user.role?.toUpperCase()})` : 'Visiteur'}
        </span>

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