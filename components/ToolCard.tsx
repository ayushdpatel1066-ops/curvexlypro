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

    // COMPACT / LIST VIEW (Also default for Mobile)
    if (viewMode === 'compact' || isMobile) {
        return (
            <div className="relative flex items-center gap-3 p-3 bg-curvex-card border border-curvex-border rounded-xl shadow-sm hover:shadow-md transition-all group overflow-hidden">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-curvex-bg border border-curvex-border flex items-center justify-center p-1 relative">
                    <img src={logo} alt={tool.name} className="w-full h-full object-contain rounded-md" loading="lazy" />
                    {tool.featured && (
                        <div className="absolute -top-1 -left-1 bg-curvex-text text-curvex-bg rounded-full p-0.5 border border-curvex-bg">
                            <Zap size={8} fill="currentColor" />
                        </div>
                    )}
                </div>
                
                <div className="flex-grow min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-curvex-text truncate">{tool.name}</h3>
                    </div>
                    <p className="text-[10px] text-curvex-muted line-clamp-1 mb-1 pr-2">{tool.description}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-[9px] px-1.5 py-0.5 bg-curvex-bg border border-curvex-border rounded text-curvex-muted font-medium uppercase tracking-wide">{tool.category}</span>
                        <span className={`text-[9px] font-bold ${pricingColor}`}>{tool.pricing}</span>
                    </div>
                </div>

                <div className="shrink-0 flex items-center gap-3 pl-2 border-l border-curvex-border/30">
                    <button 
                        onClick={() => onToggleFavorite(tool.id)} 
                        className={`p-1.5 rounded-full hover:bg-curvex-bg transition-colors ${isFavorite ? 'text-red-500' : 'text-curvex-muted'}`}
                        aria-label={`Save ${tool.name}`}
                    >
                        <Heart size={16} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                    <a href={tool.website} target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-curvex-text text-curvex-bg hover:opacity-90 transition-opacity shadow-sm">
                        <ArrowUpRight size={16} />
                    </a>
                </div>
            </div>
        );
    }

    // GRID VIEW (Desktop Only)
    return (
        <div className="h-full group relative flex flex-col bg-curvex-card rounded-2xl border border-curvex-border hover:border-curvex-muted/50 hover:shadow-premium transition-all duration-300 overflow-hidden">
            <div className="relative w-full pt-8 pb-4 flex items-center justify-center bg-gradient-to-b from-curvex-bg/50 to-transparent border-b border-curvex-border/30">
                <div className="absolute inset-0 opacity-[0.02]" style={{backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '12px 12px'}}></div>
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full p-2 bg-curvex-card border border-curvex-border shadow-lg flex items-center justify-center z-10 group-hover:scale-105 transition-transform duration-300 group-hover:border-curvex-muted/50">
                    <img src={logo} alt={tool.name} className="w-full h-full object-contain p-1 rounded-full" loading="lazy" />
                </div>
                <div className="absolute top-3 right-3 z-20">
                    <button 
                        onClick={() => onToggleFavorite(tool.id)}
                        className={`p-1.5 rounded-full bg-curvex-card/80 backdrop-blur-sm border border-curvex-border shadow-sm transition-all hover:scale-110 active:scale-95 ${isFavorite ? 'text-red-500' : 'text-curvex-muted'}`}
                    >
                        <Heart size={14} fill={isFavorite ? 'currentColor' : 'none'} />
                    </button>
                </div>
                {tool.featured && (
                    <div className="absolute top-3 left-3 z-20">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-curvex-text text-curvex-bg shadow-sm">
                            <Zap size={12} fill="currentColor" />
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col flex-grow p-4 text-center">
                <h3 className="font-bold text-curvex-text text-base sm:text-base mb-1 truncate">{tool.name}</h3>
                <div className="flex justify-center items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold text-curvex-muted uppercase tracking-wider">{tool.category}</span>
                    <span className="w-1 h-1 rounded-full bg-curvex-border"></span>
                    <span className={`text-[10px] font-bold ${pricingColor}`}>{tool.pricing}</span>
                </div>
                <p className="text-sm sm:text-xs text-curvex-muted line-clamp-2 leading-relaxed mb-4 px-1 min-h-[40px] sm:min-h-[32px]">{tool.description}</p>
                <div className="mt-auto">
                    <a href={tool.website} target="_blank" rel="noopener noreferrer" className="block w-full py-2.5 sm:py-2 rounded-lg bg-curvex-bg border border-curvex-border text-sm sm:text-xs font-bold text-curvex-text hover:bg-curvex-text hover:text-curvex-bg transition-all shadow-sm group-hover:shadow-md">
                        Open Tool
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;
