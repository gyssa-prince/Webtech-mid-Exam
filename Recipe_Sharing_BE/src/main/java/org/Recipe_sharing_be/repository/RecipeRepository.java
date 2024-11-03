package org.Recipe_sharing_be.repository;

import org.Recipe_sharing_be.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
