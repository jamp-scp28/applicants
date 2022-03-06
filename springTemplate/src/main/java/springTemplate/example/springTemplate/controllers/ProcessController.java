package springTemplate.example.springTemplate.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springTemplate.example.springTemplate.models.Applicant;
import springTemplate.example.springTemplate.models.Process;
import springTemplate.example.springTemplate.models.User;
import springTemplate.example.springTemplate.repositories.ApplicantRepository;
import springTemplate.example.springTemplate.repositories.ProcessRepository;
import springTemplate.example.springTemplate.services.ApplicantService;
import springTemplate.example.springTemplate.services.ProcessService;
import springTemplate.example.springTemplate.services.UserService;

import java.util.List;
@Slf4j
@RestController @RequiredArgsConstructor @RequestMapping("/api")
public class ProcessController {
    private final ProcessRepository processRepository;
    private final ProcessService processService;
    private final ApplicantRepository applicantRepository;

    @GetMapping("/process")
    public ResponseEntity<List<Process>> processes(){
        return ResponseEntity.ok().body(processService.getProcess());
    }

    @PostMapping("/process/add")
    public ResponseEntity<String> addProcess(@RequestBody Object process){
        log.info("user data {}",process.toString());
        log.info("user data {}",process);

        //Applicant applicant = applicantRepository.getById(process);

        return ResponseEntity.ok().body("new");
    }

}
