import { useState } from "react";
import { FaUser } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData, "formData");
  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an Account</p>
      </section>
      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password2"
              placeholder="Confirm your password"
              value={password2}
              onChange={onChange}
              className="form-control"
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </section>
    </>
  );
};

export default Register;
