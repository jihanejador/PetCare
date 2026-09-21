import { useState, useEffect, useRef } from 'react';
import { getConversation, sendMessage } from '../services/serviceApi';

export default function ChatModal({ isOpen, onClose, recipient }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    if (!recipient?.id) return;
    try {
      const res = await getConversation(recipient.id);
      setMessages(res.data || []);
    } catch (err) {
      console.error('Erreur chargement messages:', err);
    }
  };

  useEffect(() => {
    if (isOpen && recipient?.id) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, recipient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !recipient?.id) return;

    setLoading(true);
    try {
      const res = await sendMessage(recipient.id, newMessage);
      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
    } catch (err) {
      console.error('Erreur envoi message:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !recipient) return null;

  const currentUserId = JSON.parse(atob(localStorage.getItem('token')?.split('.')[1] || '{}'))?.sub;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-md h-[500px] flex flex-col shadow-2xl overflow-hidden relative">
        {}
        <div className="bg-[#0c3239] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-[#0c3239] font-black flex items-center justify-center text-sm border border-white/20">
              {recipient.name ? recipient.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">{recipient.name}</h3>
              <span className="text-[10px] text-emerald-400 font-semibold">● En ligne</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white font-bold text-lg cursor-pointer px-2"
          >
            ✕
          </button>
        </div>

        {}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-xs py-10">
              Aucun message. Envoyez le premier message !
            </div>
          ) : (
            messages.map((msg) => {
              const isMe = Number(msg.sender_id) !== Number(recipient.id);
              return (
                <div
                  key={msg.id || Math.random()}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs font-medium shadow-sm ${
                      isMe
                        ? 'bg-[#0c3239] text-white rounded-br-none'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p className="break-words">{msg.content}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        isMe ? 'text-gray-300' : 'text-gray-400'
                      }`}
                    >
                      {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez votre message..."
            className="flex-1 text-xs p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0c3239]"
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="px-4 py-2.5 bg-[#82c341] hover:bg-[#72ad37] text-[#0c3239] font-black text-xs rounded-xl transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? '...' : 'Envoyer'}
          </button>
        </form>
      </div>
    </div>
  );
}