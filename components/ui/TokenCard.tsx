import { Badge } from "./badge";
import Image from "next/image";
import logoGif from "@/assets/logo.gif";

interface TokenCardProps {
  creatorAddress: string;
  tokenName: string;
  marketCap: string;
  replies: number;
  timestamp: string;
  ticker?: string;
  description?: string;
  isLive?: boolean;
}

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
}

export function TokenCard({
  creatorAddress,
  tokenName,
  marketCap,
  replies,
  timestamp,
  ticker,
  description,
}: TokenCardProps) {
  return (
    <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700 hover:border-zinc-600 transition-all">
      <div className="flex items-start gap-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-black/20">
          <img 
            src={logoGif.src} 
            alt={tokenName}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm">Created by</span>
              <Badge variant="outline" className="text-xs">
                {truncateAddress(creatorAddress)}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-medium">{tokenName}</h3>
            {ticker && (
              <span className="text-zinc-400 text-sm">
                (ticker: {ticker})
              </span>
            )}
          </div>
          {description && (
            <p className="text-zinc-400 text-sm mb-1">{description}</p>
          )}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 text-sm">market cap:</span>
              <span className="text-green-400 text-sm">{marketCap}</span>
            </div>
            <div className="text-zinc-400 text-sm">replies: {replies}</div>
            <div className="text-zinc-500 text-sm">{timestamp}</div>
          </div>
        </div>
      </div>
    </div>
  );
}