package org.Recipe_sharing.repository;

import org.Recipe_sharing.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
