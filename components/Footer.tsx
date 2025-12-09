import React from 'react';
import { Command, Twitter, Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t border-curvex-border bg-curvex-card/50 backdrop-blur-xl pt-16 pb-8 mt-auto">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                             <div className="w-8 h-8 bg-curvex-text rounded flex items-center justify-center">
                                <Command className="text-curvex-bg" size={18} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-curvex-text">CURVEXLY</span>
                        </div>
                        <p className="text-sm text-curvex-muted leading-relaxed max-w-xs">
                            The world's most premium directory for artificial intelligence tools. Curated daily for quality and performance.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-curvex-text mb-4">Product</h3>
                        <ul className="space-y-3 text-sm text-curvex-muted">
                            <li><a href="#" className="hover:text-curvex-text transition-colors">Submit Tool</a></li>
                            <li><a href="#" className="hover:text-curvex-text transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-curvex-text transition-colors">API Access</a></li>
                            <li><a href="#" className="hover:text-curvex-text transition-colors">Chrome Extension</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-curvex-text mb-4">Resources</h3>
                        <ul className="space-y-3 text-sm text-curvex-muted">
                            <li><a href="#" className="hover:text-curvex-text transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-curvex-text transition-colors">Community</a></li>
                            <li><a href="#" className="hover:text-curvex-text transition-colors">Newsletter</a></li>
                            <li><a href="#" className="hover:text-curvex-text transition-colors">Help Center</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-curvex-text mb-4">Stay Updated</h3>
                        <p className="text-xs text-curvex-muted mb-4">Get the latest AI tools delivered to your inbox weekly.</p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Enter your email" className="bg-curvex-bg border border-curvex-border rounded-lg px-3 py-2 text-sm text-curvex-text w-full focus:outline-none focus:border-curvex-muted" />
                            <button className="bg-curvex-text text-curvex-bg px-4 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-curvex-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-curvex-muted">© 2024 Curvexly Inc. All rights reserved.</p>
                    <div className="flex gap-6 text-xs text-curvex-muted">
                        <a href="#" className="hover:text-curvex-text transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-curvex-text transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-curvex-text transition-colors">Cookies</a>
                    </div>
                    <div className="flex gap-4 text-curvex-muted">
                        <a href="#" className="hover:text-curvex-text transition-colors" aria-label="Twitter"><Twitter size={16} /></a>
                        <a href="#" className="hover:text-curvex-text transition-colors" aria-label="Github"><Github size={16} /></a>
                        <a href="#" className="hover:text-curvex-text transition-colors" aria-label="Linkedin"><Linkedin size={16} /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
