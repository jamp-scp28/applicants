package springTemplate.example.springTemplate.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import springTemplate.example.springTemplate.models.Applicant;

public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
    Applicant findApplicantByName(String name);
}
