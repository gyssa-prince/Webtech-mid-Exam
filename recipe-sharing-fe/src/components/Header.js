import React from 'react';

// Header Component
const Header = () => {
    return (
        <header className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-bold">RECIPE SHARING</h1>
                <nav className="mt-2">
                    <ul className="flex space-x-4">
                        <li><a href="../" className="hover:underline">Home</a></li>
                        <li><a href="/sign-in" className="hover:underline">Sign in</a></li>
                        <li><a href="/Dashboard" className="hover:underline">Dashboard</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};
export default Header;