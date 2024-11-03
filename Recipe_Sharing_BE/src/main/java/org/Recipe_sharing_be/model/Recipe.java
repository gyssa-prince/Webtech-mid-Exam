package org.Recipe_sharing_be.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String instructions;

    @ElementCollection
    private List<String> ingredients;

    // No-argument constructor
    public Recipe() {
    }

    // All-argument constructor
    public Recipe(Long id, String name, String description, Category category, String instructions, List<String> ingredients) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.instructions = instructions;
        this.ingredients = ingredients;
    }

    // Getter for id
    public Long getId() {
        return id;
    }

    // Setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }

    // Getter for description
    public String getDescription() {
        return description;
    }

    // Setter for description
    public void setDescription(String description) {
        this.description = description;
    }

    // Getter for category
    public Category getCategory() {
        return category;
    }

    // Setter for category
    public void setCategory(Category category) {
        this.category = category;
    }

    // Getter for instructions
    public String getInstructions() {
        return instructions;
    }

    // Setter for instructions
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    // Getter for ingredients
    public List<String> getIngredients() {
        return ingredients;
    }

    // Setter for ingredients
    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }

    // Optionally override toString() for better logging/debugging
    @Override
    public String toString() {
        return "Recipe{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", category=" + category +
                ", instructions='" + instructions + '\'' +
                ", ingredients=" + ingredients +
                '}';
    }
}
