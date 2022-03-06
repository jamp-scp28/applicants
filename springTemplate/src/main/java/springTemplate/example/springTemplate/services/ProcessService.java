package springTemplate.example.springTemplate.services;

import lombok.RequiredArgsConstructor;
import org.apache.tomcat.jni.Proc;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import springTemplate.example.springTemplate.models.Process;
import springTemplate.example.springTemplate.models.User;
import springTemplate.example.springTemplate.repositories.ProcessRepository;

import java.util.List;

@Service @RequiredArgsConstructor @Transactional
public class ProcessService {
    private final ProcessRepository processRepository;
    private final UserService userService;

    public Process saveProcess(Process process){
        return processRepository.save(process);
    }
    public List<Process> getProcess(){
        return processRepository.findAll();
    }
}
