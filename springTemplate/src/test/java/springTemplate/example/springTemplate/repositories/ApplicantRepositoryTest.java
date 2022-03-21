package springTemplate.example.springTemplate.repositories;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import springTemplate.example.springTemplate.models.Applicant;
import springTemplate.example.springTemplate.models.User;
import static org.junit.jupiter.api.Assertions.*;
import java.util.Date;
import static org.assertj.core.api.Assertions.*;

class ApplicantRepositoryTest {
    @Autowired
    private ApplicantRepository underTest;
    @Autowired
    private UserRepository userRepository;
    @Test
    void itShouldFindApplicantByName() {
        //given
        Long id = new Long(4);
        Date date = new Date();
        User currentUser = userRepository.findByUsername("jorgem");
        Applicant applicant = new Applicant(
                id,
                date,
                "jorge",
                123,
                102,
                "jam@gmail.com",
                "bog",
                "na",
                "active",
                currentUser
        );
        underTest.save(applicant);
        //when
        Applicant exists = underTest.findApplicantByName("jorge");
        //then

    }

}