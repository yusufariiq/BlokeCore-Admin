import React, { useState } from "react";
import { Menu, X } from 'lucide-react';
import { Sidebar } from "./Sidebar";

export function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen">
      {/* Hidden on mobile, visible on desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1">
        
        {/* Mobile navbar */}
        <header className="flex px-4 py-5 items-center justify-between gap-4 border-b bg-black md:hidden">
          <div className="flex flex-row space-x-5 ">
            <img
              alt=""
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=red&shade=600"
              className="h-8 w-auto"
            />
            <p className="text-xl font-semibold text-white">Dashboard</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-white hover:bg-zinc-800 rounded"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>
        
        {/* Mobile sidebar */}
        <div 
          className={`fixed inset-y-0 right-0 z-50 w-72 bg-black shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        >
          <button 
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-3 right-4 text-white p-2 hover:bg-zinc-800 rounded"
              >
                <X className="h-5 w-5"/>
              </button>
              <Sidebar />
        </div>

        {/* Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Page content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

