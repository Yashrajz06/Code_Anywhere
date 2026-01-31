import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-accent-dark dark:text-white antialiased font-display min-h-screen flex flex-col">
            {/* Sticky Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-1.5 rounded-lg flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-xl">terminal</span>
                        </div>
                        <h2 className="text-xl font-extrabold tracking-tight text-accent-dark dark:text-white">Code Anywhere</h2>
                    </div>
                    {/* Center: Navigation */}
                    <nav className="hidden md:flex items-center gap-10">
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Features</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Pricing</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#">Documentation</a>
                    </nav>
                    {/* Right: Actions */}
                    <div className="flex items-center gap-4">
                        <Link className="text-sm font-medium hover:text-primary transition-colors hidden sm:block" to="/login">Login</Link>
                        <Link to="/dashboard" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold tracking-wide hover:opacity-90 transition-all">
                            Start Coding
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex flex-col flex-1">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 px-6 overflow-hidden">
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                            <span className="material-symbols-outlined text-sm">rocket_launch</span>
                            New: Support for Python 3.12
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-accent-dark dark:text-white leading-[1.1] mb-6">
                            Code Anywhere.<br /><span className="text-primary">Build Everywhere.</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal leading-relaxed mb-10">
                            The powerful online IDE that brings your development environment to the browser. Write, debug, and deploy C++, Java, and Python from any device.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup" className="flex items-center justify-center w-full sm:w-auto min-w-[160px] h-14 bg-primary text-white rounded-xl text-lg font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20">
                                Get Started
                            </Link>
                            <Link to="/editor" className="flex items-center justify-center w-full sm:w-auto min-w-[160px] h-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-accent-dark dark:text-white rounded-xl text-lg font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                Live Demo
                            </Link>
                        </div>
                    </div>
                    {/* Abstract Background Decoration */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-0"></div>
                    {/* IDE Mockup Preview (Visual Element) */}
                    <div className="mt-16 max-w-5xl mx-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden p-2">
                        {/* ... skipped lines ... */}
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
                                Start coding in seconds.
                            </h2>
                            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto">
                                Join thousands of developers building the future of software on the world's most flexible IDE platform.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/signup" className="flex items-center justify-center bg-primary text-white h-14 px-10 rounded-xl text-lg font-bold hover:scale-105 transition-transform">
                                    Create Free Account
                                </Link>
                            </div>
                            <p className="mt-6 text-sm text-gray-500">No credit card required. Start free, scale as you grow.</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 px-6 bg-white dark:bg-background-dark">
                <div className="max-w-7xl mx-auto flex flex-col gap-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                        <div className="flex flex-col gap-4 max-w-sm">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary p-1.5 rounded-lg">
                                    <span className="material-symbols-outlined text-white text-lg">terminal</span>
                                </div>
                                <h2 className="text-lg font-extrabold tracking-tight">Code Anywhere</h2>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                The web-first IDE designed for modern development workflows. Lightweight, powerful, and accessible everywhere.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                            <div className="flex flex-col gap-4">
                                <h5 className="text-sm font-bold uppercase tracking-widest text-accent-dark dark:text-white">Product</h5>
                                <ul className="flex flex-col gap-2 text-sm text-gray-500">
                                    <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#">Extension Marketplace</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#">API Support</a></li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h5 className="text-sm font-bold uppercase tracking-widest text-accent-dark dark:text-white">Resources</h5>
                                <ul className="flex flex-col gap-2 text-sm text-gray-500">
                                    <li><a className="hover:text-primary transition-colors" href="#">Docs</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#">Blog</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#">Community</a></li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h5 className="text-sm font-bold uppercase tracking-widest text-accent-dark dark:text-white">Company</h5>
                                <ul className="flex flex-col gap-2 text-sm text-gray-500">
                                    <li><a className="hover:text-primary transition-colors" href="#">About</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#">Privacy</a></li>
                                    <li><a className="hover:text-primary transition-colors" href="#">Terms</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <p className="text-gray-500 text-sm">© 2024 Code Anywhere Inc. All rights reserved.</p>
                        <div className="flex items-center gap-6">
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-2xl">public</span>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-2xl">code</span>
                            </a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-2xl">alternate_email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
