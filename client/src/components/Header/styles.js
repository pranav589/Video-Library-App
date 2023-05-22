import styled from "styled-components";

const Container = styled.div`
  z-index: 100;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 65px;
  border-bottom: 1px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: 1%;
  font-size: 28px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Logo = styled.div`
  cursor: pointer;
  position: absolute;
  left: 5%;
  /* margin-bottom: 25px; */
  font-size: 24px;
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    div {
      display: none;
    }
    left: 12%;
    font-size: 30px;
  }
`;

const Search = styled.div`
  width: 40%;
  height: 30px;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 30px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: 16px;
    padding-left: 10px;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

export { Container, Wrapper, IconWrapper, Logo, Search, Input, User, Avatar };
