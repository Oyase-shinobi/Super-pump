"use client";
import React, { useState } from 'react';
import { Form, Button, Slider } from 'antd';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Link from 'next/link'; // Import Link từ next/link

interface Props {
    onFilter: (filters: any) => void;
}

const FilterBillBoard = ({ onFilter }: Props) => {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [priceRange, setPriceRange] = useState([500, 20000]);
  const [sizeRange, setSizeRange] = useState([100, 1000]);
  const [showAnimations, setShowAnimations] = useState(false);
  const [showMigratedToken, setShowMigratedToken] = useState(false);
  const [sortOrder, setSortOrder] = useState('bump-order');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCountryChange = (val: any) => {
    setCountry(val);
    setRegion(''); // Reset region when country changes
  };

  const handleSubmit = () => {
    const filterData = {
      country: country || undefined,
      region: region || undefined,
      priceRange: priceRange || undefined,
      sizeRange: sizeRange || undefined,
    };
    onFilter(filterData);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="h-full flex flex-col p-4 rounded-lg text-white justify-center">
      {/* Double Up Create Token Section */}
      <div className="bg-black text-white min-h-screen flex items-center justify-center"> 
        <div className="container mx-auto px-8 sm:px-20 py-8 sm:py-35 space-y-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: 'rgb(199, 251, 81)' }}>[create a new token]</h2>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold" style={{ color: 'rgb(199, 251, 81)' }}>The Shining Star</h2>
          </div>
          <main className="content w-full flex flex-col gap-8 items-center">
            {/* Info Block */}
            <div className="info-block p-4 border border-gray-300 rounded-lg flex flex-col items-center bg-gray-800">
              <p>Created by 0x8e6de4...5e8a2c87</p>
              <p className="symbol">PEACEMAKER (symbol: PEACE)</p>
              <p>Market cap: 7.39K</p>
              <a href="#">
                <img 
                  src="https://avatars.githubusercontent.com/u/126134422?v=4" 
                  alt="Token Icon" 
                  className="w-20 h-20" 
                />
              </a>
            </div>

            {/* Search Container */}
            <div className="search-container flex gap-4 items-center w-full justify-center bg-gray-800 p-4 rounded-lg">
              <input
                type="text"
                className="search-box flex-1 rounded-full border border-white/50 transition-colors hover:bg-gray-700 px-4 py-2"
                placeholder="search for token"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                className="search-button rounded-full bg-blue-500 text-white hover:bg-blue-600 px-4 py-2" 
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Sort Order */}
            <div className="sort-order flex gap-4 items-center justify-center bg-gray-800 p-4 rounded-lg">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="show-animations"
                  checked={showAnimations}
                  onChange={() => setShowAnimations(!showAnimations)}
                />
                Show animations
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="show-migrated-token"
                  checked={showMigratedToken}
                  onChange={() => setShowMigratedToken(!showMigratedToken)}
                />
                Show migrated token
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-full border border-white/50 transition-colors hover:bg-gray-700 px-4 py-2"
              >
                <option value="bump-order">Bump order</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FilterBillBoard;