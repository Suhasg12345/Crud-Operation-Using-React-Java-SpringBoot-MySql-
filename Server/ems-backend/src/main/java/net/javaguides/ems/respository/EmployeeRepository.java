package net.javaguides.ems.respository;

import net.javaguides.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository  extends JpaRepository <Employee,Long> {

}
