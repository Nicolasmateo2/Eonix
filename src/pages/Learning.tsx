import React from 'react';
import { Trophy, BookOpen, MapPin, Calculator, School, Star, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function LearningView({ setView }: { setView: (v: any) => void }) {
  return (
    <div className="px-6 space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Achievement Header */}
      <section className="flex flex-col items-center text-center space-y-4 py-8">
        <motion.div 
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-24 h-24 bg-tertiary-fixed-dim rounded-full flex items-center justify-center shadow-xl shadow-tertiary-fixed-dim/20"
        >
          <Trophy className="w-10 h-10 text-on-tertiary-fixed fill-current" />
        </motion.div>
        <div className="space-y-1">
          <span className="text-secondary font-headline text-[10px] font-black uppercase tracking-[0.3em]">LOGRO DESBLOQUEADO</span>
          <h2 className="font-headline font-extrabold text-2xl text-on-surface tracking-tight leading-tight max-w-[280px]">
            Concepto Desbloqueado: <br/><span className="text-primary-container">La Octava Maravilla</span>
          </h2>
        </div>
      </section>

      {/* Definition Card */}
      <section className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm border border-outline-variant/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="font-headline font-extrabold text-xl text-primary">Interés Compuesto</h3>
          </div>
          <p className="text-on-surface-variant leading-relaxed text-lg font-medium">
            Tu dinero no solo creció; comenzó a generar su propio dinero. Así es como los pequeños ahorros se convierten en fortunas a lo largo de las décadas.
          </p>
        </div>
      </section>

      {/* Formula Visualization */}
      <section className="bg-[#f0f4f8] rounded-[2rem] border border-primary-container/10 p-8 space-y-8 relative overflow-hidden">
        <div className="absolute right-[-10px] top-[-10px] opacity-5">
          <Calculator className="w-32 h-32" />
        </div>
        
        <h4 className="font-headline text-[10px] font-black text-primary-container uppercase tracking-[0.2em]">LA FÓRMULA DE CRECIMIENTO</h4>
        
        <div className="flex flex-col gap-6 font-headline font-bold">
           <div className="flex items-center gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm flex-1">
                 <span className="block text-[10px] text-outline uppercase font-black tracking-widest mb-1">Inicial</span>
                 <span className="text-primary text-lg">Inversión</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                 <span className="text-xl font-bold">+</span>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm flex-1">
                 <span className="block text-[10px] text-outline uppercase font-black tracking-widest mb-1">Duración</span>
                 <span className="text-primary text-lg">Tiempo</span>
              </div>
           </div>
           
           <div className="flex items-center justify-center -my-2">
              <div className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
                 <span className="text-xl font-bold">=</span>
              </div>
           </div>

           <div className="bg-primary-container text-white p-6 rounded-3xl shadow-xl shadow-primary/20 flex flex-col items-center">
              <span className="text-xs font-bold opacity-60 uppercase tracking-widest mb-1">Crecimiento</span>
              <span className="text-2xl font-black">Exponencial</span>
           </div>
        </div>
      </section>

      {/* Local Tip */}
      <section className="flex gap-5 items-center p-6 bg-surface-container-high rounded-[1.5rem] border-l-4 border-tertiary-fixed-dim">
        <div className="bg-white p-3 rounded-2xl shadow-sm">
          <MapPin className="w-6 h-6 text-tertiary" />
        </div>
        <p className="text-sm font-semibold text-on-surface-variant leading-relaxed">
          <span className="text-on-surface font-black">En Colombia,</span> busca CDTs o fondos de inversión que capitalicen intereses mensualmente.
        </p>
      </section>

      {/* Action CTA */}
      <div className="pt-4 space-y-4">
        <button 
          onClick={() => setView('simulation')}
          className="w-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-headline font-black text-lg py-5 rounded-full shadow-lg shadow-tertiary-fixed-dim/20 transition-transform active:scale-95 flex items-center justify-center gap-2"
        >
          Volver a la Simulación
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-center font-headline text-[10px] font-black text-outline uppercase tracking-[0.2em]">
          CONTINÚA TU VIAJE FINANCIERO
        </p>
      </div>
    </div>
  );
}
