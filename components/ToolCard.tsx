import React from 'react';
import { Heart, ArrowUpRight, Zap } from 'lucide-react';
import { Tool, ViewMode } from '../types';

interface ToolCardProps {
    tool: Tool;
    viewMode: ViewMode;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    isMobile: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, viewMode, isFavorite, onToggleFavorite, isMobile }) => {
    const pricingColor = tool.pricing === 'Free' ? 'text-green-500' : 'text-curvex-text';
    
    // Get simple favicon proxy
    const getLogoUrl = (url: string) => {
        try {
            const domain = new URL(url).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
        } catch (e) {
            return 'https://ui-avatars.com/api/?name=AI&background=1F1F1F&color=fff';
        }
    };
    const logo = getLogoUrl(tool.website);

    // COMPACT / LIST VIEW
    if (viewMode === 'compact' || isMobile) {
        return (
            <div className="relative flex items-center gap-4 p-3.5 bg-curvex-card border border-curvex-border rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-curvex-bg border border-curvex-border flex items-center justify-center p-1 relative">
                    <img src={logo} alt={tool.name} className="w-full h-full object-contain rounded-md filter grayscale group-hover:grayscale-0 transition-all duration-300" loading="lazy" />
                    {tool.featured && (
                        <div className="absolute -top-1 -left-1 bg-curvex-text text-curvex-bg rounded-full p-0.5 border border-curvex-bg z-10">
                            <Zap size={8} fill="currentColor" />
                        </div>
                    )}
                </div>
                
                <div className="flex-grow min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="text-sm font-bold text-curvex-text truncate">{tool.name}</h3>
                        {tool.featured && <span className="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-1 rounded">PRO</span>}
                    </div>
                    <p className="text-[10px] text-curvex-muted line-clamp-1 mb-1.5 pr-2">{tool.description}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] px-1.5 py-0.5 bg-curvex-bg border border-curvex-border rounded text-curvex-muted font-bold uppercase tracking-wide">{tool.category}</span>
                        <span className={`text-[9px] font-bold ${pricingColor}`}>{tool.pricing}</span>
                    </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 pl-2 border-l border-curvex-border/30">
                    <button 
                        onClick={(e) => { e.preventDefault(); onToggleFavorite(tool.id); }} 
                        className={`p-2 rounded-full hover:bg-curvex-bg transition-colors ${isFavorite ? 'text-red-500' : 'text-curvex-muted'}`}
                        aria-label={`Save ${tool.name}`}
                    >
                        <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <a href={tool.website} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full text-curvex-text hover:bg-curvex-text hover:text-curvex-bg transition-colors">
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>
        );
    }

    // GRID VIEW (Desktop Only)
    return (
        <div className="h-full group relative flex flex-col bg-curvex-card rounded-2xl border border-curvex-border hover:border-curvex-muted/50 hover:shadow-premium transition-all duration-300 overflow-hidden">
            <div className="relative w-full pt-8 pb-4 flex items-center justify-center bg-gradient-to-b from-curvex-bg to-transparent border-b border-curvex-border/30 group-hover:from-curvex-bg/80 transition-colors">
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity" style={{backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '12px 12px'}}></div>
                
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-curvex-card border border-curvex-border shadow-lg flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-300 group-hover:border-curvex-muted/50 group-hover:shadow-glow">
                    <img src={logo} alt={tool.name} className="w-full h-full object-contain p-1 rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                </div>
                
                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                        onClick={() => onToggleFavorite(tool.id)}
                        className={`p-1.5 rounded-full bg-curvex-card/90 backdrop-blur-sm border border-curvex-border shadow-sm transition-all hover:scale-110 active:scale-95 ${isFavorite ? 'text-red-500' : 'text-curvex-muted hover:text-red-500'}`}
                    >
                        <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                </div>
                {/* Show heart if favorite even if not hovering */}
                {isFavorite && (
                     <div className="absolute top-3 right-3 z-20">
                        <button 
                            onClick={() => onToggleFavorite(tool.id)}
                            className="p-1.5 rounded-full bg-curvex-card/90 border border-curvex-border shadow-sm text-red-500"
                        >
                            <Heart size={14} fill="currentColor" />
                        </button>
                    </div>
                )}

                {tool.featured && (
                    <div className="absolute top-3 left-3 z-20">
                        <span className="flex items-center justify-center gap-1 px-2 py-0.5 rounded-full bg-curvex-text text-curvex-bg shadow-sm">
                            <Zap size={10} fill="currentColor" />
                            <span className="text-[9px] font-bold tracking-wider">HOT</span>
                        </span>
                    </div>
                )}
            </div>
            
            <div className="flex flex-col flex-grow p-5 text-center">
                <h3 className="font-bold text-curvex-text text-base mb-1 truncate tracking-tight">{tool.name}</h3>
                
                <div className="flex justify-center items-center gap-2 mb-3">
                    <span className="text-[9px] font-bold text-curvex-muted uppercase tracking-wider bg-curvex-bg px-1.5 py-0.5 rounded border border-curvex-border">{tool.category}</span>
                    <span className={`text-[9px] font-bold ${pricingColor}`}>{tool.pricing}</span>
                </div>
                
                <p className="text-sm sm:text-xs text-curvex-muted line-clamp-2 leading-relaxed mb-5 px-1 min-h-[40px] opacity-80">{tool.description}</p>
                
                <div className="mt-auto">
                    <a href={tool.website} target="_blank" rel="noopener noreferrer" className="group/btn block w-full py-2.5 rounded-xl bg-curvex-bg border border-curvex-border text-xs font-bold text-curvex-text hover:bg-curvex-text hover:text-curvex-bg transition-all shadow-sm">
                        <span className="flex items-center justify-center gap-2">
                            Open Tool <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;