package org.Recipe_sharing;

import org.Recipe_sharing.model.UserProfile;
import org.Recipe_sharing.model.Recipe;
import org.Recipe_sharing.model.Category;
import org.Recipe_sharing.repository.UserProfileRepository;
import org.Recipe_sharing.repository.RecipeRepository;
import org.Recipe_sharing.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@SpringBootApplication
public class Main implements CommandLineRunner {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) {
        // Sample UserProfile
        UserProfile userProfile = new UserProfile();
        userProfile.setName("John Doe");
        userProfile.setBio("Passionate chef and food lover");
        userProfile.setAvatarUrl("https://example.com/avatar/johndoe.jpg");
        userProfileRepository.save(userProfile);

        // Sample Category
        Category category = new Category();
        category.setName("Dessert");
        categoryRepository.save(category);

        // Sample Recipe
        Recipe recipe = new Recipe();
        recipe.setName("Chocolate Cake");
        recipe.setDescription("A rich and moist chocolate cake");
        recipe.setCategory(category);
        recipe.setInstructions("Mix ingredients, bake for 30 minutes at 350°F.");
        recipe.setIngredients(Arrays.asList("Flour", "Cocoa powder", "Sugar", "Eggs", "Butter"));
        recipeRepository.save(recipe);

        System.out.println("Sample data initialized.");
    }
}
