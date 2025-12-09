import React from 'react';
import { PROMO_BANNERS } from '../constants';

const PromoBanners: React.FC = () => {
    return (
        <div id="top-banner" className="w-full bg-curvex-bg pt-6 pb-2 pl-4 md:px-0 max-w-[1800px] mx-auto overflow-hidden">
            <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar snap-x snap-mandatory px-4 sm:px-6 lg:px-8">
                {PROMO_BANNERS.map(b => {
                    if (b.isSpecial) {
                        const priceColor = b.brand === 'openai' ? 'text-teal-300' : 'text-[#4ade80]';
                        const glowColor = b.brand === 'openai' ? 'hover:shadow-teal-500/25' : 'hover:shadow-indigo-500/25';
                        const dotColor = b.brand === 'openai' ? 'bg-yellow-400 border-teal-700' : 'bg-red-500 border-indigo-600';
                        const textColor = b.brand === 'openai' ? 'text-teal-50' : 'text-indigo-50';

                        return (
                            <div key={b.id} className={`snap-start shrink-0 w-[85vw] sm:w-[380px] h-[100px] relative group cursor-pointer overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:scale-[1.01] ${glowColor}`}>
                                <div className={`absolute inset-0 ${b.gradient}`}></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine"></div>
                                
                                <div className="relative z-10 flex items-center h-full px-4 gap-3">
                                    <div className="shrink-0 relative">
                                        <div className="w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center border border-white/50">
                                            <img src={b.logo} alt={b.title} className="w-8 h-8 object-contain" />
                                        </div>
                                        <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 ${dotColor} rounded-full border-2 animate-bounce`}></div>
                                    </div>

                                    <div className="flex-grow min-w-0 flex flex-col justify-center gap-1">
                                        <h3 className="font-black text-white text-[15px] tracking-tight leading-none drop-shadow-md truncate">{b.title}</h3>
                                        <p className={`text-[11px] ${textColor} leading-tight line-clamp-2`} dangerouslySetInnerHTML={{ __html: b.offerDescription || '' }}></p>
                                        <div className="flex items-center mt-1">
                                            <div className="flex items-center px-2 py-0.5 rounded-md bg-black/40 border border-white/10 backdrop-blur-md">
                                                {b.oldPrice && <span className="text-[10px] text-white/50 line-through mr-2 font-medium">{b.oldPrice}</span>}
                                                <span className={`text-xs font-black ${priceColor} uppercase tracking-wide drop-shadow-sm`}>{b.price}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <a href={b.link} target="_blank" rel="noreferrer" className="shrink-0 flex items-center justify-center bg-white text-indigo-950 px-3 py-2 rounded-lg text-[11px] font-extrabold uppercase tracking-widest shadow-lg hover:bg-white/90 transition-all">
                                        {b.cta}
                                    </a>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={b.id} className={`snap-start shrink-0 w-[85vw] sm:w-[340px] h-[100px] relative group overflow-hidden rounded-2xl border border-white/20 ${b.gradient} hover:border-white/30 transition-all shadow-md`}>
                                <div className="relative z-10 flex items-center justify-between h-full px-6">
                                    <div className="flex flex-col justify-center min-w-0 space-y-1">
                                        <h3 className="font-bold text-white text-base tracking-tight shadow-black/5 drop-shadow-sm">{b.title}</h3>
                                        <p className="text-xs text-white/90 font-medium">{b.subtitle}</p>
                                    </div>
                                    <a href={b.link} target="_blank" rel="noreferrer" className="shrink-0 flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/30 transition-colors">
                                        {b.cta}
                                    </a>
                                </div>
                            </div>
                        );
                    }
                })}
                <div className="w-2 shrink-0"></div>
            </div>
        </div>
    );
};

export default PromoBanners;
