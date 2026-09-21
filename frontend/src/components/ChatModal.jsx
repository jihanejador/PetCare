import { useState, useEffect } from 'react';
import axios from 'axios';

const safeAtob = (str) => {
  try {
    if (!str) return null;
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return atob(base64);
  } catch (e) {
    console.error("Erreur decode token:", e);
    return null;
  }
};

const getUserIdFromToken = (token) => {
  if (!token) return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payloadStr = safeAtob(parts[1]);
    if (!payloadStr) return null;
    const payload = JSON.parse(payloadStr);
    return payload.sub || payload.id || payload.user_id || null;
  } catch (err) {
    console.error("JWT parse error:", err);
    return null;
  }
};

export default function ChatModal({ isOpen, onClose, recipient }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userObj = JSON.parse(storedUser);
        if (userObj && userObj.id) {
          setCurrentUserId(userObj.id);
          return;
        }
      } catch (e) {
        console.error("Error parsing stored user:", e);
      }
    }

    if (token) {
      const uid = getUserIdFromToken(token);
      if (uid) {
        setCurrentUserId(uid);
      }
    }
  }, []);

  const fetchMessages = async () => {
    if (!recipient || !recipient.id) return;
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://127.0.0.1:8000/api/messages/${recipient.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data || []);
    } catch (err) {
      console.error("Erreur lors du chargement des messages:", err);
    }
  };

  useEffect(() => {
    if (isOpen && recipient) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 4000); 
      return () => clearInterval(interval);
    }
  }, [isOpen, recipient]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !recipient) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://127.0.0.1:8000/api/messages',
        {
          receiver_id: recipient.id,
          content: newMessage,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error("Erreur lors de l'envoi du message:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !recipient) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md h-[550px] flex flex-col shadow-2xl relative overflow-hidden">
        
        {}
        <div className="bg-[#0c3239] p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
              {recipient.name ? recipient.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">{recipient.name}</h3>
              <span className="text-[10px] text-[#82c341] font-medium">En ligne</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white font-bold text-lg px-2 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf9f6]">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-xs py-8">
              Aucun message pour l'instant. Dites bonjour ! 
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = String(msg.sender_id) === String(currentUserId);
              return (
                <div
                  key={msg.id || Math.random()}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-xs ${
                      isMe
                        ? 'bg-[#0c3239] text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                    }`}
                  >
                    {msg.content || msg.message} 
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1">
                    {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#0c3239]"
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="bg-[#82c341] text-[#0c3239] px-4 py-2.5 rounded-xl font-black text-xs hover:bg-[#72ad37] transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? '...' : 'Envoyer'}
          </button>
        </form>

      </div>
    </div>
  );
}