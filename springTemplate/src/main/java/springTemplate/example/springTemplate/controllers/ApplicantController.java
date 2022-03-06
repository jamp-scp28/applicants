package springTemplate.example.springTemplate.controllers;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springTemplate.example.springTemplate.models.Applicant;
import springTemplate.example.springTemplate.repositories.ApplicantRepository;
import springTemplate.example.springTemplate.services.ApplicantService;

import java.util.List;

@RestController @RequiredArgsConstructor @RequestMapping("/api")
public class ApplicantController {
    private final ApplicantService applicantService;
    private final ApplicantRepository applicantRepository;

    @GetMapping("/applicants")
    public ResponseEntity<List<Applicant>> applicants(){
        return ResponseEntity.ok().body(applicantRepository.findAll());
    }

    @PostMapping("/applicant/add")
    public ResponseEntity<Applicant> addApplicant(@RequestBody Applicant applicant){
        return ResponseEntity.ok().body(applicantService.saveApplicant(applicant));
    }
}