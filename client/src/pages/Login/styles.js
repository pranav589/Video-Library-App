import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90.5vh;

  @media (max-width: 768px) {
    height: 92vh;
  }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 40%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    box-shadow: none;
  }
`;

const Form = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const FormText = styled.div`
  margin-top: 5px;
  color: ${({ theme }) => theme.text};
  & a {
    color: ${({ theme }) => theme.text};
  }
`;

const Title = styled.h2`
  font-weight: normal;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export { Wrapper, Form, Title, Container, FormText };
