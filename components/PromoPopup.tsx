import React, { useEffect, useState } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

const PromoPopup: React.FC = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-float-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500" onClick={() => setVisible(false)}></div>
            <div className="relative bg-curvex-card border border-curvex-border w-full max-w-md rounded-2xl p-6 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-curvex-text via-curvex-accent to-curvex-text animate-shine"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-curvex-text/10 rounded-full blur-3xl pointer-events-none"></div>
                <button onClick={() => setVisible(false)} className="absolute top-4 right-4 text-curvex-muted hover:text-curvex-text transition-colors p-1" aria-label="Close Popup">
                    <X size={20} />
                </button>
                <div className="flex flex-col items-center text-center mt-2">
                    <div className="w-12 h-12 bg-curvex-text rounded-full flex items-center justify-center mb-4 shadow-lg ring-4 ring-curvex-bg">
                        <Sparkles className="text-curvex-bg" size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-curvex-text mb-2">Curvexly Premium</h2>
                    <p className="text-curvex-muted text-sm mb-6 leading-relaxed">
                        Unlock exclusive AI models, unlimited tool tracking, and early access to the Curvexly API.
                    </p>
                    <button onClick={() => setVisible(false)} className="relative group w-full py-3 bg-curvex-text text-curvex-bg rounded-lg font-bold text-sm tracking-wide overflow-hidden flex items-center justify-center gap-2 hover:opacity-95 transition-all">
                        <span>Join Waitlist</span>
                        <ArrowRight size={16} />
                    </button>
                    <button onClick={() => setVisible(false)} className="mt-4 text-xs text-curvex-muted hover:text-curvex-text underline decoration-dotted underline-offset-4">
                        Continue to directory
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromoPopup;
