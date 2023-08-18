import React, { useEffect, useState } from "react";
import { Form, Title, Wrapper, Container, FormText } from "../Login/styles";
import InputBox from "../../components/InputBox/InputBox";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../../redux/features/auth/authSlice";
import { userRegisterValidation } from "../../utils/validation";

function Register() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [userData, setUserData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const userState = useSelector((state) => state?.auth);

  useEffect(() => {
    if (userState?.isError) {
      toast.error(userState?.message);
    }
    if (userState.isSuccess) {
      navigate("/login");
    }
    dispatch(reset());
  }, [userState, navigate, dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = userData;

    const payload = {
      email,
      name,
      confirmPassword: CryptoJS.AES.encrypt(
        confirmPassword,
        "Secret 123"
      ).toString(),
      password: CryptoJS.AES.encrypt(password, "Secret 123").toString(),
    };
    const isValid = userRegisterValidation(
      name,
      email,
      password,
      confirmPassword
    );
    if (!isValid) {
      dispatch(register(payload));
    }
    if (isValid) {
      toast.error(isValid);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>Register</Title>
          <InputBox
            name={"name"}
            type={"text"}
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Name"
            required={true}
          />
          <InputBox
            name={"email"}
            type={"email"}
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            placeholder="Email Address"
            required={true}
          />
          <InputBox
            name={"password"}
            type={"password"}
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            placeholder="Password"
            required={true}
          />
          <InputBox
            name={"confirmPassword"}
            type={"password"}
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            placeholder="Password"
            required={true}
          />
          <CustomButton
            name={"Register"}
            handleSubmit={handleRegister}
            loadingState={userState?.isLoading}
          />
          <FormText>
            Already have an account? <Link to={"/login"}>Login</Link>
          </FormText>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
