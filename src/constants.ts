import { Asset, Debt } from './types';

export const ASSETS: Asset[] = [
  {
    id: '1',
    name: 'Cuenta de Ahorros',
    institution: 'Bancolombia • **4921',
    value: 3500000,
    type: 'savings',
  },
  {
    id: '2',
    name: 'Inversión en CDT',
    institution: 'Bancolombia',
    value: 8000000,
    type: 'investment',
    detail: 'Rindiendo 12% E.A.',
  },
];

export const DEBTS: Debt[] = [
  {
    id: '1',
    name: 'Crédito Educativo (ICETEX)',
    total: 12000000,
    paid: 3600000, // 30%
    type: 'loan',
  },
  {
    id: '2',
    name: 'Tarjeta de Crédito',
    total: 1200000,
    paid: 0,
    type: 'card',
    interest: '2.4% Interés Mensual',
  },
];

export const HISTORICAL_DATA = [
  { day: '01', value: 14000000 },
  { day: '05', value: 14200000 },
  { day: '10', value: 14100000 },
  { day: '15', value: 14600000 },
  { day: '20', value: 14400000 },
  { day: '25', value: 15100000 },
  { day: '30', value: 15420000 },
];

export const DISTRIBUTION_DATA = [
  { name: 'Liquidez', value: 3500000, color: '#014694' },
  { name: 'Inversión', value: 8000000, color: '#2e8b57' },
  { name: 'Deuda', value: 13200000, color: '#ba1a1a' },
];
