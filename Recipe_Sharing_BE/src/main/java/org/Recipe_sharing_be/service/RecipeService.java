package org.Recipe_sharing_be.service;

import org.Recipe_sharing_be.model.Recipe;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecipeService {
    private final List<Recipe> recipes = new ArrayList<>();

    public List<Recipe> getAllRecipes() {
        return recipes; // Returning all recipes
    }

    public Recipe getRecipeById(Long id) {
        return recipes.stream()
                .filter(recipe -> recipe.getId().equals(id))
                .findFirst()
                .orElse(null); // Returning a recipe by ID
    }

    public Recipe createRecipe(Recipe recipe) {
        recipes.add(recipe); // Adding a new recipe to the list
        return recipe;
    }

    public Recipe updateRecipe(Long id, Recipe updatedRecipe) {
        Recipe recipe = getRecipeById(id);
        if (recipe != null) {
            recipe.setTitle(updatedRecipe.getTitle());
            recipe.setDescription(updatedRecipe.getDescription());
            recipe.setPicture(updatedRecipe.getPicture());
            recipe.setSharedBy(updatedRecipe.getSharedBy());
        }
        return recipe; // Updating and returning the updated recipe
    }

    public void deleteRecipe(Long id) {
        recipes.removeIf(recipe -> recipe.getId().equals(id)); // Deleting a recipe by ID
    }
}
