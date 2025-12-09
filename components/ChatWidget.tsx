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
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if(isOpen) scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;
        
        const userMsg: ChatMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

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
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div id="gemini-widget">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border border-curvex-border ${isOpen ? 'bg-curvex-text text-curvex-bg rotate-90' : 'bg-curvex-card text-curvex-text hover:scale-110 hover:shadow-premium'}`}
                aria-label="AI Chat"
            >
                {isOpen ? <X size={20} /> : <Sparkles size={20} fill="currentColor" />}
            </button>

            {isOpen && (
                <div className={`fixed bottom-24 right-6 z-40 transition-all duration-500 ease-out flex flex-col glass-panel rounded-2xl shadow-2xl overflow-hidden animate-float-in border border-curvex-border ${isExpanded ? 'w-[90vw] h-[80vh] sm:w-[600px]' : 'w-[90vw] sm:w-[380px] h-[500px]'}`}>
                    <div className="p-4 bg-curvex-card/80 backdrop-blur-md border-b border-curvex-border flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-curvex-text flex items-center justify-center shadow-md">
                            <Bot className="text-curvex-bg" size={18} />
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-bold text-curvex-text text-xs tracking-wide">CURVEXLY AI</h3>
                            <span className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                            </span>
                        </div>
                        <div className="ml-auto flex gap-2">
                            <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 rounded-md text-curvex-muted hover:text-curvex-text hover:bg-curvex-border transition-colors">
                                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-curvex-bg custom-scrollbar">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 animate-float-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`p-3.5 rounded-2xl text-xs md:text-sm max-w-[85%] leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-curvex-text text-curvex-bg rounded-br-none' : 'bg-curvex-card text-curvex-text border border-curvex-border rounded-bl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                             <div className="flex gap-3">
                                <div className="p-3.5 rounded-2xl bg-curvex-card border border-curvex-border rounded-bl-none flex gap-1.5 items-center">
                                    <span className="w-1.5 h-1.5 bg-curvex-muted rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-curvex-muted rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                                    <span className="w-1.5 h-1.5 bg-curvex-muted rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-curvex-border bg-curvex-card/80 backdrop-blur-md">
                        <div className="relative group">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask for recommendations..." 
                                className="w-full bg-curvex-input text-curvex-text rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-curvex-text/20 border border-curvex-border transition-all placeholder-curvex-muted font-medium shadow-inner"
                            />
                            <button 
                                onClick={handleSend} 
                                disabled={!input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-curvex-text rounded-lg text-curvex-bg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Send size={14} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;