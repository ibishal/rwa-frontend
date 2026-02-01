import React from 'react';
import { Card } from './Card';
import { MOCK_ORDER_BOOK_ENTRIES } from '../constants';
import { Lock } from 'lucide-react';

export const OrderBook: React.FC = () => {
  return (
    <Card className="h-full flex flex-col" noPadding>
      <div className="p-4 border-b border-crypto-border/50 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Dark Pool Order Book</h3>
        <div className="flex items-center gap-2 text-xs text-crypto-success px-2 py-1 bg-crypto-success/10 border border-crypto-success/20 rounded">
          <div className="w-1.5 h-1.5 rounded-full bg-crypto-success animate-pulse"></div>
          Live
        </div>
      </div>
      
      <div className="flex-1 overflow-auto font-mono text-sm">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-crypto-muted text-xs uppercase sticky top-0 backdrop-blur-md">
            <tr>
              <th className="p-3">Price (USDC)</th>
              <th className="p-3 text-right">Size</th>
              <th className="p-3 text-right">Commitment Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_ORDER_BOOK_ENTRIES.map((order, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className={`p-3 ${order.side === 'BUY' ? 'text-crypto-success' : 'text-crypto-error'}`}>
                  {order.price.toFixed(2)}
                </td>
                <td className="p-3 text-right text-white">
                  {order.quantity.toLocaleString()}
                </td>
                <td className="p-3 text-right text-crypto-muted flex items-center justify-end gap-2">
                  <span className="opacity-50 group-hover:opacity-100 transition-opacity">{order.hash}</span>
                  {order.shielded && <Lock className="w-3 h-3 text-crypto-secondary" />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};