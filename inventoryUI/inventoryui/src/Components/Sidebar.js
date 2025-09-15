// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = ({ open, setOpen }) => {
    const handleIconClick = (path) => {
        setOpen(true);
        window.location.href = path;
    };

    return (
        <div
            className={`bg-gray-900 text-white h-screen fixed top-0 left-0 z-40 transition-all duration-300 ${
                open ? 'w-64' : 'w-16'
            }`}
        >
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
                <h1
                    className={`text-2xl font-bold text-teal-400 transition-opacity duration-300 ${
                        open ? 'opacity-100' : 'opacity-0 hidden'
                    }`}
                >
                    IMS
                </h1>
                <button onClick={() => setOpen(!open)} className="text-white text-2xl">
                    {open ? <FiX /> : <FiMenu />}
                </button>
            </div>

            <nav className="px-4 pt-4">
                <ul className="space-y-4 text-lg">
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/')}
                        >
                            🏠
                        </span>
                        <Link
                            to="/"
                            className={`hover:text-teal-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/product')}
                        >
                            📦
                        </span>
                        <Link
                            to="/product"
                            className={`hover:text-teal-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Product
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/transaction')}
                        >
                            💰
                        </span>
                        <Link
                            to="/transaction"
                            className={`hover:text-teal-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Transaction
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/sell')}
                        >
                            🛒
                        </span>
                        <Link
                            to="/sell"
                            className={`hover:text-teal-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Sell
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/category')}
                        >
                            🏷️
                        </span>
                        <Link
                            to="/category"
                            className={`hover:text-teal-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Category
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/supplier')}
                        >
                            🚚
                        </span>
                        <Link
                            to="/supplier"
                            className={`hover:text-teal-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Supplier
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/purchase')}
                        >
                            🛍️
                        </span>
                        <Link
                            to="/purchase"
                            className={`hover:text-teal-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Purchase
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/profile')}
                        >
                            👤
                        </span>
                        <Link
                            to="/profile"
                            className={`hover:text-teal-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Profile
                        </Link>
                    </li>
                    <li className="flex items-center">
                        <span
                            className="text-xl mr-4 cursor-pointer"
                            onClick={() => handleIconClick('/logout')}
                        >
                            🚪
                        </span>
                        <Link
                            to="/logout"
                            className={`hover:text-red-400 block transition-all duration-300 ${
                                open ? 'opacity-100' : 'opacity-0 hidden'
                            }`}
                        >
                            Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
