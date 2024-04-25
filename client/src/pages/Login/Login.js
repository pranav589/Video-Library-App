import React, { useContext, useEffect, useState } from "react";
import { Form, Title, Wrapper, Container, FormText } from "./styles";
import InputBox from "../../components/InputBox/InputBox";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../../redux/features/auth/authSlice";
import { userLoginValidation } from "../../utils/validation";
import { apiCall } from "../../utils/apiCall";
import { AuthContext } from "../../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useContext(AuthContext);

  // Redux state
  // const userState = useSelector((state) => state?.auth);

  useEffect(() => {
    if (userState?.userData?.Data?.user) {
      navigate("/");
    }
    // dispatch(reset());
  }, [userState, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const isInValid = userLoginValidation(email, password);
    const payload = {
      email: email,
      password: CryptoJS.AES.encrypt(password, "Secret 123").toString(),
    };
    if (isInValid) {
      toast.error(isInValid);
    }
    if (!isInValid) {
      setIsLoading(true);
      try {
        const res = await apiCall("POST", "auth/login", "", payload);
        if (res?.data?.status === "success") {
          localStorage.setItem("token", res?.data?.Data?.token);
          toast.success("Login Success!");
          userState.setUser(true);
          userState.setUserData(res?.data?.Data?.user);
          setIsLoading(false);
          navigate("/");
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
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
            loadingState={isLoading}
            disabled={!email || !password}
            type={"small"}
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
