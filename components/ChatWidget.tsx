import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Bot, Maximize2, Minimize2, Send, X } from 'lucide-react';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: 'Curvexly AI online. How can I optimize your workflow?' }
    ]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if(isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;
        
        const userMsg: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock AI Response with delay
        setTimeout(() => {
            const mockResponses = [
                "I recommend trying Midjourney for that visual style.",
                "Based on your query, Claude 3.5 Sonnet is the best fit for coding tasks.",
                "ChatGPT is versatile enough to handle that request effectively.",
                "Have you looked at the 'Audio' category? ElevenLabs might solve this."
            ];
            const responseText = mockResponses[Math.floor(Math.random() * mockResponses.length)];
            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div id="gemini-widget">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-curvex-border ${isOpen ? 'bg-curvex-text text-curvex-bg' : 'bg-curvex-card text-curvex-text hover:scale-105 hover:shadow-premium'}`}
                aria-label="AI Chat"
            >
                {isOpen ? <X size={20} /> : <Sparkles size={20} fill="currentColor" />}
            </button>

            {isOpen && (
                <div className={`fixed bottom-24 right-6 z-40 transition-all duration-300 flex flex-col glass-panel rounded-lg shadow-2xl overflow-hidden animate-float-in border border-curvex-border ${isExpanded ? 'w-[90vw] h-[80vh] sm:w-[600px]' : 'w-[90vw] sm:w-[400px] h-[500px]'}`}>
                    <div className="p-3 bg-curvex-card border-b border-curvex-border flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-curvex-text flex items-center justify-center">
                            <Bot className="text-curvex-bg" size={14} />
                        </div>
                        <div><h3 className="font-bold text-curvex-text text-xs tracking-wide">CURVEXLY AI</h3></div>
                        <div className="ml-auto flex gap-2">
                            <button onClick={() => setIsExpanded(!isExpanded)} className="text-curvex-muted hover:text-curvex-text transition-colors">
                                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-curvex-bg">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`p-3 rounded-lg text-xs md:text-sm max-w-[85%] leading-relaxed ${msg.role === 'user' ? 'bg-curvex-text text-curvex-bg' : 'bg-curvex-card text-curvex-text border border-curvex-border'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-curvex-border bg-curvex-card">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask for recommendations..." 
                                className="w-full bg-curvex-input text-curvex-text rounded-md pl-3 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-curvex-border border border-transparent transition-all placeholder-curvex-muted"
                            />
                            <button onClick={handleSend} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-curvex-text rounded text-curvex-bg hover:opacity-80 transition-colors">
                                <Send size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
