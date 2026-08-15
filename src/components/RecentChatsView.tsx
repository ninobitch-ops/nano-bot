import React from 'react';
import { Clock, MessageSquare, Plus, ArrowRight, Sparkles, Trash2, Layers, Globe, Smartphone } from 'lucide-react';
import { RecentChatSession } from '../types';

interface RecentChatsViewProps {
  sessions: RecentChatSession[];
  onOpenChat: (session: RecentChatSession) => void;
  onDeleteChat: (id: string) => void;
  onNewChat: () => void;
}

export const RecentChatsView: React.FC<RecentChatsViewProps> = ({
  sessions,
  onOpenChat,
  onDeleteChat,
  onNewChat,
}) => {
  const getRemainingHours = (expiresAt: number) => {
    const diffMs = expiresAt - Date.now();
    if (diffMs <= 0) return 'Expired';
    const hours = Math.floor(diffMs / 3600000);
    const minutes = Math.floor((diffMs % 3600000) / 60000);
    return `${hours}h ${minutes}m left`;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              24-Hour Ephemeral Cache
            </span>
            <span className="text-xs text-slate-400">
              {sessions.length} Active Sessions
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Recent Prompt Chats
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Conversational building sessions persist for 24 hours before recycling.
          </p>
        </div>

        <button
          onClick={onNewChat}
          className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Prompt Session</span>
        </button>
      </div>

      {/* Chat Sessions List */}
      {sessions.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 max-w-lg mx-auto">
          <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Recent Chats</h3>
          <p className="text-xs text-slate-400 mb-4">
            When you brainstorm or build with Nino, your prompt conversations are cached here for 24 hours.
          </p>
          <button
            onClick={onNewChat}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
          >
            Start New Prompt
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => onOpenChat(session)}
              className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-xl transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-white text-base truncate group-hover:text-amber-400 transition-colors">
                    {session.title}
                  </h3>
                </div>

                {/* Last Message Snippet */}
                {session.messages.length > 0 && (
                  <p className="text-xs text-slate-300 line-clamp-1 italic bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80">
                    "{session.messages[session.messages.length - 1].text}"
                  </p>
                )}

                <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                  <span className="capitalize text-indigo-400 font-bold">{session.target} Build</span>
                  <span>&middot;</span>
                  <span>{session.messages.length} messages</span>
                  <span>&middot;</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getRemainingHours(session.expiresAt)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteChat(session.id);
                  }}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <span className="px-4 py-2 rounded-xl bg-amber-500/10 group-hover:bg-amber-500 text-amber-300 group-hover:text-slate-950 text-xs font-bold flex items-center gap-1.5 transition-all">
                  <span>Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
