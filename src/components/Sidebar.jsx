import React from 'react';
import { LayoutDashboard, LogOut, Package, Plus, ShoppingCart, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Assets from '../assets/assets';

export function Sidebar({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex fixed left-0 top-0 bottom-0 h-full w-72 flex-col border-r bg-black text-white">
      {/* Close button for mobile */}
      {onClose && (
        <button 
          onClick={onClose} 
          className="md:hidden absolute top-4 right-4 text-white p-2 hover:bg-zinc-800 rounded"
        >
          <X className="h-5 w-5"/>
        </button>
      )}

      {/* Logo section */}
      <div className="flex h-16 items-center gap-5 border-b border-zinc-800 px-4">
        <img
          alt=""
          src={Assets.logoBlokecore}
          className="h-6 sm:h-8 w-auto"
        />
        <p className='text-xl font-semibold tracking-wider'>Dashboard</p>
      </div>

      {/* Nav section */}
      <nav className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          <NavLink href="/" isActive={location.pathname === '/'}>
            <LayoutDashboard className="mr-5" />
            <p className='text-lg font-medium'>Dashboard</p>
          </NavLink>
          <NavLink href="/add" isActive={location.pathname === '/add'}>
            <Plus className="mr-5" />
            <p className='text-lg font-medium'>Add Items</p>
          </NavLink>
          <NavLink href="/list" isActive={location.pathname === '/list'}>
            <Package className="mr-5" />
            <p className='text-lg font-medium'>List Product</p>
          </NavLink>
          <NavLink href="/orders" isActive={location.pathname === '/orders'}>
            <ShoppingCart className="mr-5" />
            <p className='text-lg font-medium'>Orders</p>
          </NavLink>
        </div>
      </nav>

      {/* Logout section */}
      <div className="border-t border-black hover:bg-zinc-900 p-4">
        <button 
          className="w-full flex items-center justify-start px-3 py-2 text-white rounded font-medium"
          onClick={handleLogout}
        >
          <LogOut className="mr-5" />
          <p className='text-lg'>Logout</p>
        </button>
      </div>
    </div>
  );
}

function NavLink({ href, children, isActive, ...props }) {
  return (
    <Link
      to={href}
      className={`flex items-center rounded-lg px-3 py-2 transition-colors hover:bg-black hover:text-zinc-100 ${
        isActive ? 'bg-black text-zinc-100' : 'text-zinc-400'
      }`}
      {...props}
    >
      {children}
    </Link>
  );
}