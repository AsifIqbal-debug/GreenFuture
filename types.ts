export interface DonationPackage {
  label: string;
  trees: number;
  slug: string;
  description?: string;
}

export interface Stat {
  label: string;
  value: string;
  subtext?: string;
}

export interface TreeRecord {
  id: string;
  species: string;
  plantedAt: string;
  status: 'Sapling' | 'Growing' | 'Mature';
  lat: number;
  lng: number;
  imageUrl: string;
}

export enum PaymentMethod {
  BKASH = 'bkash',
  NAGAD = 'nagad',
  CARD = 'card'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}