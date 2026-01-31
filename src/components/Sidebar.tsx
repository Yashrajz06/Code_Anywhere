import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800';
    };

    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-background-dark border-r border-border-light dark:border-border-dark flex flex-col justify-between py-6 px-4 z-50">
            <div className="flex flex-col gap-8">
                {/* Logo */}
                <div className="flex items-center gap-3 px-2">
                    <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-2xl">terminal</span>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-[#111318] dark:text-white text-base font-bold leading-tight">Code Anywhere</h1>
                        <p className="text-[#616e89] dark:text-gray-400 text-xs font-medium">IDE Platform</p>
                    </div>
                </div>
                {/* Navigation */}
                <nav className="flex flex-col gap-1">
                    <Link
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/dashboard')}`}
                        to="/dashboard"
                    >
                        <span className="material-symbols-outlined">dashboard</span>
                        <span className="text-sm font-medium">Dashboard</span>
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/github')}`}
                        to="/github"
                    >
                        <span className="material-symbols-outlined">account_tree</span>
                        <span className="text-sm font-medium">GitHub</span>
                    </Link>
                    <Link
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive('/settings')}`}
                        to="/settings"
                    >
                        <span className="material-symbols-outlined">settings</span>
                        <span className="text-sm font-medium">Settings</span>
                    </Link>
                </nav>
            </div>
            {/* Bottom Action */}
            <div className="flex flex-col gap-1 border-t border-border-light dark:border-border-dark pt-4">
                <a
                    href="/api/auth/signout"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full cursor-pointer"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text-sm font-medium">Logout</span>
                </a>
            </div>
        </aside>
    );
};

export default Sidebar;
