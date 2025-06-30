import React, { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../Services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import {ToastContainer, toast } from "react-toastify";
const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    listEmployees()
      .then((response) => {
        console.log("response", response);
        setEmployees(response?.data);
      })
      .catch((err) => console.log(err));
    //    setData(response)
    // console.log(response, "response");
  }, []);
  const addNewEmployee = () => {
    navigate("/addEmployee");
  };

  const updateEmployee = (id) => {
    navigate(`/edit-Employee/${id}`);
  };



  const deleteAEmployee=(id)=>{
    console.log("id11111111",id);
 deleteEmployee(id).then((response)=>{
    if(response){
        toast(`🦄 Wow Passenger Deleted Successfully!`, {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            // transition: Bounce,
          });
        //   setTimeout(()=>{
            listEmployees()
            .then((response) => {
              console.log("response", response);
              setEmployees(response?.data);
            })
            .catch((err) => console.log(err));
        //   },3500)
          
        }
      })
      .catch((err) => console.log(err));
    }
 

  return (
    <>
      <div className="container">
        <h2 className="text-center text-info mt-3">List Of Passengers</h2>
        <button className="my-2 btn btn-primary" onClick={addNewEmployee}>
          + Add Passengers
        </button>
        <table className="table table-striped table-dark table-bordered">
          <thead>
            <tr className="text-center">
              <th>Passenger Id</th>
              <th>Passenger First Name</th>
              <th>Passenger Last Name</th>
              <th>Passenger Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee.id} className="text-center">
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>

                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => updateEmployee(employee.id)}
                    >
                      Update
                    </button>
                 
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteAEmployee(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListEmployeeComponent;
