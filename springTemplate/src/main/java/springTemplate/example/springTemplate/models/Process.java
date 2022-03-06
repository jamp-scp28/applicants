package springTemplate.example.springTemplate.models;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@RequiredArgsConstructor
public class Process {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date;
    private String stage;
    private String responsible;
    private String status;
    private String comments;
    @ManyToOne
    @JoinColumn(name="applicant_id")
    private Applicant applicant;
}
