import React from "react";
import { Button, Form, Input, Title, Wrapper, Container } from "./styles";
import InputBox from "../../components/InputBox/InputBox";
import CustomButton from "../../components/CustomButton/CustomButton";

function Login() {
  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>Login</Title>
          <InputBox />
          <InputBox />
          <CustomButton />
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
