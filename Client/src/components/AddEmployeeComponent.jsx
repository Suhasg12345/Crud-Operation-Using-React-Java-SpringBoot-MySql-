import React, { useEffect, useState } from "react";
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from "../Services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddEmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  console.log("errors", errors);
  const saveorUpdateEmployee = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          if (response) {
            toast(`🦄 Wow ${firstName} ${lastName} Updated Successfully!`, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              // transition: Bounce,
            });
            setTimeout(() => {
              navigate("/");
            }, 1500);
          }
        });
      } else {
        addEmployee(employee)
          .then((response) => {
            if (response) {
              toast(`🦄 Wow ${firstName} ${lastName} Added Successfully!`, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
              });
              setTimeout(() => {
                navigate("/");
              }, 1500);
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name Required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name Required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email  Required";
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }
  function pageTitle() {
    if (id) {
      return (
        <h2 className="text-center text-info mt-3">Update Passenger : {id}</h2>
      );
    } else {
      return <h2 className="text-center text-info mt-3">Add Passenger</h2>;
    }
  }

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          console.log("response123", response);
          setFirstName(response?.data?.firstName);
          setLastName(response?.data?.lastName);
          setEmail(response?.data?.email);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="card col-md-5 offset-md-4 offset-md-4 border">
          <div className="card-body">
            {pageTitle()}
            <form>
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter First Name"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  placeholder="Enter Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email Id</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter Email Id"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <button
                className="btn btn-success mt-3"
                onClick={saveorUpdateEmployee}
              >
                Submit
              </button>

             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
