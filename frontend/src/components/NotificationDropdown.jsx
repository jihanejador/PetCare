import { useState, useEffect } from 'react';
import axios from 'axios';

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await axios.get('http://127.0.0.1:8000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Refresh auto كل 5 ثواني باش يجيو التنبيهات الجداد
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  // Marquer toutes comme lues
  const handleMarkAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/api/notifications/mark-as-read', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (err) {
      console.error('Erreur mark-as-read:', err);
    }
  };

  // Supprimer une notification
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://127.0.0.1:8000/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.filter(n => n.id !== id));
    } catch (err) {
      console.error('Erreur suppression notification:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">
      {/* Icon Bell */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && unreadCount > 0) {
            handleMarkAsRead();
          }
        }}
        className="relative p-2.5 bg-gray-100 hover:bg-gray-200 rounded-2xl transition flex items-center justify-center text-gray-700"
        title="Notifications"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 z-50 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <h3 className="text-xs font-extrabold text-[#0c3239] uppercase tracking-wider">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full">
                {unreadCount} non lue(s)
              </span>
            )}
          </div>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <p className="text-center text-xs text-gray-400 py-6">
                Aucune notification pour le moment.
              </p>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-2xl transition flex items-start justify-between gap-2 ${
                    !notif.is_read ? 'bg-emerald-50/70 border border-emerald-100' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-[#0c3239]">{notif.title}</h4>
                    <p className="text-[11px] text-gray-600 leading-snug">{notif.message}</p>
                    <span className="text-[9px] text-gray-400 block pt-1">
                      {new Date(notif.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleDelete(notif.id, e)}
                    className="text-gray-300 hover:text-red-500 text-xs font-bold transition p-1"
                    title="Supprimer"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}