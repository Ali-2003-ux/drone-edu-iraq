import React, { useState } from 'react';
import { useProjectStore } from '../../store/useProjectStore'; // Adjust path as needed
import { Plus, Trash2, Folder, Clock, Cpu } from 'lucide-react';
import { cn } from '../../utils/cn';

const ProjectVault = () => {
    const { projects, addProject, removeProject } = useProjectStore();
    const [newProjectName, setNewProjectName] = useState('');

    const handleCreate = () => {
        if (!newProjectName.trim()) return;
        addProject({
            name: newProjectName,
            type: 'Freestyle 5"',
            status: 'Planning',
            parts: 0,
            cost: 0
        });
        setNewProjectName('');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center">
                        <Folder className="mr-3 text-indigo-500" size={32} />
                        Project Vault
                    </h1>
                    <p className="text-slate-400 mt-1">Manage your drone builds, parts lists, and tuning profiles.</p>
                </div>

                <div className="flex space-x-2">
                    <input
                        type="text"
                        placeholder="New Build Name..."
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                        onClick={handleCreate}
                        disabled={!newProjectName.trim()}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg flex items-center font-medium transition-colors"
                    >
                        <Plus className="mr-2" size={18} /> New Project
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length === 0 ? (
                    <div className="col-span-full border-2 border-dashed border-slate-800 rounded-xl p-12 text-center">
                        <div className="inline-flex p-4 bg-slate-900 rounded-full mb-4">
                            <Cpu className="text-slate-600" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Projects Yet</h3>
                        <p className="text-slate-500 max-w-sm mx-auto">
                            Start your first drone build by entering a name above.
                            Track parts, costs, and flight logs all in one place.
                        </p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-all group relative">
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => removeProject(project.id)}
                                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 bg-indigo-500/10 rounded-lg">
                                    <Cpu className="text-indigo-400" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{project.name}</h3>
                                    <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded">
                                        {project.type}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Status</span>
                                    <span className={cn(
                                        "font-medium",
                                        project.status === 'Completed' ? "text-green-400" : "text-amber-400"
                                    )}>{project.status}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Parts Count</span>
                                    <span className="text-slate-300">{project.parts} items</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Est. Cost</span>
                                    <span className="text-slate-300 font-mono">${project.cost}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center text-xs text-slate-500">
                                <Clock size={14} className="mr-1.5" />
                                Created {new Date(project.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectVault;
