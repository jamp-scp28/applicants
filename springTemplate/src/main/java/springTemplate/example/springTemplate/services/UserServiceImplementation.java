package springTemplate.example.springTemplate.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springTemplate.example.springTemplate.models.Role;
import springTemplate.example.springTemplate.models.User;
import springTemplate.example.springTemplate.repositories.RoleRepository;
import springTemplate.example.springTemplate.repositories.UserRepository;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserServiceImplementation implements UserService, UserDetailsService {
    private final UserRepository userrepo;
    private final RoleRepository rolerepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info(username);
        User user = userrepo.findByUsername(username);
        if (user==null){
            log.error("User not found");
            throw new UsernameNotFoundException("User not found");
        } else{
            log.info("User found{}",username);

        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {authorities.add(new SimpleGrantedAuthority(role.getName()));});
        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),authorities);
    }

    @Override
    public User saveUser(User user) {
        log.info(user.getPassword());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userrepo.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        return rolerepo.save(role);
    }

    @Override
    public void addRole(String username, String roleName) {
        User user = userrepo.findByUsername(username);
        Role role = rolerepo.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public boolean getRole(String roleName){
        if(rolerepo.findByName(roleName) != null){
            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public User getUser(String username) {
        return userrepo.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        return userrepo.findAll();
    }


}
