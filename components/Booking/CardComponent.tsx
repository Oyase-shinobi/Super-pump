import React, { useState, useEffect } from 'react';
import { Billboard } from '@/lib/type';
import TokenModal from './BookingModal';
import { BLOCK_EXPLORER_MOONBEAM } from "@/components/contract";

interface CardProps {
  billboard: Billboard;
  onBooking: () => void;
}

const CardComponent: React.FC<CardProps> = ({ billboard, onBooking }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tokens, setTokens] = useState<string[]>([]);

  const fetchTokens = async () => {
    try {
      const response = await fetch('https://rpc.api.moonbase.moonbeam.network', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_call',
          params: [{
            to: '0x4fe8ea21679b3ee10457a097c38452a94edab33b',
            data: '0x5e8082a8'
          }, 'latest']
        })
      });
      const result = await response.json();
      if (result.result) {
        const addresses = result.result.slice(130).match(/.{40}/g)
          .map((addr: string) => '0x' + addr);
        setTokens(addresses);
      }
    } catch (error) {
      console.error('Error fetching tokens:', error);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    fetchTokens(); // Refresh tokens when modal is closed
  };

  return (
    <div className="bg-white/60 text-black shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <img
        alt="billboard"
        src={billboard.imageUrl}
        className="w-full h-40 object-cover bg-transparent"
      />
      <div className="p-4">
        <h3 className="text-sm overflow-hidden h-[22px]">{billboard.address}</h3>
        <p className="">Rental Price: {billboard.price}/day</p>
        
        {tokens.length > 0 && (
          <div className="mt-2 max-h-[100px] overflow-y-auto">
            <p className="text-sm font-semibold">Available Tokens:</p>
            {tokens.map((token, index) => (
              <a
                key={index}
                href={`${BLOCK_EXPLORER_MOONBEAM}/address/${token}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 block truncate"
              >
                {token}
              </a>
            ))}
          </div>
        )}

        <button
          className="mt-4 bg-black text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200"
          onClick={showModal}
        >
          Booking
        </button>
      </div>

      <TokenModal
        isVisible={isModalVisible}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CardComponent;