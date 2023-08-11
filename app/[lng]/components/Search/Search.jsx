"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../../../i18n/client';
import './Search.css'

const Search = ({ style, lng, onSearch, suggestions, onSuggestionClick }) => {
  const { t } = useTranslation(lng, "search");
  const [searchCampaigns, setSearchCampaigns] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchCampaigns("");
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearchChanges = (e) => {
    const query = e.target.value;
    setSearchCampaigns(query);
    onSearch(query);
    setIsDropdownOpen(query.length > 0);
  };

  const handleSuggestionClick = (campaignId) => {
    onSuggestionClick(campaignId);
    setSearchCampaigns("");
    setIsDropdownOpen(false);
  };

  return (
    <form>
      <input
        ref={searchRef}
        type="text"
        className={`search-box ${style} `}
        placeholder={t('Search-for-campaigns')}
        value={searchCampaigns}
        onChange={handleSearchChanges}
      />
      {searchCampaigns.length > 0 && isDropdownOpen && (
        <div className={`suggestions-dropdown  ${style}`} style={{ top: window.innerWidth < 1280 ? '230%' : '100%', width: window.innerWidth < 1280 ? '12.4rem' : '20rem' }}>
          <ul className="suggestions-list">
            {suggestions.length > 0 ? (
              suggestions.map((campaign) => (
                <div
                  className='suggestions-attributes'
                  key={campaign.id}
                  onClick={() => handleSuggestionClick(campaign.id)}
                  title={campaign.data.about}
                >
                  <div className='suggestions-content'>
                    <button>
                      {campaign.data.projectName.slice(0, 14)}
                    </button>
                    <div className="ml-2">
                      <img src={campaign.data.image} alt={campaign.data.projectName} className="w-14 h-7" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <span className='text-sm text-gray-900/50'>{t('Campaigns not found')}</span>
              </div>
            )}
          </ul>
        </div>
      )}
    </form>
  );
};

export default Search;
