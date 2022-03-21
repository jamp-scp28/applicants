package springTemplate.example.springTemplate.models;

import lombok.*;

import javax.persistence.*;
import java.util.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date date;
    private String name;
    private Integer nationalId;
    private Integer phone;
    private String email;
    private String city;
    private String status;
    private String cvLink;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}


