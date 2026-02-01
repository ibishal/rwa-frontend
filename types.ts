export enum OrderSide {
  BUY = 'BUY',
  SELL = 'SELL'
}

export enum OrderStatus {
  CREATED = 'CREATED',
  PROVING = 'PROVING',
  COMMITTED = 'COMMITTED',
  FILLED = 'FILLED'
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  type: 'BOND' | 'TREASURY' | 'REAL_ESTATE';
  price: number;
  yield: number;
  maturity: string;
  riskScore: string;
  description: string;
}

export interface Order {
  id: string;
  assetId: string;
  side: OrderSide;
  price: number;
  quantity: number;
  status: OrderStatus;
  commitmentHash: string; // The Poseidon hash
  timestamp: number;
}

export interface ZKProof {
  proof: string;
  publicSignals: string[];
  verificationKey: string;
}

export interface UserSession {
  walletAddress: string;
  isWhitelisted: boolean;
  kycLevel: number;
}