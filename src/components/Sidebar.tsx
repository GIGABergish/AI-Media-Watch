import { Shield, LayoutDashboard, Video, ClipboardList, Network, Dna, BarChart3, Settings, Zap } from 'lucide-react';
import { Page } from '../App';
import { cn } from '../lib/utils';
import { useLang, pick } from '../i18n';

const navItems: { id: Page; en: string; ru: string; icon: React.ElementType; badge?: string }[] = [
  { id: 'dashboard', en: 'Dashboard', ru: 'Дашборд', icon: LayoutDashboard },
  { id: 'analysis', en: 'Video analysis', ru: 'Анализ видео', icon: Video },
  { id: 'queue', en: 'Review queue', ru: 'Очередь проверки', icon: ClipboardList, badge: '146' },
  { id: 'connections', en: 'Connections', ru: 'Карта связей', icon: Network },
  { id: 'scam-dna', en: 'Scam DNA', ru: 'Scam DNA', icon: Dna },
  { id: 'timeline', en: 'Evidence Timeline', ru: 'Evidence Timeline', icon: Zap },
  { id: 'settings', en: 'Settings', ru: 'Настройки', icon: Settings },
];

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { lang } = useLang();

  return (
    <aside className="w-60 flex-shrink-0 bg-[#090912] border-r border-white/[0.06] flex flex-col h-full">
      <div className="p-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-600 flex items-center justify-center glow-purple">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">Sentinel</div>
            <div className="text-xs text-violet-400 leading-tight font-mono">Media AI</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider px-3 py-2 mt-1">
          {pick(lang, 'Navigation', 'Навигация')}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'sidebar-link w-full text-left',
                isActive && 'active'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{pick(lang, item.en, item.ru)}</span>
              {item.badge && (
                <span className="text-[10px] font-mono bg-violet-500/20 text-violet-400 px-1.5 py-0.5 rounded-full border border-violet-500/20">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/[0.06]">
        <div className="rounded-lg bg-violet-500/8 border border-violet-500/15 p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400">{pick(lang, 'System active', 'Система активна')}</span>
          </div>
          <div className="text-[10px] text-slate-500 leading-relaxed">
            AI Media Watch v1.0<br />
            {pick(lang, 'Monitoring: 24/7', 'Мониторинг: 24/7')}
          </div>
        </div>
        <div className="mt-3 text-[10px] text-slate-600 leading-relaxed">
          {pick(lang, 'Not a legal determination', 'Результат не является юридическим заключением')}
        </div>
      </div>
    </aside>
  );
}
