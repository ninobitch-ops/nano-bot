import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Trash2, 
  Clock, 
  Layers, 
  Globe, 
  Smartphone, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Tag
} from 'lucide-react';
import { NinoProject, BuildTarget } from '../types';

interface ProjectsViewProps {
  projects: NinoProject[];
  onSelectProject: (project: NinoProject) => void;
  onDeleteProject: (id: string) => void;
  onNewProject: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onNewProject,
}) => {
  const [filterTarget, setFilterTarget] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = projects.filter((p) => {
    const matchesTarget = filterTarget === 'all' || p.target === filterTarget;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTarget && matchesSearch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <FolderKanban className="w-3.5 h-3.5" />
              Workspace Projects
            </span>
            <span className="text-xs text-slate-400">
              {projects.length} Total ({projects.filter(p => p.status !== 'ready').length} Unfinished)
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Projects &amp; Unfinished Builds
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage your websites, mobile apps, and hybrid codebases built with Nino AI.
          </p>
        </div>

        <button
          id="projects-create-new-btn"
          onClick={onNewProject}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/25 border border-indigo-400/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New App Project</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {['all', 'web', 'mobile', 'both'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterTarget(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                filterTarget === t
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {t === 'all' ? 'All Targets' : t === 'both' ? 'Web & App' : t}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, category, or feature..."
          className="w-full sm:w-64 px-3.5 py-1.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 max-w-lg mx-auto">
          <FolderKanban className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Projects Found</h3>
          <p className="text-xs text-slate-400 mb-4">
            Start a new prompt in the Builder Studio to generate your first website or mobile app!
          </p>
          <button
            onClick={onNewProject}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            Create with Nino
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => onSelectProject(project)}
              className="bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-5 shadow-xl transition-all hover:scale-[1.01] flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Card Top Row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      {project.target === 'web' ? (
                        <Globe className="w-5 h-5" />
                      ) : project.target === 'mobile' ? (
                        <Smartphone className="w-5 h-5" />
                      ) : (
                        <Layers className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base group-hover:text-indigo-400 transition-colors">
                        {project.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                    project.status === 'ready'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {project.status === 'ready' ? 'READY' : 'UNFINISHED'}
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Features Pill Wrap */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.features.slice(0, 3).map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-950 px-2 py-0.5 rounded-md text-slate-400 border border-slate-800"
                    >
                      {feat}
                    </span>
                  ))}
                  {project.features.length > 3 && (
                    <span className="text-[10px] text-slate-500 px-1 py-0.5">
                      +{project.features.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[10px] text-slate-500 font-mono">
                  v{project.version} &middot; {new Date(project.lastEditedAt).toLocaleDateString()}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteProject(project.id);
                    }}
                    title="Delete Project"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <span className="px-3 py-1 rounded-lg bg-indigo-600/20 text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white text-xs font-bold flex items-center gap-1 transition-all">
                    <span>Open in Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
