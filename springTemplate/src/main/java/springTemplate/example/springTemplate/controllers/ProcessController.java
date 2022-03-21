package springTemplate.example.springTemplate.controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.jni.Proc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springTemplate.example.springTemplate.exception.ResourceNotFoundException;
import springTemplate.example.springTemplate.models.Applicant;
import springTemplate.example.springTemplate.models.Process;
import springTemplate.example.springTemplate.models.User;
import springTemplate.example.springTemplate.repositories.ApplicantRepository;
import springTemplate.example.springTemplate.repositories.ProcessRepository;
import springTemplate.example.springTemplate.services.ApplicantService;
import springTemplate.example.springTemplate.services.ProcessService;
import springTemplate.example.springTemplate.services.UserService;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController @RequiredArgsConstructor @RequestMapping("/api")
public class    ProcessController {
    private final ProcessRepository processRepository;
    private final ProcessService processService;
    private final ApplicantRepository applicantRepository;

    @GetMapping("/process")
    public ResponseEntity<List<Process>> processes(){
        return ResponseEntity.ok().body(processService.getProcess());
    }

    @PostMapping("/applicants/{aplId}/process/add")
    public Process addProcess(@PathVariable (value = "aplId") Long aplId, @RequestBody Process process){
        Applicant applicant = applicantRepository.getById(aplId);
        log.info("decoded applicant id: {}", applicant);
        log.info("user data {}",process);
        log.info("user data {}",process.toString());

        return applicantRepository.findById(aplId).map(apl ->{
            process.setApplicant(apl);
            return processRepository.save(process);
        }).orElseThrow(()-> new ResourceNotFoundException("not found"));
    }

    @GetMapping("/applicants/{aplId}/process")
    public ResponseEntity<List<Process>> getApplicantProcess(@PathVariable (value = "aplId") Long aplId, Pageable pageable){
        log.info("processs {}",processRepository.findProcessByApplicantId(aplId));
       return ResponseEntity.ok().body(processRepository.findProcessByApplicantId(aplId));

    }

}
