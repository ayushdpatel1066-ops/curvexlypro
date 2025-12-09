import React, { useState, useEffect } from 'react';
import { 
    Command, Search, Heart, Sun, Moon, Menu, X, PlusCircle, 
    Grid, List, TrendingUp, Layers, ChevronRight 
} from 'lucide-react';

import PromoBanners from './components/PromoBanners';
import PromoPopup from './components/PromoPopup';
import ToolCard from './components/ToolCard';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import { AI_TOOLS, CATEGORIES } from './constants';
import { ViewMode } from './types';

const App: React.FC = () => {
    // State
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [showFavsOnly, setShowFavsOnly] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Initialization
    useEffect(() => {
        const savedTheme = localStorage.getItem('curvexly_theme') as 'light' | 'dark' | null;
        if (savedTheme) setTheme(savedTheme);

        const savedFavs = localStorage.getItem('curvexly_favorites');
        if (savedFavs) setFavorites(new Set(JSON.parse(savedFavs)));
        
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Theme Effect
    useEffect(() => {
        const html = document.documentElement;
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        localStorage.setItem('curvexly_theme', theme);
    }, [theme]);

    // Save Favs
    useEffect(() => {
        localStorage.setItem('curvexly_favorites', JSON.stringify(Array.from(favorites)));
    }, [favorites]);

    // Actions
    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    
    const toggleFavorite = (id: string) => {
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleShowFavorites = () => {
        setShowFavsOnly(prev => !prev);
    };

    const resetApp = () => {
        setCategory('All');
        setSearch('');
        setShowFavsOnly(false);
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Filter Logic
    const filteredTools = AI_TOOLS.filter(tool => {
        const matchesCategory = category === 'All' || tool.category === category;
        const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                              tool.description.toLowerCase().includes(search.toLowerCase()) ||
                              tool.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
        const matchesFavorite = showFavsOnly ? favorites.has(tool.id) : true;
        return matchesCategory && matchesSearch && matchesFavorite;
    });

    const isMobile = window.innerWidth < 640; 

    return (
        <div className="min-h-screen font-sans selection:bg-curvex-text selection:text-curvex-bg bg-curvex-bg transition-colors duration-300 flex flex-col relative overflow-x-hidden">
            <PromoPopup />
            
            {/* Background Grid */}
            <div className="fixed inset-0 pointer-events-none bg-grid-pattern bg-grid opacity-50 z-0"></div>

            {/* Nav */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-curvex-bg/90 backdrop-blur-xl border-curvex-border shadow-sm' : 'bg-transparent border-transparent'}`}>
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <div 
                            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group z-50" 
                            onClick={resetApp}
                        >
                            <div className="w-8 h-8 bg-curvex-text rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg">
                                <Command className="text-curvex-bg" size={16} />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-curvex-text">CURVEXLY</span>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="relative group w-64 mr-2">
                                <div className="relative flex items-center bg-curvex-input rounded-full border border-curvex-border focus-within:border-curvex-muted transition-colors overflow-hidden">
                                    <div className="pl-3 pr-2 text-curvex-muted"><Search size={14} /></div>
                                    <input 
                                        type="text" 
                                        placeholder="Search..." 
                                        className="w-full bg-transparent border-none focus:ring-0 outline-none text-curvex-text py-1.5 text-xs placeholder-curvex-muted/50 font-medium"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={toggleShowFavorites} 
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${showFavsOnly ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'text-curvex-muted border-transparent hover:text-curvex-text hover:bg-curvex-border'}`}
                            >
                                <Heart size={14} fill={showFavsOnly ? 'currentColor' : 'none'} />
                                <span>Saved ({favorites.size})</span>
                            </button>

                            <div className="h-4 w-px bg-curvex-border"></div>

                            <button onClick={toggleTheme} className="p-2 rounded-full text-curvex-muted hover:text-curvex-text hover:bg-curvex-border transition-all">
                                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            </button>

                            <button className="px-3 py-1.5 rounded-lg bg-curvex-text text-curvex-bg text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-curvex-text/10">
                                Submit Tool
                            </button>
                        </div>

                        {/* Mobile Actions */}
                        <div className="md:hidden flex items-center gap-2 z-50">
                            <button onClick={toggleTheme} className="p-2 text-curvex-muted hover:text-curvex-text">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-curvex-text">
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-curvex-bg/95 backdrop-blur-xl pt-24 px-6 overflow-y-auto animate-float-in md:hidden">
                    <div className="flex flex-col space-y-6">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search tools..." 
                                className="w-full bg-curvex-card border border-curvex-border rounded-xl px-4 py-3 text-curvex-text focus:outline-none focus:border-curvex-muted shadow-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="absolute right-3 top-3.5 text-curvex-muted" size={18} />
                        </div>
                        <div className="border-b border-curvex-border pb-6 space-y-2">
                            <h3 className="text-[10px] font-bold text-curvex-muted uppercase tracking-wider mb-3">Menu</h3>
                            <button onClick={() => { toggleShowFavorites(); setMobileMenuOpen(false); }} className="flex items-center justify-between w-full py-2 text-curvex-text font-medium group">
                                <span className="flex items-center gap-3"><Heart size={18} /> Saved Items</span>
                                <span className="text-xs bg-curvex-card border border-curvex-border px-2 py-0.5 rounded-full">{favorites.size}</span>
                            </button>
                            <button className="flex items-center gap-3 w-full py-2 text-curvex-text font-medium">
                                <PlusCircle size={18} /> Submit a Tool
                            </button>
                        </div>
                        <div>
                            <h3 className="text-[10px] font-bold text-curvex-muted uppercase tracking-wider mb-3">Categories</h3>
                            <div className="grid grid-cols-1 gap-1">
                                {CATEGORIES.map(cat => (
                                    <button 
                                        key={cat} 
                                        onClick={() => { setCategory(cat); setMobileMenuOpen(false); }}
                                        className={`flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${category === cat ? 'bg-curvex-text text-curvex-bg font-bold' : 'text-curvex-muted hover:bg-curvex-card hover:text-curvex-text'}`}
                                    >
                                        <span>{cat}</span>
                                        {category === cat && <ChevronRight size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-16 flex-grow relative z-10">
                {/* Hero & Banner (Hide if showing favs only) */}
                {!showFavsOnly && (
                    <>
                        <PromoBanners />
                        <div className="relative pt-10 pb-12 px-4 border-b border-curvex-border/50 bg-gradient-to-b from-transparent to-curvex-bg transition-colors duration-300">
                            <div className="max-w-4xl mx-auto text-center z-10 relative">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-curvex-card border border-curvex-border mb-6">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-[10px] font-bold text-curvex-muted uppercase tracking-wider">Directory Updated Daily</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-curvex-text tracking-tight mb-4 leading-[1.1]">
                                    The Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-curvex-text to-curvex-muted">AI Index</span>
                                </h1>
                                <p className="text-sm md:text-lg text-curvex-muted max-w-xl mx-auto mb-8 font-light leading-relaxed">
                                    Discover 40+ premium tools powering the next generation.
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Main Content */}
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Toolbar */}
                    <div className="sticky top-16 z-30 bg-curvex-bg/95 backdrop-blur-xl border-b border-curvex-border -mx-4 px-4 sm:mx-0 sm:px-0 py-3 mb-8 transition-colors duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="overflow-x-auto no-scrollbar w-full md:w-auto">
                                <div className="flex space-x-1 min-w-max p-1">
                                    {CATEGORIES.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => { setCategory(cat); setShowFavsOnly(false); }}
                                            className={`px-3 py-1.5 rounded-md text-[11px] font-bold transition-all duration-200 whitespace-nowrap border ${category === cat ? 'bg-curvex-text text-curvex-bg border-curvex-text shadow-sm' : 'bg-transparent text-curvex-muted border-transparent hover:text-curvex-text hover:bg-curvex-card'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                                <span className="text-[10px] text-curvex-muted uppercase tracking-wider font-semibold bg-curvex-card px-2 py-1 rounded border border-curvex-border">{filteredTools.length} Tools</span>
                                
                                <div className="hidden sm:flex bg-curvex-card rounded-md p-0.5 border border-curvex-border">
                                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-curvex-text text-curvex-bg shadow-sm' : 'text-curvex-muted hover:text-curvex-text'}`}>
                                        <Grid size={14} />
                                    </button>
                                    <button onClick={() => setViewMode('compact')} className={`p-1.5 rounded transition-all ${viewMode === 'compact' ? 'bg-curvex-text text-curvex-bg shadow-sm' : 'text-curvex-muted hover:text-curvex-text'}`}>
                                        <List size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Section */}
                    {!showFavsOnly && search === '' && category === 'All' && (
                        <div className="mb-12 animate-float-in">
                            <h2 className="text-xs font-bold text-curvex-text uppercase tracking-wider mb-4 flex items-center gap-2">
                                <TrendingUp className="text-blue-500" size={14} /> Trending Now
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
                                {AI_TOOLS.filter(t => t.featured).slice(0, 6).map(tool => (
                                    <ToolCard 
                                        key={tool.id} 
                                        tool={tool} 
                                        viewMode="grid" // Always grid for featured
                                        isFavorite={favorites.has(tool.id)}
                                        onToggleFavorite={toggleFavorite}
                                        isMobile={false} // Force card look
                                    />
                                ))}
                            </div>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-curvex-border to-transparent mt-12"></div>
                        </div>
                    )}

                    {/* Tool Grid */}
                    {filteredTools.length > 0 ? (
                        <div className={viewMode === 'compact' ? 'pb-24 flex flex-col gap-2 max-w-4xl mx-auto' : 'pb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5'}>
                            {filteredTools.map(tool => (
                                <ToolCard 
                                    key={tool.id} 
                                    tool={tool} 
                                    viewMode={viewMode}
                                    isFavorite={favorites.has(tool.id)}
                                    onToggleFavorite={toggleFavorite}
                                    isMobile={isMobile}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 border border-dashed border-curvex-border rounded-xl bg-curvex-card/30">
                            <Layers className="text-curvex-muted mb-4 opacity-50" size={32} />
                            <p className="text-curvex-muted text-sm font-medium">No tools found.</p>
                            <button onClick={resetApp} className="mt-4 text-xs text-curvex-text font-bold bg-curvex-card border border-curvex-border px-3 py-1.5 rounded-lg hover:bg-curvex-border transition-colors">
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
            <ChatWidget />
        </div>
    );
};

export default App;