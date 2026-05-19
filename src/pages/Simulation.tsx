import React from 'react';
import { AreaChart, Area, XAxis, ResponsiveContainer, ReferenceDot } from 'recharts';
import { Sparkles, Home, Plane, Bed, PlayCircle, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const PROJECTION_DATA = [
  { age: 18, base: 0, optimized: 0 },
  { age: 25, base: 5000000, optimized: 8000000 },
  { age: 35, base: 25000000, optimized: 40000000 },
  { age: 45, base: 55000000, optimized: 85000000 },
  { age: 55, base: 80000000, optimized: 120000000 },
  { age: 65, base: 100400000, optimized: 180000000 },
];

export default function SimulationView({ setView }: { setView: (v: any) => void }) {
  const [scenarioSelected, setScenarioSelected] = React.useState<null | 'auto' | 'transporte'>(null);

  return (
    <div className="px-6 space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h2 className="text-[2.5rem] font-headline font-extrabold text-primary-container leading-[1.1] tracking-tighter">
          Tu Futuro Financiero
        </h2>
        <p className="text-secondary font-bold tracking-widest mt-2 text-[10px] uppercase opacity-60">
          PROYECCIÓN DE RIQUEZA SIMULADA
        </p>
      </header>

      {/* Projection Chart Card */}
      <section className="bg-surface-container-lowest rounded-[2.5rem] p-8 shadow-sm border border-outline-variant/10">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-outline block mb-1">
              PATRIMONIO PROYECTADO
            </span>
            <h3 className="text-4xl font-headline font-extrabold text-on-surface">$100.4M</h3>
          </div>
          <div className="text-right">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-outline block mb-1">
              EDAD META
            </span>
            <h4 className="text-2xl font-headline font-extrabold text-primary">65</h4>
          </div>
        </div>

        <div className="h-64 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PROJECTION_DATA}>
              <defs>
                <linearGradient id="projGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#014694" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#014694" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="age" hide />
              <Area 
                type="monotone" 
                dataKey="base" 
                stroke="#014694" 
                strokeWidth={3}
                strokeDasharray="5 5"
                fill="transparent"
              />
              <Area 
                type="monotone" 
                dataKey="optimized" 
                stroke="#2c5fad" 
                strokeWidth={4}
                fill="url(#projGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Milestone markers (manual placement for visual accuracy) */}
          <MilestoneIcon icon={Home} label="Vivienda" className="bottom-[25%] left-[28%]" />
          <MilestoneIcon icon={Plane} label="Viaje" className="bottom-[45%] left-[55%]" />
          <MilestoneIcon icon={Bed} label="Retiro" className="bottom-[75%] left-[85%]" />
        </div>

        <div className="flex justify-between mt-6 px-1">
          {['18', '35', '50', '65'].map(age => (
            <span key={age} className="text-[10px] font-black text-outline uppercase tracking-tighter">EDAD {age}</span>
          ))}
        </div>
      </section>

      {/* Decision Insight */}
      <section className="bg-success rounded-[2rem] p-6 flex items-start gap-4">
        <div className="bg-white/20 p-2 rounded-xl">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <p className="text-white text-sm font-semibold leading-relaxed">
          Al elegir invertir ahora, alcanzarás tus primeros $100 millones <span className="underline decoration-white/30 underline-offset-4">5 años antes</span> de lo proyectado.
        </p>
      </section>

      {/* Dilema de Decisión Card */}
      <section className="bg-surface-container-high rounded-[2.5rem] overflow-hidden">
        <div className="h-44 w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=600&h=400&auto=format&fit=crop" 
            alt="City Life" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6">
             <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-white/80 px-3 py-1 rounded-full">ESCENARIO #01</span>
          </div>
        </div>
        
        <div className="p-8">
          <h3 className="font-headline text-2xl font-extrabold text-primary-container mb-4">Decisión: Movilidad Urbana</h3>
          <p className="text-on-surface-variant font-medium leading-relaxed mb-8">
            Has comenzado tu primer trabajo. ¿Comprarías un auto usado con un préstamo de alto interés o usarías el transporte público para invertir la diferencia?
          </p>

          <div className="space-y-3">
            <OptionButton 
              title="Comprar Auto Usado" 
              subtitle="Libertad inmediata, alto mantenimiento."
              impact="-$450/mo"
              impactType="PASIVO"
              color="#ba1a1a"
              selected={scenarioSelected === 'auto'}
              onClick={() => setScenarioSelected('auto')}
            />
            <OptionButton 
              title="Transporte Público + Plan de Ahorro" 
              subtitle="Crecimiento estratégico, riqueza a largo plazo."
              impact="+$320/mo"
              impactType="CRECIMIENTO"
              color="#2e8b57"
              selected={scenarioSelected === 'transporte'}
              onClick={() => setScenarioSelected('transporte')}
            />
          </div>

          <div className="mt-8 pt-8 border-t border-outline-variant/30">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-outline tracking-wider uppercase">Impacto en Puntaje de Crédito</span>
              <div className="flex items-center gap-1.5 bg-secondary-container px-3 py-1 rounded-full">
                <PlayCircle className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-primary uppercase">Vista en vivo</span>
              </div>
            </div>
            
            <div className="relative h-2 w-full bg-white rounded-full overflow-hidden flex shadow-inner">
              <div className="h-full w-1/4 bg-error/40" />
              <div className="h-full w-1/4 bg-tertiary-fixed-dim/40" />
              <div className="h-full w-2/4 bg-success/40" />
              <motion.div 
                animate={{ left: scenarioSelected === 'transporte' ? '80%' : scenarioSelected === 'auto' ? '30%' : '55%' }}
                className="absolute top-0 bottom-0 w-1.5 bg-primary shadow-lg ring-4 ring-white" 
              />
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-black text-outline uppercase tracking-wider">
              <span>Alto Riesgo</span>
              <span>Óptimo</span>
            </div>
          </div>

          <button 
            onClick={() => setView('learning')}
            className="w-full mt-10 py-5 bg-tertiary-fixed-dim text-on-tertiary-fixed font-headline font-black text-lg rounded-full shadow-lg shadow-tertiary-fixed-dim/20 uppercase tracking-widest"
          >
            Confirmar Decisión
          </button>
        </div>
      </section>
      
      {/* Simulation Controls */}
      <div className="flex flex-col items-center gap-4 py-8">
        <button className="flex items-center gap-2 text-primary font-bold text-sm">
          <RotateCcw className="w-4 h-4" />
          Reiniciar Simulación
        </button>
      </div>
    </div>
  );
}

function MilestoneIcon({ icon: Icon, className, label }: { icon: any, className: string, label: string }) {
  return (
    <div className={cn("absolute group", className)}>
      <motion.div 
        whileHover={{ scale: 1.2 }}
        className="bg-white rounded-full p-2 shadow-lg border border-outline-variant/20 text-primary cursor-help"
      >
        <Icon className="w-3.5 h-3.5" />
      </motion.div>
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[8px] font-bold px-2 py-0.5 rounded whitespace-nowrap uppercase tracking-widest pointer-events-none">
        {label}
      </div>
    </div>
  );
}

function OptionButton({ title, subtitle, impact, impactType, color, selected, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full text-left p-6 rounded-[1.5rem] transition-all duration-300 border-2 flex items-center justify-between",
        selected 
          ? `bg-white border-primary-container shadow-md` 
          : "bg-surface-container-low border-transparent hover:border-outline-variant/30"
      )}
    >
      <div>
        <h4 className="font-headline font-bold text-primary text-sm mb-1">{title}</h4>
        <p className="text-[10px] text-on-surface-variant font-medium leading-tight max-w-[140px]">{subtitle}</p>
      </div>
      <div className="text-right">
        <span className="block text-lg font-headline font-black mb-0.5" style={{ color }}>{impact}</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-outline">{impactType}</span>
      </div>
    </button>
  );
}
