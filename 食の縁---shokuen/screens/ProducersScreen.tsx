
import React, { useState } from 'react';
import { Producer } from '../types';
import ProducerCard from '../components/ProducerCard';
import SectionTitle from '../components/SectionTitle';

interface ProducersScreenProps {
  producers: Producer[];
}

const ProducersScreen: React.FC<ProducersScreenProps> = ({ producers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  // TODO: Add filter for followed status using AuthContext

  const filteredProducers = producers.filter(producer => {
    const nameMatch = producer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const cropMatch = filterCrop === '' || producer.specialty.some(s => s.toLowerCase().includes(filterCrop.toLowerCase()));
    const locationMatch = filterLocation === '' || producer.location.toLowerCase().includes(filterLocation.toLowerCase());
    return nameMatch && cropMatch && locationMatch;
  });
  
  // Dummy options for filters - in a real app, these might be dynamic
  const uniqueCrops = Array.from(new Set(producers.flatMap(p => p.specialty))).slice(0, 5); // Example
  const uniqueLocations = Array.from(new Set(producers.map(p => p.location.split(' ')[0]))).slice(0, 5); // Example: Prefectures


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <SectionTitle>生産者のみなさん</SectionTitle>
      
      {/* Search and Filter UI Placeholder */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="生産者名で検索..."
            className="p-2 border border-stone-300 rounded-md focus:ring-green-500 focus:border-green-500 placeholder-gray"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="生産者名で検索"
          />
          <select 
            className="p-2 border border-stone-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            aria-label="作物で絞り込み"
          >
            <option value="">作物で絞り込み (すべて)</option>
            {uniqueCrops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
          </select>
          <select 
            className="p-2 border border-stone-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            aria-label="地域で絞り込み"
          >
            <option value="">地域で絞り込み (すべて)</option>
            {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
        </div>
        {/* TODO: Add "フォロー中のみ表示" checkbox if user is authenticated */}
      </div>

      {filteredProducers.length > 0 ? (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducers.map((producer) => (
            <ProducerCard key={producer.id} producer={producer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p className="mt-4 text-xl text-stone-600">条件に合う生産者が見つかりませんでした。</p>
            <p className="mt-2 text-sm text-stone-500">検索条件を変更してみてください。</p>
        </div>
      )}
    </div>
  );
};

export default ProducersScreen;
