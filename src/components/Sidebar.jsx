import React from 'react';
import { LogOut, Package, Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Sidebar() {
  return (
    <div className="flex h-full w-72 flex-col border-r bg-zinc-950 text-white">
      {/* Logo section */}
      <div className="flex h-16 items-center gap-5 border-b border-zinc-800 px-4">
        <img
          alt=""
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=red&shade=600"
          className="h-6 sm:h-8 w-auto"
        />
        <p className='text-xl font-semibold tracking-wider'>BlokeCore</p>
      </div>

      {/* Nav section */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="flex flex-col gap-4 mx-auto justify-center">
          <NavLink href="/add">
            <Plus className="mr-5" />
            <p className='text-lg'>Add Products</p>
          </NavLink>
          <NavLink href="/products">
            <Package className="mr-5" />
            <p className='text-lg'>Products</p>
          </NavLink>
          <NavLink href="/orders">
            <ShoppingCart className="mr-5" />
            <p className='text-lg'>Orders</p>
          </NavLink>
        </div>
      </nav>

      {/* Logout section */}
      <div className="border-t border-zinc-800 hover:bg-zinc-900 p-4">
        <button 
          className="w-full flex items-center justify-start px-3 py-2 text-white rounded"
          onClick={() => console.log('Logout clicked')}
        >
          <LogOut className="mr-3 h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}

function NavLink({ href, children, ...props }) {
  return (
    <Link
      to={href}
      className="flex items-center rounded-lg px-3 py-2 text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
      {...props}
    >
      {children}
    </Link>
  );
}

