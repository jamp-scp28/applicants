package springTemplate.example.springTemplate.repositories;

import org.apache.tomcat.jni.Proc;
import org.springframework.data.jpa.repository.JpaRepository;
import springTemplate.example.springTemplate.models.Process;

public interface ProcessRepository extends JpaRepository<Process, Long> {
    Process findProcessByStage(String stage);
}
