import { Asset } from './types';

export const MOCK_ASSETS: Asset[] = [
  {
    id: '1',
    symbol: 'UST-10Y',
    name: 'US Treasury 10Y Tokenized',
    type: 'TREASURY',
    price: 98.45,
    yield: 4.2,
    maturity: '2034-05-15',
    riskScore: 'AA+',
    description: 'Tokenized representation of the 10-year US Treasury Note. Backed by regulated custodian assets.'
  },
  {
    id: '2',
    symbol: 'CORP-AAPL-25',
    name: 'Apple Corp Bond 2025',
    type: 'BOND',
    price: 101.20,
    yield: 5.1,
    maturity: '2025-11-01',
    riskScore: 'AAA',
    description: 'Senior unsecured notes issued by Apple Inc., tokenized for fractional institutional ownership.'
  },
  {
    id: '3',
    symbol: 'EU-GER-BUND',
    name: 'German Bund 5Y',
    type: 'TREASURY',
    price: 99.10,
    yield: 2.8,
    maturity: '2029-02-15',
    riskScore: 'AAA',
    description: 'Federal Republic of Germany 5-year Bund. Euro-denominated safe haven asset.'
  },
  {
    id: '4',
    symbol: 'GB-GILTS',
    name: 'UK Gilt 2030',
    type: 'TREASURY',
    price: 96.30,
    yield: 4.5,
    maturity: '2030-07-22',
    riskScore: 'AA',
    description: 'United Kingdom government bonds (Gilts) offering fixed coupon payments.'
  }
];

export const MOCK_ORDER_BOOK_ENTRIES = [
  { price: 98.46, quantity: 150000, side: 'SELL', hash: '0x9a...f2', shielded: true },
  { price: 98.47, quantity: 500000, side: 'SELL', hash: '0x1b...e9', shielded: true },
  { price: 98.48, quantity: 25000, side: 'SELL', hash: '0x7c...a1', shielded: true },
  { price: 98.44, quantity: 100000, side: 'BUY', hash: '0x3d...b5', shielded: true },
  { price: 98.42, quantity: 300000, side: 'BUY', hash: '0x8f...c3', shielded: true },
  { price: 98.40, quantity: 750000, side: 'BUY', hash: '0x2a...d8', shielded: true },
];