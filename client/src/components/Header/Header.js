import React from "react";
import {
  Button,
  Container,
  Input,
  Logo,
  Search,
  Wrapper,
  IconWrapper,
  User,
  Avatar,
} from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { MdMenu, MdOutlineSearch, MdVideocam } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import CustomButton from "../CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import useWindowSize from "../../hooks/useWindowSize";

function Header({ setIsSideBarOpened }) {
  const windowSize = useWindowSize();
  const userState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const handleLoginButton = () => {
    navigate("/login");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <IconWrapper onClick={() => setIsSideBarOpened(true)}>
            <MdMenu />
          </IconWrapper>

          <Logo onClick={() => navigate("/")}>
            {/* <Img src={""} /> */}
            <BsYoutube style={{ marginRight: "10px" }} />
            <div>MyTube</div>
          </Logo>

          <Search>
            <Input
              placeholder="Search"
              //   onChange={(e) => setQ(e.target.value)}
            />
            <MdOutlineSearch fontSize={"25px"} color="#ccc" />
          </Search>
          {userState?.user ? (
            <User>
              {windowSize?.width > 768 && (
                <>
                  <MdVideocam size={26} />
                  <Avatar src={userState?.user?.avatar} />
                </>
              )}
              <CustomButton name="Logout" handleSubmit={() => handleLogout()} />
            </User>
          ) : (
            <CustomButton name="Login" handleSubmit={handleLoginButton} />
          )}
        </Wrapper>
      </Container>
      {/* {open && <Upload setOpen={setOpen} />} */}
    </>
  );
}

export default Header;
