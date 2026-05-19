import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Wallet, TrendingUp, ChevronRight, School, CreditCard } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { ASSETS, DEBTS, HISTORICAL_DATA, DISTRIBUTION_DATA } from '../constants';

export default function DashboardView({ setView }: { setView: (v: any) => void }) {
  return (
    <div className="px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Net Worth Summary */}
      <section 
        className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10 shadow-sm cursor-pointer hover:scale-[1.01] transition-transform"
        onClick={() => setView('simulation')}
      >
        <h2 className="font-headline text-primary-container text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Patrimonio Neto Total</h2>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="font-display text-4xl font-extrabold tracking-tighter text-on-surface">$15.420.000</span>
          <span className="font-label text-sm font-medium text-outline uppercase tracking-widest">COP</span>
        </div>
        
        <div className="h-16 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HISTORICAL_DATA}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2e8b57" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2e8b57" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#2e8b57" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-1 mt-2">
          <TrendingUp className="w-4 h-4 text-success" />
          <span className="text-xs font-bold text-success">+8.4%</span>
          <span className="text-[10px] text-outline font-medium ml-1">ESTE MES</span>
        </div>
      </section>

      {/* Capital Distribution */}
      <section className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm flex flex-col items-center">
        <h3 className="font-headline font-bold text-on-surface self-start mb-8 text-sm uppercase tracking-widest">Distribución de Capital</h3>
        <div className="relative w-48 h-48 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DISTRIBUTION_DATA}
                innerRadius={65}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {DISTRIBUTION_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-headline text-2xl font-extrabold text-on-surface">Ratio 2:1</span>
            <span className="font-label text-[9px] uppercase tracking-widest text-outline">Activos vs Deuda</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-8 mt-10 w-full">
          {DISTRIBUTION_DATA.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[9px] font-black text-outline uppercase tracking-wider">{item.name}</span>
              </div>
              <span className="text-[10px] font-bold text-on-surface">
                {Math.round((item.value / DISTRIBUTION_DATA.reduce((acc, curr) => acc + curr.value, 0)) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Assets Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className="font-headline text-sm font-black text-success uppercase tracking-[0.2em]">Mis Activos</h2>
          <span className="text-xs font-bold text-on-surface-variant">$11.500.000</span>
        </div>
        <div className="space-y-3">
          {ASSETS.map((asset) => (
            <div 
              key={asset.id} 
              onClick={() => setView('simulation')}
              className="bg-surface-container-low p-5 rounded-[1.5rem] flex justify-between items-center border border-outline-variant/5 hover:bg-surface-container-lowest transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-outline-variant/10 text-success">
                  {asset.type === 'savings' ? <Wallet className="w-5 h-5" /> : <TrendingUp className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-headline font-bold text-on-surface text-sm">{asset.name}</p>
                  <p className="text-[10px] text-outline font-semibold tracking-wide">{asset.institution}</p>
                  {asset.detail && (
                    <div className="inline-block mt-1 px-2 py-0.5 bg-success/5 rounded-md">
                      <span className="text-[9px] font-bold text-success uppercase tracking-wider">{asset.detail}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-extrabold text-on-surface">{formatCurrency(asset.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Liabilities Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h2 className="font-headline text-sm font-black text-error uppercase tracking-[0.2em]">Mis Deudas</h2>
          <span className="text-xs font-bold text-on-surface-variant">$13.200.000</span>
        </div>
        <div className="space-y-3">
          {DEBTS.map((debt) => (
            <div key={debt.id} className={cn(
               "bg-surface-container-low p-5 rounded-[1.5rem] border border-outline-variant/5",
               debt.type === 'loan' && "space-y-4"
            )}>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-outline-variant/10 text-error">
                    {debt.type === 'loan' ? <School className="w-5 h-5" /> : <CreditCard className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface text-sm">{debt.name}</p>
                    {debt.interest && <p className="text-[10px] text-error font-bold tracking-wide mt-0.5">{debt.interest}</p>}
                  </div>
                </div>
                <p className="font-headline font-extrabold text-on-surface">{formatCurrency(debt.total)}</p>
              </div>
              
              {debt.type === 'loan' && (
                <div className="space-y-2">
                  <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-primary-container" style={{ width: `${(debt.paid/debt.total)*100}%` }} />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-outline">
                    <span>Pagado ({Math.round((debt.paid/debt.total)*100)}%)</span>
                    <span>Pendiente ({Math.round((1 - debt.paid/debt.total)*100)}%)</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="pt-4 text-center max-w-[280px] mx-auto pb-12">
        <p className="text-[10px] text-outline font-bold leading-relaxed uppercase tracking-widest">
          Tu nivel de endeudamiento es del 40%. Intenta reducirlo para mejorar tu Score crediticio.
        </p>
      </footer>
    </div>
  );
}
