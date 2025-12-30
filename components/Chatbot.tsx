import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([
    { text: "Bonjour ! Je suis l'assistant Domygo. Comment puis-je vous aider aujourd'hui ?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, isBot: false }]);
    setInput("");
    
    // Fake response
    setTimeout(() => {
       setMessages(prev => [...prev, { text: "Merci pour votre message. Un agent va prendre le relais ou je peux répondre à des questions simples sur votre commande.", isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-2xl hover:bg-red-700 transition z-40 flex items-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
        <span className="font-bold pr-2">Aide</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col border border-gray-200 overflow-hidden">
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="font-bold">Support Domygo 24/7</span>
             </div>
             <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
             {messages.map((msg, i) => (
               <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                 <div className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.isBot ? 'bg-white border text-gray-800 rounded-bl-none' : 'bg-red-600 text-white rounded-br-none'}`}>
                   {msg.text}
                 </div>
               </div>
             ))}
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <input 
              type="text" 
              className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-red-600"
              placeholder="Écrivez votre message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend} className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
