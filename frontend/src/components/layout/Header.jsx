import React from 'react';
import { Bell, HelpCircle, Search } from 'lucide-react';
import SearchBar from '../common/SearchBar';

const Header = ({ onSearch, searchValue }) => {
  const avatars = ['S', 'U', 'S'];

  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales Management System</h1>
          <p className="text-sm text-gray-600 mt-1">Monitor and manage all sales transactions</p>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="w-80">
            <SearchBar 
              onSearch={onSearch} 
              initialValue={searchValue}
              placeholder="Search Name, Phone no."
            />
          </div>

          {/* Icons */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
            <Bell className="w-5 h-5" />
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Avatar Circles */}
          <div className="flex items-center space-x-2">
            {avatars.map((initial, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-700"
              >
                {initial}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;