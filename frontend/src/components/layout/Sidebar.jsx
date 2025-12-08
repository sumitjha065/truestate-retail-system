import React from 'react';
import { 
  Home, 
  BarChart3, 
  Users, 
  Settings, 
  FileText,
  CreditCard,
  User,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Dashboard', active: false },
    { icon: <BarChart3 className="w-5 h-5" />, label: 'Nexus', active: false },
    { icon: <Users className="w-5 h-5" />, label: 'Invoke', active: false },
    { icon: <Settings className="w-5 h-5" />, label: 'Services', active: false },
  ];

  const preActiveItems = [
    { label: 'Active', active: true },
    { label: 'Blocked', active: false },
    { label: 'Closed', active: false },
  ];

  const footerItems = [
    { icon: <FileText className="w-5 h-5" />, label: 'Invoices' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Performa Invoices' },
    { icon: <FileText className="w-5 h-5" />, label: 'Final Invoices' },
  ];

  return (
    <div className="w-64 bg-sidebar text-white h-screen flex flex-col fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">Vault</h1>
      </div>

      {/* User Info */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="font-medium">Anurag Yadav</p>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4 space-y-1">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`sidebar-link ${item.active ? 'sidebar-link-active' : ''}`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </a>
          ))}

          {/* Pre-active Section */}
          <div className="mt-6">
            <a
              href="#"
              className="sidebar-link sidebar-link-active bg-purple-600"
            >
              <Settings className="w-5 h-5" />
              <span className="ml-3">Pre-active</span>
            </a>
            
            <div className="ml-4 mt-2 space-y-1">
              {preActiveItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`block px-4 py-2.5 text-sm rounded-lg transition-colors duration-200 ${
                    item.active
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Footer Links */}
      <div className="border-t border-gray-700 pt-4 pb-6">
        <nav className="px-4 space-y-1">
          {footerItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="sidebar-link"
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </a>
          ))}
          
          {/* Logout */}
          <a
            href="#"
            className="sidebar-link text-red-400 hover:bg-red-900 hover:text-red-300"
          >
            <LogOut className="w-5 h-5" />
            <span className="ml-3">Logout</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;