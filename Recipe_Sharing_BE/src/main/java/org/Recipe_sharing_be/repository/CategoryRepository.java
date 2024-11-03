package org.Recipe_sharing_be.repository;

import org.Recipe_sharing_be.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
