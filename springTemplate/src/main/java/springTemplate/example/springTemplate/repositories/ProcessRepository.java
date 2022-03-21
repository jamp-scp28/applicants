package springTemplate.example.springTemplate.repositories;

import org.apache.tomcat.jni.Proc;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import springTemplate.example.springTemplate.models.Process;

import java.util.List;

@Repository
public interface ProcessRepository extends JpaRepository<Process, Long> {
    Process findProcessByStage(String stage);
    List<Process> findProcessByApplicantId(Long applicant);
}
