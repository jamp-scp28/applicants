package springTemplate.example.springTemplate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import springTemplate.example.springTemplate.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
