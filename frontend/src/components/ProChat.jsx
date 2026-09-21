import { useState, useEffect } from 'react';
import axios from 'axios';
import ChatModal from './ChatModal';

export default function ProChat() {
  const [conversations, setConversations] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://127.0.0.1:8000/api/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000); // Refresh every 5s
    return () => clearInterval(interval);
  }, []);

  const openConversation = (client) => {
    setSelectedClient(client);
    setIsChatOpen(true);
  };

  if (loading) return <div className="p-4 text-xs text-gray-500">Chargement...</div>;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-[#0c3239] mb-4">Messages / Discussions</h2>

      {conversations.length === 0 ? (
        <p className="text-xs text-gray-400">Aucune discussion pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => (
            <div
              key={conv.user.id}
              onClick={() => openConversation(conv.user)}
              className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0c3239] text-white flex items-center justify-center font-bold text-sm">
                  {conv.user.name ? conv.user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gray-800">{conv.user.name}</h4>
                  <p className="text-[11px] text-gray-500 truncate max-w-[180px]">
                    {conv.last_message}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[9px] text-gray-400">
                  {new Date(conv.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {conv.unread_count > 0 && (
                  <span className="bg-[#82c341] text-[#0c3239] text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {conv.unread_count}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          fetchConversations();
        }}
        recipient={selectedClient}
      />
    </div>
  );
}