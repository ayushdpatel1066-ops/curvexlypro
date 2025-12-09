import React, { useState, useEffect } from 'react';
import { 
    Command, Search, Heart, Sun, Moon, Menu, X, PlusCircle, 
    Grid, List, TrendingUp, Layers 
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

    // Initialization
    useEffect(() => {
        const savedTheme = localStorage.getItem('curvexly_theme') as 'light' | 'dark' | null;
        if (savedTheme) setTheme(savedTheme);

        const savedFavs = localStorage.getItem('curvexly_favorites');
        if (savedFavs) setFavorites(new Set(JSON.parse(savedFavs)));
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

    const isMobile = window.innerWidth < 640; // Simple check, usually safer with hooks but this works for basic layout logic

    return (
        <div className="min-h-screen font-sans selection:bg-curvex-accent selection:text-curvex-bg bg-curvex-bg transition-colors duration-300 flex flex-col">
            <PromoPopup />
            
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-curvex-bg/90 backdrop-blur-md border-b border-curvex-border transition-colors duration-300">
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-14">
                        <div 
                            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group z-50" 
                            onClick={resetApp}
                        >
                            <div className="w-7 h-7 bg-curvex-text rounded flex items-center justify-center transition-colors shadow-lg">
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
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${showFavsOnly ? 'bg-red-500/10 text-red-500' : 'text-curvex-muted hover:text-curvex-text'}`}
                            >
                                <Heart size={14} fill={showFavsOnly ? 'currentColor' : 'none'} />
                                <span>Saved ({favorites.size})</span>
                            </button>

                            <div className="h-4 w-px bg-curvex-border"></div>

                            <button onClick={toggleTheme} className="p-2 rounded-full text-curvex-muted hover:text-curvex-text hover:bg-curvex-border/50 transition-all">
                                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                            </button>

                            <button className="px-3 py-1.5 rounded-md bg-curvex-text text-curvex-bg text-xs font-bold hover:opacity-90 transition-opacity">
                                Submit Tool
                            </button>
                        </div>

                        {/* Mobile Actions */}
                        <div className="md:hidden flex items-center gap-2 z-50">
                            <button onClick={toggleTheme} className="p-2 text-curvex-muted">
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
                <div className="fixed inset-0 z-40 bg-curvex-bg pt-20 px-6 overflow-y-auto animate-float-in md:hidden">
                    <div className="flex flex-col space-y-6">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search tools..." 
                                className="w-full bg-curvex-card border border-curvex-border rounded-lg px-4 py-3 text-curvex-text focus:outline-none focus:border-curvex-muted"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="absolute right-3 top-3.5 text-curvex-muted" size={18} />
                        </div>
                        <div className="border-b border-curvex-border pb-4">
                            <h3 className="text-xs font-bold text-curvex-muted uppercase tracking-wider mb-3">Menu</h3>
                            <button onClick={() => { toggleShowFavorites(); setMobileMenuOpen(false); }} className="flex items-center gap-3 w-full py-2 text-curvex-text font-medium">
                                <Heart size={18} /> Saved Items
                            </button>
                            <button className="flex items-center gap-3 w-full py-2 text-curvex-text font-medium">
                                <PlusCircle size={18} /> Submit a Tool
                            </button>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-curvex-muted uppercase tracking-wider mb-3">Categories</h3>
                            <div className="grid grid-cols-1 gap-1">
                                {CATEGORIES.map(cat => (
                                    <button 
                                        key={cat} 
                                        onClick={() => { setCategory(cat); setMobileMenuOpen(false); }}
                                        className={`text-left px-3 py-3 rounded-md transition-colors ${category === cat ? 'bg-curvex-text text-curvex-bg font-bold' : 'text-curvex-muted hover:bg-curvex-card hover:text-curvex-text'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-14 flex-grow">
                {/* Hero & Banner (Hide if showing favs only) */}
                {!showFavsOnly && (
                    <>
                        <PromoBanners />
                        <div className="relative pt-8 pb-8 px-4 border-b border-curvex-border bg-curvex-bg transition-colors duration-300">
                            <div className="max-w-4xl mx-auto text-center z-10">
                                <h1 className="text-3xl md:text-5xl font-bold text-curvex-text tracking-tight mb-3 leading-tight">
                                    The Curated <span className="text-curvex-muted">AI Index</span>
                                </h1>
                                <p className="text-sm md:text-base text-curvex-muted max-w-xl mx-auto mb-6 font-light">
                                    Discover 40+ premium tools powering the next generation.
                                </p>
                            </div>
                        </div>
                    </>
                )}

                {/* Main Content */}
                <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Toolbar */}
                    <div className="sticky top-14 z-30 bg-curvex-bg/95 backdrop-blur-md border-b border-curvex-border -mx-4 px-4 sm:mx-0 sm:px-0 py-3 mb-6 transition-colors duration-300">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="overflow-x-auto no-scrollbar w-full md:w-auto">
                                <div className="flex space-x-1 min-w-max">
                                    {CATEGORIES.map(cat => (
                                        <button 
                                            key={cat}
                                            onClick={() => { setCategory(cat); setShowFavsOnly(false); }}
                                            className={`px-3 py-1.5 rounded text-[11px] font-medium transition-all duration-200 whitespace-nowrap border ${category === cat ? 'bg-curvex-text text-curvex-bg border-curvex-text' : 'bg-transparent text-curvex-muted border-transparent hover:text-curvex-text hover:bg-curvex-border/30'}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                                <span className="text-[10px] text-curvex-muted uppercase tracking-wider font-semibold">{filteredTools.length} Tools</span>
                                
                                <div className="hidden sm:flex bg-curvex-card rounded p-0.5 border border-curvex-border">
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
                        <div className="mb-10">
                            <h2 className="text-xs font-bold text-curvex-text uppercase tracking-wider mb-3 flex items-center gap-2">
                                <TrendingUp className="text-curvex-accent" size={14} /> Trending Now
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
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
                            <div className="h-px w-full bg-curvex-border mt-8"></div>
                        </div>
                    )}

                    {/* Tool Grid */}
                    {filteredTools.length > 0 ? (
                        <div className={viewMode === 'compact' ? 'pb-20 flex flex-col gap-2 max-w-4xl mx-auto' : 'pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-4'}>
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
                        <div className="flex flex-col items-center justify-center py-24 border border-dashed border-curvex-border rounded-lg bg-curvex-card/30">
                            <Layers className="text-curvex-muted mb-3" size={24} />
                            <p className="text-curvex-muted text-sm font-medium">No tools found.</p>
                            <button onClick={resetApp} className="mt-4 text-xs text-curvex-text underline underline-offset-4 hover:text-curvex-accent">
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
