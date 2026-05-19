import React from 'react';
import { 
  Trophy, 
  MapPin, 
  Settings, 
  ChevronDown, 
  Shield, 
  Sprout, 
  Home, 
  Briefcase,
  History,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function ProfileView({ setView }: { setView: (v: any) => void }) {
  return (
    <div className="px-6 space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Profile Header/Level */}
      <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10 flex flex-col items-center">
        <div className="relative w-44 h-44 mb-8">
          {/* Progress Circle (Simplified SVG) */}
          <svg className="w-full h-full -rotate-90">
            <circle 
              cx="88" cy="88" r="82" 
              fill="transparent" 
              stroke="var(--color-surface-container-high)" 
              strokeWidth="8" 
            />
            <circle 
              cx="88" cy="88" r="82" 
              fill="transparent" 
              stroke="#2e8b57" 
              strokeWidth="8" 
              strokeDasharray={515}
              strokeDashoffset={150}
              strokeLinecap="round"
            />
          </svg>
          {/* Avatar Area */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
               <img 
                 src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop" 
                 alt="Profile" 
                 className="w-full h-full object-cover"
               />
             </div>
          </div>
          {/* Level Badge */}
          <div className="absolute bottom-0 right-4 w-12 h-12 flex items-center justify-center">
            <div 
              className="bg-tertiary-fixed-dim w-full h-full flex items-center justify-center shadow-lg"
              style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <span className="font-headline font-black text-on-tertiary-fixed text-xl">5</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="font-headline text-2xl font-black text-primary-container mb-1">Estratega de Ahorro</h2>
          <p className="text-on-surface-variant font-bold text-[10px] tracking-[0.2em] uppercase">
            750 / 1000 XP PARA NIVEL 6
          </p>
          <div className="w-48 h-1.5 bg-surface-container-high rounded-full mt-4 overflow-hidden">
            <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '75%' }}
               className="bg-primary h-full rounded-full" 
            />
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="bg-surface-container-low rounded-[2.5rem] p-8">
        <h3 className="font-headline text-[10px] font-black text-on-surface-variant mb-10 text-center uppercase tracking-[0.3em]">
          Logros Desbloqueados
        </h3>
        <div className="grid grid-cols-2 gap-y-12 gap-x-6">
          <AchievementItem icon={Shield} color="#ffba2c" label="Blindaje Financiero" active />
          <AchievementItem icon={Sprout} color="#ffba2c" label="Primer Inversionista" active />
          <AchievementItem icon={Home} color="#737782" label="Propietario" locked />
          <AchievementItem icon={Briefcase} color="#737782" label="CEO de Mi Vida" locked />
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={History} 
          value="12" 
          label="Simulaciones" 
          bgColor="bg-primary-container/10" 
          iconColor="text-primary-container" 
        />
        <StatCard 
          icon={BookOpen} 
          value="34" 
          label="Lecciones" 
          bgColor="bg-secondary-container" 
          iconColor="text-secondary" 
        />
      </div>

      {/* Difficulty Setting */}
      <section className="bg-surface-container-highest rounded-full px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-surface-container-high transition-colors">
        <div className="flex items-center gap-4">
          <Settings className="w-5 h-5 text-primary" />
          <span className="font-headline font-bold text-sm text-on-surface-variant">Dificultad de Simulación</span>
        </div>
        <div className="flex items-center gap-2 text-primary font-black">
          <span className="text-sm">Intermedio</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

    </div>
  );
}

function AchievementItem({ icon: Icon, label, active, color, locked }: any) {
  return (
    <div className={cn("flex flex-col items-center text-center group", !active && "opacity-30")}>
       <div className={cn(
         "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform",
         active ? "bg-white shadow-sm" : "bg-surface-container-high"
       )}>
         <Icon className="w-7 h-7" style={{ color: active ? color : '#737782' }} fill={active ? `${color}20` : 'transparent'} />
       </div>
       <span className="font-headline text-[9px] font-black uppercase tracking-widest text-on-surface max-w-[80px] leading-tight">
         {label}
       </span>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, bgColor, iconColor }: any) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-[2rem] flex flex-col items-start gap-5 shadow-sm">
       <div className={cn("p-2.5 rounded-2xl", bgColor)}>
         <Icon className={cn("w-5 h-5", iconColor)} />
       </div>
       <div>
         <p className="text-3xl font-headline font-black text-on-surface leading-none">{value}</p>
         <p className="font-headline text-[9px] font-bold uppercase tracking-widest text-on-surface-variant mt-2">{label}</p>
       </div>
    </div>
  );
}
