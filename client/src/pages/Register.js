import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../components/shared/inputForm";
import Spinner from "../components/shared/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [values, setValues] = useState({
  //   email: "",
  //   name: "",
  //   lastName: "",
  //   password: "",
  // });
  // //handle input
  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setValues({
  //     ...values,
  //     [e.target.name]: value,
  //   });
  // };

  // redux state
  const { Loading } = useSelector((state) => state.alerts);
  //hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastName || !email || !password) {
        return toast.error("Please Provide all fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastName,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("registered successfully");
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid details Please try Again");
      //console.log(error);
    }
  };
  return (
    <>
      {Loading ? (
        <Spinner />
      ) : (
        <div className="form-container ">
          <form className="card p-2" onSubmit={handleSubmit}>
            <img
              src="/assets/images/logo.png"
              alt="logo"
              height={150}
              width={400}
            />
            <InputForm
              htmlFor="name"
              labelText={"Name"}
              type={"text"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name="name"
            />
            <InputForm
              htmlFor="lastName"
              labelText={"lastName"}
              type={"text"}
              value={lastName}
              handleChange={(e) => setlastName(e.target.value)}
              name="lastName"
            />
            <InputForm
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            <InputForm
              htmlFor="password"
              labelText={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
              name="Password"
            />

            <div className="d-flex justify-content-between">
              <p>
                Already registerd <Link to="/login">Login</Link>
              </p>
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
