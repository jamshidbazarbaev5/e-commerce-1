import React from 'react';

interface SearchFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ searchTerm, setSearchTerm, filterType, setFilterType }) => {
  return (
    <div className="mb-8 space-y-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <div className="flex flex-wrap gap-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="all"
            checked={filterType === 'all'}
            onChange={() => setFilterType('all')}
            className="form-radio text-blue-600"
          />
          <span className="ml-2">All</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="lowToHigh"
            checked={filterType === 'lowToHigh'}
            onChange={() => setFilterType('lowToHigh')}
            className="form-radio text-blue-600"
          />
          <span className="ml-2">Price: Low to High</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value="highToLow"
            checked={filterType === 'highToLow'}
            onChange={() => setFilterType('highToLow')}
            className="form-radio text-blue-600"
          />
          <span className="ml-2">Price: High to Low</span>
        </label>
      </div>
    </div>
  );
};

export default SearchFilter;