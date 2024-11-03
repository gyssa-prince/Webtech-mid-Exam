import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('addRecipe');
  const [recipes, setRecipes] = useState([]); // State for recipes
  const navigate = useNavigate();
  const [selectedRecipeId, setSelectedRecipeId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(''); // New state for image URL

  // Check authentication on component mount
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('auth');
    console.log('Authentication Status:', isAuthenticated);
    if (isAuthenticated !== 'true') {
      navigate('/sign-in');
    } else {
      fetchRecipes(); // Fetch recipes only once when authenticated
    }
  }, [navigate]);
  
  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3000/recipes');
      const data = await response.json();
      console.log('Fetched Recipes:', data); // Log the entire response
      
      if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        console.error('Expected data to be an array:', data);
        setRecipes([]); // Set to an empty array if not valid
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/');
  };

  const handleRecipeSelect = (event) => {
    const selectedId = event.target.value;
    const selectedRecipe = recipes.find(recipe => recipe.id === selectedId);
  
    if (selectedRecipe) {
      setSelectedRecipeId(selectedId);
      setNewTitle(selectedRecipe.title);
      setNewDescription(selectedRecipe.description);
      setNewImage(selectedRecipe.image); // Populate the image URL
    } else {
      setSelectedRecipeId('');
      setNewTitle('');
      setNewDescription('');
      setNewImage('');
    }
  }
  

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Recipe List", 20, 20);

    let yOffset = 30;
    recipes.forEach((recipe, index) => {
      doc.setFontSize(14);
      doc.text(`Recipe ${index + 1}: ${recipe.title}`, 20, yOffset);
      yOffset += 10;
      doc.setFontSize(12);
      doc.text(`Description: ${recipe.description}`, 20, yOffset);
      yOffset += 10;
      doc.text(`Shared By: ${recipe.sharedBy}`, 20, yOffset);
      yOffset += 15;
    });

    doc.save("recipes.pdf");
  };

  const handleAddRecipe = async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    const newRecipe = {
      title: newTitle,
      description: newDescription,
      image: newImage,
      sharedBy: "MUHOZA GYSSAGARA Prince" // Replace with actual user name if needed
    };

    try {
      const response = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });

      if (response.ok) {
        fetchRecipes(); // Refresh the recipe list after adding a new recipe
        setNewTitle('');
        setNewDescription('');
        setNewImage('');
      } else {
        console.error('Failed to add recipe:', response);
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const handleUpdateRecipe = async (event) => {
    event.preventDefault(); // Prevent the form from submitting normally
    const updatedRecipe = {
      title: newTitle,
      description: newDescription,
      image: newImage,
    };

    try {
      const response = await fetch(`http://localhost:3000/recipes/${selectedRecipeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedRecipe)
      });

      if (response.ok) {
        fetchRecipes(); // Refresh the recipe list after updating
        setSelectedRecipeId('');
        setNewTitle('');
        setNewDescription('');
        setNewImage('');
      } else {
        console.error('Failed to update recipe:', response);
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
      <Link to="/" className="text-2xl font-bold text-gray-800">
  Go back Home
</Link>
        <button
          onClick={handleLogout}
          className="py-1 px-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 ${activeTab === 'addRecipe' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('addRecipe')}
        >
          Add Recipe
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'updateRecipe' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('updateRecipe')}
        >
          Update Recipe
        </button>
        <button
          className={`py-2 px-4 ${activeTab === 'downloadPDF' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => setActiveTab('downloadPDF')}
        >
          Download PDF
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'addRecipe' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add a New Recipe</h3>
            <form className="space-y-4" onSubmit={handleAddRecipe}>
              <div>
                <label htmlFor="recipeTitle" className="block text-sm font-medium text-gray-600">Recipe Title</label>
                <input
                  type="text"
                  id="recipeTitle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Enter recipe title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="recipeImage" className="block text-sm font-medium text-gray-600">Recipe Image URL</label>
                <input
                  type="text"
                  id="recipeImage"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Enter recipe image URL"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="recipeDescription" className="block text-sm font-medium text-gray-600">Recipe Description</label>
                <textarea
                  id="recipeDescription"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter recipe description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add Recipe
              </button>
            </form>
          </div>
        )}
        {activeTab === 'updateRecipe' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Update an Existing Recipe</h3>
            <select
              value={selectedRecipeId}
              onChange={handleRecipeSelect}
              className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a recipe to update</option>
              {recipes.map((recipe) => (
                <option key={recipe.id} value={recipe.id}>{recipe.title}</option>
              ))}
            </select>

            {selectedRecipeId && (
              <form className="space-y-4" onSubmit={handleUpdateRecipe}>
                <div>
                  <label htmlFor="updateRecipeTitle" className="block text-sm font-medium text-gray-600">Recipe Title</label>
                  <input
                    type="text"
                    id="updateRecipeTitle"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="updateRecipeImage" className="block text-sm font-medium text-gray-600">Recipe Image URL</label>
                  <input
                    type="text"
                    id="updateRecipeImage"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="updateRecipeDescription" className="block text-sm font-medium text-gray-600">Recipe Description</label>
                  <textarea
                    id="updateRecipeDescription"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Recipe
                </button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'downloadPDF' && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Download Recipes as PDF</h3>
            <button
              onClick={handleDownloadPDF}
              className="py-2 px-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
