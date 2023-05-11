import styled from "styled-components";

const Container = styled.div`
  /* flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;

  top: 0; */
  height: 100%;
  background: ${({ theme }) => theme.bgLighter};
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  z-index: 200;
  box-shadow: ${({ isOpen }) =>
    isOpen ? "1px 0px 7px rgba(0, 0, 0, 0.5)" : "none"};
  transform: ${({ isOpen }) =>
    !isOpen ? `translateX(-101%)` : "translateX()"};
  transition: transform 0.3s ease-out;
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  padding: 18px 26px;
  position: relative;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 25px;
  font-size: 24px;
`;

const Img = styled.img`
  height: 25px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 4px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  /* gap: 20px; */
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 2%;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

export {
  Container,
  Wrapper,
  Logo,
  Img,
  Item,
  Hr,
  Button,
  Title,
  Login,
  ItemContainer,
  IconWrapper,
};
