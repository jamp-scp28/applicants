package springTemplate.example.springTemplate.services;

import springTemplate.example.springTemplate.models.Role;
import springTemplate.example.springTemplate.models.User;

import java.util.List;

public interface UserService {

    User saveUser (User user);
    Role saveRole (Role role);

    void addRole(String username, String roleName);
    User getUser(String username);
    List<User> getUsers();

}
