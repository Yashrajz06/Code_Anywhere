import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Project {
    id: string;
    name: string;
    description: string;
    language: string;
    updatedAt: string;
}

const Dashboard = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                } else {
                    console.error('Failed to fetch projects');
                    // Handle unauthorized or error (redirect to login?)
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const createProject = async () => {
        // Simple prompt for now, or open a modal in future
        const name = prompt("Project Name:");
        if (!name) return;

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, language: 'javascript' })
            });
            if (res.ok) {
                const newProject = await res.json();
                setProjects([newProject, ...projects]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {/* Header */}
            <header className="sticky top-0 z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-8 py-6 flex flex-wrap justify-between items-center gap-4">
                    <h2 className="text-[#111318] dark:text-white text-3xl font-black tracking-tight">My Projects</h2>
                    <button
                        onClick={createProject}
                        className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm"
                    >
                        <span className="material-symbols-outlined text-lg">add</span>
                        <span>New Project</span>
                    </button>
                </div>
            </header>
            {/* Content */}
            <div className="max-w-6xl mx-auto px-8 pb-12">
                {/* Search & Filters (Optional visual addition) */}
                <div className="mb-8 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
                            search
                        </span>
                        <input
                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-card-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm transition-all text-gray-900 dark:text-white"
                            placeholder="Search projects..."
                            type="text"
                        />
                    </div>
                </div>
                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-3 text-center text-gray-500">Loading projects...</div>
                    ) : projects.length === 0 ? (
                        <div className="col-span-3 text-center text-gray-500">No projects found. Create one to get started!</div>
                    ) : (
                        projects.map((project) => (
                            <div key={project.id} className="bg-white dark:bg-card-dark border border-border-light dark:border-border-dark rounded-xl overflow-hidden group hover:shadow-lg hover:border-primary/30 transition-all">
                                <div className="h-32 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-gray-400">code</span>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-[#111827] dark:text-white text-lg font-bold truncate">{project.name}</h3>
                                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded capitalize">
                                            {project.language}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-6">
                                        Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                                    </p>
                                    <div className="flex justify-end">
                                        <Link
                                            to={`/editor?projectId=${project.id}`}
                                            className="flex items-center gap-1.5 text-primary hover:text-primary/80 font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-all"
                                        >
                                            <span>Open</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* Floating Action Button for Mobile / Quick Access */}
            <div className="fixed bottom-8 right-8 lg:hidden">
                <button
                    onClick={createProject}
                    className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined text-3xl">add</span>
                </button>
            </div>
        </>
    );
};

export default Dashboard;

