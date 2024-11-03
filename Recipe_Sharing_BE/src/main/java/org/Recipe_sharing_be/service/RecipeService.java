package org.Recipe_sharing_be.service;

import org.Recipe_sharing_be.model.Recipe;
import org.Recipe_sharing_be.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe addRecipe(Recipe recipe) {
        return recipeRepository.save(recipe);
    }

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return recipeRepository.findById(id).orElse(null);
    }

    public Recipe updateRecipe(Long id, Recipe recipeDetails) {
        Optional<Recipe> recipeOptional = recipeRepository.findById(id);
        if (recipeOptional.isPresent()) {
            Recipe recipe = recipeOptional.get();
            recipe.setName(recipeDetails.getName());
            recipe.setDescription(recipeDetails.getDescription());
            recipe.setCategory(recipeDetails.getCategory());
            recipe.setInstructions(recipeDetails.getInstructions());
            recipe.setIngredients(recipeDetails.getIngredients());
            return recipeRepository.save(recipe);
        }
        return null;
    }

    public void deleteRecipe(Long id) {
        recipeRepository.deleteById(id);
    }
}
