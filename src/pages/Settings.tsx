import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface UserProfile {
    name?: string;
    email?: string;
    image?: string;
}

const Settings = () => {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const res = await fetch('/api/auth/session');
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setUser(data.user);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch session", error);
            }
        };
        fetchSession();
    }, []);

    const handleLogout = () => {
        window.location.href = "/api/auth/signout";
    };

    return (
        <div className="flex flex-col h-full">
            {/* Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#f1f0f4] dark:border-[#2d293d] bg-white dark:bg-[#1c1829] px-6 lg:px-40 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-[#131118] dark:text-white">
                        <div className="size-6 text-primary flex items-center justify-center">
                            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>terminal</span>
                        </div>
                        <h2 className="text-[#131118] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Code Anywhere</h2>
                    </div>
                    {/* Search removed for brevity */}
                </div>
                <div className="flex flex-1 justify-end gap-4 lg:gap-8 items-center">
                    <nav className="hidden md:flex items-center gap-6 lg:gap-9">
                        <Link className="text-[#131118] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/dashboard">Dashboard</Link>
                        <Link className="text-[#131118] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" to="/dashboard">Projects</Link>
                        <a className="text-[#131118] dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors" href="#">Marketplace</a>
                    </nav>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-lg size-10 bg-[#f1f0f4] dark:bg-[#2d293d] text-[#131118] dark:text-white hover:bg-[#e4e2e9] transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                    {user?.image ? (
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-primary/20"
                            style={{ backgroundImage: `url("${user.image}")` }}
                        ></div>
                    ) : (
                        <div className="bg-primary/10 flex items-center justify-center rounded-full size-10 text-primary font-bold">
                            {user?.name?.[0] || 'U'}
                        </div>
                    )}
                </div>
            </header>

            <div className="flex flex-1 justify-center py-10 px-4 md:px-10 lg:px-40">
                <div className="layout-content-container flex flex-col max-w-[800px] flex-1 gap-6">
                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between gap-3 p-4">
                        <div className="flex min-w-72 flex-col gap-1">
                            <p className="text-[#131118] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">User Settings</p>
                            <p className="text-[#6e6189] dark:text-[#a397bd] text-base font-normal leading-normal">Manage your account settings and IDE preferences.</p>
                        </div>
                    </div>
                    {/* Profile Section */}
                    <div className="bg-white dark:bg-[#1c1829] rounded-xl border border-[#dedbe6] dark:border-[#2d3648] overflow-hidden">
                        <div className="flex p-6 @container">
                            <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                                <div className="flex gap-6 items-center">
                                    <div className="bg-primary/10 dark:bg-primary/20 flex items-center justify-center rounded-full min-h-24 w-24 text-primary text-3xl font-bold border-2 border-primary/20 overflow-hidden">
                                        {user?.image ? (
                                            <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{user?.name?.[0] || 'A'}</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <p className="text-[#131118] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">{user?.name || 'Loading...'}</p>
                                        <p className="text-[#6e6189] dark:text-[#a397bd] text-base font-normal leading-normal">{user?.email || 'user@example.com'}</p>
                                        <span className="mt-1 text-xs font-semibold text-primary uppercase tracking-wider">GitHub Connected</span>
                                    </div>
                                </div>
                                <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors">
                                    <span>Edit Profile</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Preferences Section Heading */}
                    <h2 className="text-[#131118] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Preferences</h2>
                    {/* Theme Selection */}
                    <div className="flex flex-col gap-4 px-4">
                        <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-[#dedbe6] dark:border-[#2d3648] bg-white dark:bg-[#1c1829] p-5 md:flex-row md:items-center">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">dark_mode</span>
                                    <p className="text-[#131118] dark:text-white text-base font-bold leading-tight">Dark Mode</p>
                                </div>
                                <p className="text-[#6e6189] dark:text-[#a397bd] text-sm font-normal leading-normal">Enable dark mode for the entire IDE interface.</p>
                            </div>
                            <label className="relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none bg-[#f1f0f4] dark:bg-[#2d293d] p-0.5 has-[:checked]:justify-end has-[:checked]:bg-primary transition-all">
                                <div className="h-full w-[27px] rounded-full bg-white" style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 8px, rgba(0, 0, 0, 0.06) 0px 3px 1px' }}></div>
                                <input defaultChecked className="invisible absolute" type="checkbox" />
                            </label>
                        </div>
                    </div>
                    {/* Account Section */}
                    <h2 className="text-[#131118] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pt-6">Account & Security</h2>
                    <div className="bg-white dark:bg-[#1c1829] rounded-xl border border-[#dedbe6] dark:border-[#2d3648] p-6 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-danger text-base font-bold">Delete Account</p>
                                <p className="text-[#6e6189] dark:text-[#a397bd] text-sm">Permanently remove your account and all associated data.</p>
                            </div>
                            <button className="text-danger font-bold text-sm hover:underline">Delete my account</button>
                        </div>
                    </div>
                    {/* Logout Footer */}
                    <div className="flex justify-end p-4 pt-10 border-t border-[#f1f0f4] dark:border-[#2d3648] mt-10">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-[#f1f0f4] dark:bg-[#2d293d] text-[#131118] dark:text-white px-6 py-3 rounded-lg font-bold hover:bg-danger hover:text-white transition-all group"
                        >
                            <span className="material-symbols-outlined text-[20px]">logout</span>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
            <footer className="py-10 text-center text-[#6e6189] dark:text-[#a397bd] text-sm">
                <p>© 2024 Code Anywhere Inc. • <a className="hover:text-primary underline" href="#">Privacy Policy</a> • <a className="hover:text-primary underline" href="#">Terms of Service</a></p>
            </footer>
        </div>
    );
};

export default Settings;

