import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  TrendingUp, 
  Lightbulb, 
  User, 
  Plus, 
  Bell, 
  ArrowLeft,
  GraduationCap,
  ShieldCheck,
  Trophy,
  LayoutGrid,
  History,
  AlertTriangle,
  Rocket
} from 'lucide-react';
import { cn } from './lib/utils';
import DashboardView from './pages/Dashboard';
import SimulationView from './pages/Simulation';
import LearningView from './pages/Learning';
import ProfileView from './pages/Profile';
import WelcomeView from './pages/Welcome';

type View = 'welcome' | 'dashboard' | 'simulation' | 'learning' | 'profile';

export default function App() {
  const [currentView, setCurrentView] = React.useState<View>('welcome');
  const [showAlert, setShowAlert] = React.useState(false);

  // Simulation state for alert trigger (mock)
  React.useEffect(() => {
    const hasSeenAlert = localStorage.getItem('eonix_market_alert_seen');
    if (currentView === 'dashboard' && !hasSeenAlert) {
      const timer = setTimeout(() => {
        setShowAlert(true);
        localStorage.setItem('eonix_market_alert_seen', 'true');
      }, 6000); // Increased delay to 6 seconds
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  const renderView = () => {
    const commonProps = { setView: setCurrentView };
    switch (currentView) {
      case 'welcome': return <WelcomeView onStart={() => setCurrentView('dashboard')} setView={setCurrentView} />;
      case 'dashboard': return <DashboardView {...commonProps} />;
      case 'simulation': return <SimulationView {...commonProps} />;
      case 'learning': return <LearningView {...commonProps} />;
      case 'profile': return <ProfileView {...commonProps} />;
      default: return <DashboardView {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary-container flex flex-col items-center">
      <div className="w-full max-w-md bg-surface min-h-screen relative flex flex-col">
        {/* Top Header */}
        {currentView !== 'welcome' && (
          <header className="fixed top-0 w-full max-w-md z-50 architect-glass h-16 flex items-center justify-between px-6 border-b border-outline-variant/10">
            <div className="flex items-center gap-3">
              {currentView !== 'dashboard' ? (
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="p-2 -ml-2 hover:bg-surface-container-low rounded-full transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-primary" />
                </button>
              ) : (
                <div className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant/30">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&auto=format&fit=crop" alt="User" className="w-full h-full object-cover" />
                </div>
              )}
              <h1 className="font-headline text-xl font-extrabold tracking-tighter text-primary">Eonix</h1>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 hover:bg-surface-container-low rounded-full transition-colors relative"
                onClick={() => setShowAlert(true)}
              >
                <Bell className="w-6 h-6 text-primary" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white" />
              </button>
            </div>
          </header>
        )}

        {/* Content */}
        <main className={cn(
          "flex-grow pb-32",
          currentView !== 'welcome' && "pt-24"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Nav */}
        {currentView !== 'welcome' && (
          <nav className="fixed bottom-0 w-full max-w-md z-50 architect-glass px-4 pb-8 pt-4 flex justify-around items-center border-t border-outline-variant/10">
            <NavItem 
              active={currentView === 'dashboard'} 
              icon={Wallet} 
              label="Cartera" 
              onClick={() => setCurrentView('dashboard')} 
            />
            <NavItem 
              active={currentView === 'simulation'} 
              icon={History} 
              label="Simular" 
              onClick={() => setCurrentView('simulation')} 
            />
            <NavItem 
              active={currentView === 'learning'} 
              icon={Lightbulb} 
              label="Aprender" 
              onClick={() => setCurrentView('learning')} 
            />
            <NavItem 
              active={currentView === 'profile'} 
              icon={User} 
              label="Perfil" 
              onClick={() => setCurrentView('profile')} 
            />
          </nav>
        )}

        {/* Quick Action Button */}
        {currentView === 'dashboard' && (
          <div className="fixed bottom-24 w-full max-w-md px-6 z-40">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-tertiary-fixed-dim text-on-tertiary-fixed py-4 rounded-full font-headline font-extrabold flex items-center justify-center gap-2 shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Realizar Abono o Inversión</span>
            </motion.button>
          </div>
        )}

        {/* Alert Modal */}
        <AnimatePresence>
          {showAlert && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1b1c1c]/90 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white/95 backdrop-blur-xl w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl p-8 flex flex-col items-center text-center relative"
              >
                <div className="mb-6">
                  <AlertTriangle className="w-16 h-16 text-error" fill="#ba1a1a20" />
                </div>
                <h2 className="font-headline font-extrabold text-[22px] leading-tight text-[#1b1c1c] mb-2">
                  ¡ALERTA DE MERCADO: INFLACIÓN AL ALZA!
                </h2>
                <p className="text-secondary font-bold text-xs tracking-wider uppercase mb-6">
                  Evento Externo: Coyuntura Nacional
                </p>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-8">
                  El costo de la canasta básica en Colombia ha subido inesperadamente. Tus gastos fijos mensuales aumentarán un <span className="text-error font-bold text-lg">12%</span> durante los próximos 6 meses.
                </p>

                <div className="w-full bg-surface-container-high/50 rounded-2xl p-6 mb-8">
                  <div className="flex justify-around items-end h-24 gap-4 mb-4">
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full bg-secondary-container h-[60%] rounded-t-lg" />
                      <span className="text-[10px] font-bold text-secondary uppercase">Actual</span>
                    </div>
                    <div className="w-full flex flex-col items-center gap-2">
                      <div className="w-full bg-error h-[85%] rounded-t-lg" />
                      <span className="text-[10px] font-bold text-error uppercase">Nuevo</span>
                    </div>
                  </div>
                  <div className="bg-error text-white text-xs font-black py-2 px-4 rounded-full inline-block">
                    +$250.000 COP
                  </div>
                </div>

                <div className="w-full space-y-4">
                  <button 
                    onClick={() => setShowAlert(false)}
                    className="w-full py-4 bg-primary text-white rounded-full font-headline font-bold"
                  >
                    Ajustar presupuesto
                  </button>
                  <button 
                    onClick={() => setShowAlert(false)}
                    className="text-secondary font-bold text-xs underline decoration-secondary/30 underline-offset-4"
                  >
                    Ver impacto a largo plazo
                  </button>
                </div>

                <div className="absolute -bottom-6 -right-6 opacity-[0.03] select-none pointer-events-none text-8xl font-black italic">
                  EONIX
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NavItem({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300",
        active ? "bg-secondary-container text-primary scale-105" : "text-on-surface-variant/60"
      )}
    >
      <Icon className={cn("w-6 h-6", active && "fill-current")} />
      <span className="font-headline text-[10px] font-bold uppercase tracking-widest mt-1">{label}</span>
    </button>
  );
}
