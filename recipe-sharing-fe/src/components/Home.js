import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const ComponentName = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch recipes from the JSON server
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await fetch('http://localhost:3000/recipes'); // Update the URL based on your server's settings
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecipes(data);
            } catch (error) {
                console.error('Failed to fetch recipes:', error);
            }
        };

        fetchRecipes();
    }, []); // Empty dependency array means this effect runs once on mount

    // Filter recipes based on search term
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Header />
            <section className="py-12 bg-white sm:py-16 lg:py-20">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl flex justify-between">
                    <div className="max-w-md mx-auto text-center">
                        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our Newly Created Recipes</h2>
                        <p className="mt-4 text-base font-normal leading-7 text-gray-600">Discover delicious recipes crafted with care and passion.</p>
                    </div>

                    {/* Search Input */}
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="max-w-[1300px] mx-auto px-4 grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4">
                    {filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="relative group">
                            <div className="w-full h-56 overflow-hidden rounded-lg">
                                <img
                                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125"
                                    src={recipe.image}
                                    alt={recipe.title}
                                />
                            </div>
                            {recipe.isNew && (
                                <div className="absolute left-3 top-3">
                                    <p className="sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-gray-900 uppercase bg-white rounded-full">New</p>
                                </div>
                            )}

                            {/* Title and description in block layout */}
                            <div className="mt-4">
                                <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base block">
                                    <a href="#" title="">
                                        {recipe.title}
                                        <span className="absolute inset-0" aria-hidden="true"></span>
                                    </a>
                                </h3>
                                <p className="mt-2 text-xs text-gray-600 sm:text-sm md:text-base block">
                                    {recipe.description}
                                </p>
                                <p className="mt-1 text-xs font-bold text-gray-900 sm:text-sm md:text-base">Shared by: {recipe.sharedBy}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default ComponentName;
