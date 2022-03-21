package springTemplate.example.springTemplate.services;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.Test;
import org.aspectj.util.*;
import springTemplate.example.springTemplate.models.Process;
import springTemplate.example.springTemplate.repositories.ProcessRepository;

import static org.junit.jupiter.api.Assertions.*;
@RequiredArgsConstructor
class ProcessServiceTest {
    private  ProcessRepository processRepository;
    private  UserService userService;

    private Process process = new Process();
    Calculator underTest = new Calculator();

    @Test
    void ItShouldAddNumber() {
       int na = 30;
       int nb = 50;
       int result = underTest.sum(na,nb);

        assertEquals(result,80);
    }


    class Calculator{
        int sum(int a, int b){
            return a + b;
        }
    }
}