package org.Recipe_sharing.repository;

import org.Recipe_sharing.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name); // To fetch roles by name if needed
}
