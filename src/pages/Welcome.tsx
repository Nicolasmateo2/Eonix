import React from 'react';
import { motion } from 'motion/react';
import { Rocket, ShieldCheck, ChevronRight } from 'lucide-react';

export default function WelcomeView({ onStart, setView }: { onStart: () => void, setView: (v: any) => void }) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen pt-16 pb-12 px-8 overflow-hidden bg-gradient-to-b from-[#fbf9f8] to-[#f0eded]">
      {/* Logos */}
      <header className="flex flex-col items-center space-y-1">
        <h1 className="font-headline text-5xl font-black text-primary tracking-tighter">Eonix</h1>
        <p className="font-headline text-[10px] tracking-[0.4em] uppercase font-black text-on-surface-variant/40">
          BY <span className="text-primary-container">ITERIA</span>
        </p>
      </header>

      {/* Hero Illustration Wrapper */}
      <main className="flex-grow flex flex-col items-center justify-center text-center w-full max-w-sm space-y-12">
        <div className="relative w-full aspect-square max-w-[320px]">
          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
             {/* Simple visual representation of financial growth */}
             <div className="relative flex flex-col items-center">
                <div className="flex items-end gap-3 mb-4">
                  {[30, 50, 80, 110, 150].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: h }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      className="w-10 bg-primary-container rounded-lg shadow-lg relative"
                    >
                      {i === 4 && (
                        <div className="absolute top-[-20px] left-[-20px] bg-tertiary-fixed-dim p-2 rounded-full shadow-lg">
                           <ShieldCheck className="w-5 h-5 text-on-tertiary-fixed" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
                <div className="w-64 h-1.5 bg-outline-variant/20 rounded-full" />
             </div>
          </motion.div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-headline font-black text-primary-container tracking-tight leading-tight">
            Toma el control de tu futuro financiero hoy.
          </h2>
          <p className="text-on-surface-variant font-medium leading-relaxed px-4">
            Aprende, decide y visualiza el impacto de tus decisiones antes de que sucedan en la vida real.
          </p>
        </div>
      </main>

      {/* Footer Actions */}
      <footer className="w-full max-w-[320px] space-y-6">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full py-5 bg-primary-container text-white font-headline font-black text-lg rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
        >
          Comenzar mi Simulación
          <ChevronRight className="w-5 h-5" />
        </motion.button>
        
        <button 
          className="w-full text-center"
          onClick={() => setView('dashboard')}
        >
          <p className="text-secondary font-bold text-sm tracking-wide">
            ¿Ya tienes cuenta? <span className="font-black underline decoration-secondary/30 underline-offset-4">Inicia Sesión</span>
          </p>
        </button>

        <div className="flex justify-center pt-2">
           <div className="w-1.5 h-1.5 rounded-full bg-outline-variant opacity-30" />
        </div>
      </footer>
    </div>
  );
}
