"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Hero } from "./ui/hero";
import dynamic from "next/dynamic";
import { useChainId } from "wagmi";
import { Button } from "./ui/button";
import Link from "next/link";
import { TokenCard } from "./ui/TokenCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const formSchema = z.object({
  to: z.coerce.string({
    required_error: "Address is required",
    invalid_type_error: "Address must be a string",
  }),
  uri: z.coerce.string({
    required_error: "uri is required",
    invalid_type_error: "uri must be a number",
  }),
});

// Mock data - replace with actual data fetching
const MOCK_TOKENS = [
  {
    creatorAddress: "0x1234567890abcdef",
    tokenName: "Cat Playin Golf",
    marketCap: "6.95K",
    replies: 18,
    imageUrl: "/cat-golf.jpg",
    timestamp: "2h ago",
    ticker: "CPG",
    description: "simply a cat playin golf",
    isLive: true,
  },
  {
    creatorAddress: "0xabcdef1234567890",
    tokenName: "just imagine",
    marketCap: "52.89K",
    replies: 146,
    imageUrl: "/imagine.jpg",
    timestamp: "4h ago",
    ticker: "imagine",
  },
  // Add more mock tokens as needed
];

function HomePage() {
  const { toast } = useToast();
  let chainId = useChainId();
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div className="min-h-screen bg-red-900 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Tabs defaultValue="following" className="w-full">
          <TabsList className="mb-8 flex space-x-2 overflow-x-auto">
            <TabsTrigger className="min-w-[100px]" value="following">Following</TabsTrigger>
            <TabsTrigger className="min-w-[100px]" value="terminal">Terminal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="following">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_TOKENS.map((token, index) => (
                <TokenCard
                  key={index}
                  {...token}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="terminal">
            <div className="text-zinc-400">
              Terminal content here
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(HomePage), {
  ssr: false,
});