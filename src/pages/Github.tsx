import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Repo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    updated_at: string;
}

const Github = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const res = await fetch('/api/github/repos');
                if (res.ok) {
                    const data = await res.json();
                    setRepos(data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRepos();
    }, []);

    return (
        <div className="flex flex-col h-full overflow-hidden">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#dbdee6] bg-white dark:bg-background-dark dark:border-gray-800 px-10 py-3">
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4 text-primary">
                        <div className="size-6">
                            <span className="material-symbols-outlined text-3xl">terminal</span>
                        </div>
                        <h2 className="text-black dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Code Anywhere</h2>
                    </div>
                    <div className="flex items-center gap-9">
                        <Link className="text-gray-600 dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" to="/dashboard">Dashboard</Link>
                        <Link className="text-gray-600 dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" to="/dashboard">Projects</Link>
                        <a className="text-primary text-sm font-bold border-b-2 border-primary pb-1" href="#">Integrations</a>
                        <Link className="text-gray-600 dark:text-gray-300 text-sm font-medium hover:text-primary transition-colors" to="/settings">Settings</Link>
                    </div>
                </div>
                <div className="flex flex-1 justify-end gap-8">
                    {/* Search removed for brevity */}
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrDWLZiyxUTX_OllPxf9Tbfk2g9YRT-712-XdvNUOgIC2WN9zxMOk91xHDNchP5Y-aiVUyKtTUp2RrrfxfUAarFM-c4yGjYBNFdG3q4FIfqIAFqm8bQHjws2AzF7qtZCgOEwXDAG1ta0NoxEkjuVs3EKGcc9TsuR04TIjs0joR-YTawEg1JdcirQTFTZLo8O2VhocyCVsCipjmsV-zu7KniUV5NsptHhVR4AgJplclFOqlB-VsVx_KLcVMayjAM9cAuWxh8YwmeIY")' }}
                    ></div>
                </div>
            </header>

            <div className="px-4 md:px-20 lg:px-40 flex flex-1 justify-center py-10 overflow-auto">
                <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                    {/* Page Heading */}
                    <div className="flex flex-wrap justify-between gap-3 mb-6">
                        <div className="flex min-w-72 flex-col gap-1">
                            <p className="text-black dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">GitHub Integration</p>
                            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Manage your repository connections and sync your code seamlessly.</p>
                        </div>
                    </div>
                    {/* Connect Card */}
                    <div className="mb-8">
                        <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex flex-[2_2_0px] flex-col justify-between gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">link</span>
                                        <p className="text-black dark:text-white text-xl font-bold leading-tight">Account Status</p>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal">Your GitHub account is connected. You can sync repositories directly from the dashboard.</p>
                                </div>
                                <button className="flex min-w-[200px] max-w-fit items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-green-600 text-white gap-2 text-base font-semibold shadow-md cursor-default">
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <span className="truncate">Connected</span>
                                </button>
                            </div>
                            <div className="hidden md:block w-48 h-48 bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-600">
                                    <span className="material-symbols-outlined text-8xl text-primary/20">cloud_sync</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Operations & Repositories Split */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left: Commit & Push Card */}
                        <div className="lg:col-span-1">
                            <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 h-full">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-black dark:text-white text-lg font-bold">Stage Changes</h3>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Push local updates to remote</p>
                                </div>
                                <div className="flex flex-col gap-3 mt-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Commit Message</label>
                                    <textarea
                                        className="form-textarea w-full rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-background-dark text-black dark:text-white p-3 text-sm focus:ring-primary focus:border-primary min-h-[120px]"
                                        placeholder="Enter commit message..."
                                    ></textarea>
                                </div>
                                <button className="w-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
                                    <span className="material-symbols-outlined text-xl">upload</span>
                                    Push to Main
                                </button>
                                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">Branch: main</p>
                            </div>
                        </div>
                        {/* Right: Repository List Card */}
                        <div className="lg:col-span-2">
                            <div className="rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col">
                                <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                                    <h3 className="text-black dark:text-white text-lg font-bold">Your Repositories</h3>
                                </div>
                                <div className="overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50 dark:bg-gray-700/50">
                                                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Repository Name</th>
                                                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Last Updated</th>
                                                <th className="px-6 py-4 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                            {loading ? (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">Loading repositories...</td>
                                                </tr>
                                            ) : repos.length === 0 ? (
                                                <tr>
                                                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">No repositories found.</td>
                                                </tr>
                                            ) : (
                                                repos.map(repo => (
                                                    <tr key={repo.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-3">
                                                                <span className="material-symbols-outlined text-gray-400">folder_open</span>
                                                                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black dark:text-white hover:underline">{repo.name}</a>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex items-center gap-2">
                                                                <span className="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
                                                                <span className="text-sm text-gray-600 dark:text-gray-300">{new Date(repo.updated_at).toLocaleDateString()}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5 text-right">
                                                            <button className="text-primary hover:text-blue-700 text-sm font-bold px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all inline-flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-lg">sync</span>
                                                                Sync
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700/20 text-center">
                                    <button className="text-gray-500 hover:text-primary text-sm font-medium transition-colors underline underline-offset-4">View All Repositories</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Github;

