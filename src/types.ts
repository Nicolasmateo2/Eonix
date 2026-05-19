export interface Asset {
  id: string;
  name: string;
  institution: string;
  value: number;
  type: 'savings' | 'investment';
  detail?: string;
}

export interface Debt {
  id: string;
  name: string;
  total: number;
  paid: number;
  type: 'loan' | 'card';
  interest?: string;
}

export interface UserStats {
  level: number;
  xp: number;
  nextLevelXp: number;
  simulations: number;
  lessons: number;
  netWorth: number;
}
