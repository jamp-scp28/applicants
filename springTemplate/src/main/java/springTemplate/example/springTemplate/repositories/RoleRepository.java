package springTemplate.example.springTemplate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import springTemplate.example.springTemplate.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
