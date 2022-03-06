package springTemplate.example.springTemplate.services;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springTemplate.example.springTemplate.models.Applicant;
import springTemplate.example.springTemplate.repositories.ApplicantRepository;


@Service @RequiredArgsConstructor @Transactional
public class ApplicantService {
    private final ApplicantRepository applicantRepository;

    public Applicant saveApplicant(Applicant applicant){
        return applicantRepository.save(applicant);
    }

}
