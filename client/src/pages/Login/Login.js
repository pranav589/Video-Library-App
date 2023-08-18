import React, { useEffect, useState } from "react";
import { Form, Title, Wrapper, Container, FormText } from "./styles";
import InputBox from "../../components/InputBox/InputBox";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../redux/features/auth/authSlice";
import { userLoginValidation } from "../../utils/validation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const userState = useSelector((state) => state?.auth);

  useEffect(() => {
    if (userState?.isError) {
      toast.error(userState?.message);
    }

    if (userState?.user) {
      navigate("/");
    }
    dispatch(reset());
  }, [userState, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = userLoginValidation(email, password);
    const payload = {
      email: email,
      password: CryptoJS.AES.encrypt(password, "Secret 123").toString(),
    };
    if (isValid) {
      toast.error(isValid);
    }
    if (!isValid) {
      dispatch(login(payload));
    }
  };

  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>Login</Title>
          <InputBox
            name={"email"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required={true}
          />
          <InputBox
            name={"password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required={true}
          />
          <CustomButton
            name={"Submit"}
            handleSubmit={handleLogin}
            loadingState={userState?.isLoading}
          />
          <FormText>
            Don't have a account? <Link to={"/register"}>Register</Link>
          </FormText>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
