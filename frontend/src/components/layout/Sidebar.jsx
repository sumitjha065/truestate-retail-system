import React, { useState } from 'react';
import {
  LayoutDashboard,
  Box,
  FileText,
  ChevronDown,
  ChevronRight,
  Monitor,
  ShieldCheck,
  Ban,
  XCircle,
  FileCheck,
  FileClock,
  User,
  LogOut,
  Vault
} from 'lucide-react';

const Sidebar = () => {
  // State for expanded sections
  const [expanded, setExpanded] = useState({
    services: true,
    invoices: true
  });

  const toggleSection = (section) => {
    setExpanded(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <aside className="w-64 bg-white h-screen flex flex-col border-r border-gray-200 fixed left-0 top-0 z-50 overflow-y-auto font-sans">
      {/* Header / Logo */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3">
        <div className="bg-black text-white p-1.5 rounded-lg">
          <Vault size={20} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-tight">Vault</h1>
          <p className="text-xs text-gray-500">Sumit Jha</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">

        {/* Static Links */}
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
        <SidebarItem icon={<Box size={20} />} label="Nexus" />
        <SidebarItem icon={<FileText size={20} />} label="Intake" />

        <div className="pt-4 pb-2">
          <div className="h-px bg-gray-100 mx-2"></div>
        </div>

        {/* Collapsible Services Section */}
        <div>
          <button
            onClick={() => toggleSection('services')}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Monitor size={20} />
              <span>Services</span>
            </div>
            {expanded.services ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {expanded.services && (
            <div className="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1">
              <SidebarSubItem icon={<Monitor size={16} />} label="Pre-active" />
              <SidebarSubItem icon={<ShieldCheck size={16} />} label="Active" active />
              <SidebarSubItem icon={<Ban size={16} />} label="Blocked" />
              <SidebarSubItem icon={<XCircle size={16} />} label="Closed" />
            </div>
          )}
        </div>

        {/* Collapsible Invoices Section */}
        <div>
          <button
            onClick={() => toggleSection('invoices')}
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} />
              <span>Invoices</span>
            </div>
            {expanded.invoices ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {expanded.invoices && (
            <div className="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1">
              <SidebarSubItem icon={<FileClock size={16} />} label="Proforma Invoices" />
              <SidebarSubItem icon={<FileCheck size={16} />} label="Final Invoices" />
            </div>
          )}
        </div>

      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100">
        <button className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

// Helper components
const SidebarItem = ({ icon, label, active = false }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${active
        ? 'bg-gray-100 text-gray-900'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

const SidebarSubItem = ({ icon, label, active = false }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${active
        ? 'bg-gray-100 text-gray-900 font-medium'
        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
      }`}
  >
    {icon}
    <span>{label}</span>
  </a>
);

export default Sidebar;