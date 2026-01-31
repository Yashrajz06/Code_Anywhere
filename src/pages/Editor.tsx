import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface File {
    id: string;
    name: string;
    content: string;
    projectId: string;
}

interface Project {
    id: string;
    name: string;
    files: File[];
}

const Editor = () => {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get('projectId');

    const [project, setProject] = useState<Project | null>(null);
    const [activeFile, setActiveFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [isCreatingFile, setIsCreatingFile] = useState(false);
    const [newFileName, setNewFileName] = useState('');

    const handleCreateFile = async () => {
        if (!newFileName.trim() || !projectId) return;

        try {
            const res = await fetch('/api/files', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newFileName, projectId })
            });
            if (res.ok) {
                const newFile = await res.json();
                if (project) {
                    setProject({ ...project, files: [...project.files, newFile] });
                }
                setActiveFile(newFile);
                setNewFileName('');
                setIsCreatingFile(false);
            }
        } catch (err) {
            console.error("Failed to create file", err);
        }
    };

    useEffect(() => {
        if (!projectId) {
            setLoading(false);
            return;
        }

        const fetchProject = async () => {
            try {
                const res = await fetch(`/api/projects/${projectId}`);
                if (res.ok) {
                    const data = await res.json();
                    setProject(data);
                    if (data.files && data.files.length > 0) {
                        setActiveFile(data.files[0]);
                    } else {
                        // Create default file if none exists? Or handle empty state
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    const handleSave = async () => {
        if (!activeFile) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/files/${activeFile.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: activeFile.content })
            });
            if (res.ok) {
                // visual feedback?
                alert("Saved!");
            }
        } catch (err) {
            console.error("Failed to save", err);
        } finally {
            setSaving(false);
        }
    };

    const handleFileContentChange = (newContent: string) => {
        if (activeFile) {
            setActiveFile({ ...activeFile, content: newContent });
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-500">Loading editor...</div>;
    if (!project) return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-screen">
            <h2 className="text-xl font-bold mb-4">No Project Loaded</h2>
            <p className="text-gray-500 mb-6">Please select a project from the dashboard.</p>
            <Link to="/dashboard" className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90">
                Go to Dashboard
            </Link>
        </div>
    );

    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col overflow-hidden font-editor">
            {/* Top Navigation Bar */}
            <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark px-6 py-2 z-10">
                <div className="flex items-center gap-6">
                    <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-background-dark">
                            <span className="material-symbols-outlined font-bold">terminal</span>
                        </div>
                        <h2 className="text-gray-900 dark:text-white text-lg font-bold tracking-tight">Code Anywhere</h2>
                    </Link>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700"></div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-500 text-sm">folder</span>
                        <span className="text-gray-900 dark:text-gray-200 text-sm font-medium uppercase">{project.name}</span>
                        <span className="text-gray-400">/</span>
                        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <span className="text-gray-900 dark:text-gray-200 text-sm font-medium">{activeFile?.name || 'No File'}</span>
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-primary text-background-dark px-4 py-1.5 rounded-lg text-sm font-bold transition-transform active:scale-95">
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
                        Run
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-lg">save</span>
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
                    <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined">sync_alt</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <span className="material-symbols-outlined">dark_mode</span>
                    </button>
                    <div className="size-8 rounded-full bg-cover bg-center border border-gray-200"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeMvOWre55sD3WAMUqlDSjRe2sI0nKNROcOIOSqRnvG9Y6UQLHELBZ5fotElE0WKqQgxFGfdcHamIBIFuLYG5_8azogsCSO3YxV1-X-XmRIXvQrTSsK7f7b5yMB7OUWYQQfpxqeqwKmUagwyLwXOUQtclrelEcaS4W6SplINblBJ-PeaTSTHKPlqfdJWav5dzMD9iJgC9NvYCVxcMNHjH7L1KJwVxBfUHgBFda0MzFDomPJOHn4NIKSZ_ViGhU6soFnIILdZpIkU4")' }}>
                    </div>
                </div>
            </header>
            {/* Main Workspace */}
            <main className="flex flex-1 overflow-hidden">
                {/* File Sidebar */}
                <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark flex flex-col shrink-0">
                    <div className="p-4 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Explorer</span>
                        <div className="flex gap-2">
                            <span
                                onClick={() => {
                                    console.log("New File button clicked");
                                    setIsCreatingFile(true);
                                }}
                                className="material-symbols-outlined text-sm text-gray-400 cursor-pointer hover:text-primary"
                                title="New File"
                            >
                                note_add
                            </span>
                            <span className="material-symbols-outlined text-sm text-gray-400 cursor-pointer hover:text-primary" title="New Folder">create_new_folder</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        {/* Project Root */}
                        <div className="flex items-center gap-2 px-4 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                            <span className="uppercase">{project.name}</span>
                        </div>

                        {/* New File Input */}
                        {isCreatingFile && (
                            <div className="px-8 py-1.5 flex items-center gap-2 bg-gray-50 dark:bg-gray-800/50">
                                <span className="material-symbols-outlined text-lg text-blue-500">code</span>
                                <input
                                    autoFocus
                                    type="text"
                                    className="bg-transparent border-b border-primary text-sm text-gray-900 dark:text-white w-full outline-none placeholder:text-gray-500"
                                    value={newFileName}
                                    onChange={(e) => setNewFileName(e.target.value)}
                                    onKeyDown={(e) => {
                                        console.log("Key pressed:", e.key);
                                        if (e.key === 'Enter') {
                                            console.log("Creating file:", newFileName);
                                            handleCreateFile();
                                        }
                                        if (e.key === 'Escape') setIsCreatingFile(false);
                                    }}
                                    onBlur={() => {
                                        console.log("Input blurred");
                                        setIsCreatingFile(false);
                                    }}
                                    placeholder="filename.js..."
                                />
                            </div>
                        )}

                        {/* File Items */}
                        <div className="flex flex-col mt-1">
                            {project.files && project.files.map(file => (
                                <div
                                    key={file.id}
                                    onClick={() => setActiveFile(file)}
                                    className={`flex items-center gap-3 px-8 py-1.5 cursor-pointer group ${activeFile?.id === file.id ? 'bg-primary/10 border-r-2 border-primary' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                                >
                                    <span className="material-symbols-outlined text-lg text-blue-500">code</span>
                                    <span className={`text-sm font-medium flex-1 truncate ${activeFile?.id === file.id ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                        {file.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Sidebar Bottom Actions */}
                    <div className="mt-auto border-t border-gray-100 dark:border-gray-800 p-2 flex flex-col gap-1">
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <span className="material-symbols-outlined text-xl">search</span>
                            <span className="text-sm font-medium">Search</span>
                        </div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                            <span className="material-symbols-outlined text-xl">extension</span>
                            <span className="text-sm font-medium">Extensions</span>
                        </div>
                        <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                            <span className="material-symbols-outlined text-xl">settings</span>
                            <span className="text-sm font-medium">Settings</span>
                        </Link>
                    </div>
                </aside>
                {/* Editor & Terminal Area */}
                <div className="flex flex-1 flex-col overflow-hidden bg-gray-50 dark:bg-black/20">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-500">
                        <span className="hover:text-primary cursor-pointer">{project.name}</span>
                        <span className="material-symbols-outlined text-[10px]">chevron_right</span>
                        <span className="hover:text-primary cursor-pointer text-gray-800 dark:text-gray-200">{activeFile?.name}</span>
                    </div>
                    {/* Code Editor Area */}
                    <div className="flex-1 flex overflow-hidden relative group">
                        {/* Empty State / No File Selected */}
                        {!activeFile ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                                <span className="material-symbols-outlined text-4xl mb-2">description</span>
                                <p>Select a file to start editing</p>
                            </div>
                        ) : (
                            <>
                                {/* Line Numbers */}
                                <div className="w-12 bg-[#1E1E1E] border-r border-gray-800 flex flex-col items-center pt-4 text-gray-600 code-font text-sm select-none" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                                    {activeFile.content.split('\n').map((_, i) => (
                                        <span key={i}>{i + 1}</span>
                                    ))}
                                </div>
                                {/* Code Display */}
                                <div className="flex-1 bg-[#1E1E1E] overflow-auto text-sm leading-relaxed relative" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                                    <textarea
                                        className="w-full h-full bg-transparent text-gray-200 p-4 outline-none resize-none font-mono"
                                        value={activeFile.content}
                                        onChange={(e) => handleFileContentChange(e.target.value)}
                                        spellCheck={false}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    {/* Console / Terminal */}
                    <div className="h-48 border-t border-gray-200 dark:border-gray-800 bg-black flex flex-col">
                        <div className="flex items-center justify-between px-4 py-1.5 border-b border-gray-800 bg-gray-900">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Terminal</span>
                                <span className="text-xs font-medium text-gray-500">Output</span>
                                <span className="text-xs font-medium text-gray-500">Problems</span>
                            </div>
                            <div className="flex gap-2">
                                <span className="material-symbols-outlined text-sm text-gray-500 cursor-pointer">remove</span>
                                <span className="material-symbols-outlined text-sm text-gray-500 cursor-pointer">close</span>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-auto text-sm" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary">$</span>
                                <span className="text-white">ls</span>
                            </div>
                            <div className="text-white">{project.files?.map(f => f.name).join('  ')}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-primary">$</span>
                                <span className="w-2 h-4 bg-primary animate-pulse"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            {/* Bottom Status Bar */}
            <footer className="bg-white dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 px-4 py-1 flex items-center justify-between z-10">
                <div className="flex items-center gap-4 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                    <div className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-xs">sync</span>
                        <span>{activeFile?.name}*</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
                        <span className="material-symbols-outlined text-xs">error</span>
                        <span>0</span>
                        <span className="material-symbols-outlined text-xs ml-1">warning</span>
                        <span>0</span>
                    </div>
                </div>
                <div className="flex items-center gap-6 text-[10px] font-medium text-gray-500 uppercase">
                    <span>Spaces: 4</span>
                    <span>UTF-8</span>
                    <span>LF</span>
                    <div className="flex items-center gap-1 text-primary">
                        <span className="material-symbols-outlined text-xs">check_circle</span>
                        <span>Prettier</span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        <span className="material-symbols-outlined text-xs">notifications</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
export default Editor;
