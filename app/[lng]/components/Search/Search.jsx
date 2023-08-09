'use client'

import React, { useState } from 'react';
import { useTranslation } from '../../../i18n/client';

const Search = ({ style, lng, onSearch, suggestions, onSuggestionClick }) => {
  const { t } = useTranslation(lng, 'search');
  const [searchCampaigns, setSearchCampaigns] = useState('');

  const handleSearchChanges = (e) => {
    const query = e.target.value;
    setSearchCampaigns(query);
    onSearch(query);
  };

  const handleSuggestionClick = (campaignId) => {
    onSuggestionClick(campaignId);
    setSearchCampaigns(''); 
  };

  return (
    <form>
      <input
        type="text"
        className={style}
        placeholder={t('Search-for-campaigns')}
        value={searchCampaigns}
        onChange={handleSearchChanges}
      />
      {searchCampaigns.length > 0 && (
        <div className='absolute bg-accent text-gray-900 mt-1 w-full p-2.5 bg-white border-0 shadow-lg w-[19.5rem] rounded-lg ms-8 block '>
          <ul className="suggestions-list">
            {suggestions.map((campaign) => (
              <div
                className='cursor-pointer hover:bg-black hover:bg-opacity-10 p-2 flex items-center justify-between'
                key={campaign.id}
                onClick={() => handleSuggestionClick(campaign.id)} 
                title={campaign.data.about}
              >
                <button>
                  {campaign.data.projectName.slice(0, 14)}
                </button>
                <div className="ml-2">
                  <img src={campaign.data.image} alt={campaign.data.projectName}  className="w-14 h-7" />
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default Search;
