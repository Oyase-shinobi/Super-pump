"use client"
import React, { useState } from 'react';
import { Form, Button, Slider } from 'antd';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
interface Pros{
    onFilter: (filters:any)=>void
}
const FilterBillBoard = ({ onFilter }:Pros) => {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [priceRange, setPriceRange] = useState([500, 20000]);
  const [sizeRange, setSizeRange] = useState([100, 1000]);

  const handleCountryChange = (val:any) => {
    setCountry(val);
    setRegion(''); // Reset city when country changes
  };

  const handleSubmit = () => {
    // Pass all filters back, even if some are not selected
    const filterData = {
      country: country || undefined,
      region: region || undefined,
      priceRange: priceRange || undefined,
      sizeRange: sizeRange || undefined,
    };
    onFilter(filterData);
  };

  return (
    <div className="h-full flex flex-col p-4 rounded-lg text-white justify-center">
      <Form layout="vertical" onFinish={handleSubmit}>

        {/* Country */}
        <input 
        type="text" 
        placeholder="search for token" 
        className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
      />

       
<button 
        onClick={handleSubmit}
        className="bg-green-400 hover:bg-green-500 text-black px-4 py-2 rounded-lg"
      >
        search
      </button>
      </Form>
    </div>
  );
};

export default FilterBillBoard;
