import React, { useState } from "react";
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
import AutoCompleteSearch from "../AutoCompleteSearch/AutoCompleteSearch";

function Header({ setIsSideBarOpened }) {
  const windowSize = useWindowSize();
  const userState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [display, setDisplay] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleLoginButton = () => {
    navigate("/login");
  };

  console.log({ searchQuery });

  return (
    <>
      <Container>
        <Wrapper>
          <IconWrapper onClick={() => setIsSideBarOpened(true)}>
            <MdMenu />
          </IconWrapper>

          <Logo onClick={() => navigate("/")}>
            <BsYoutube style={{ marginRight: "10px" }} />
            <div>MyTube</div>
          </Logo>

          {/* <Search>
            <Input
              placeholder="Search"
              //   onChange={(e) => setQ(e.target.value)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MdOutlineSearch fontSize={"25px"} color="#ccc" />
          </Search> */}
          <AutoCompleteSearch search={searchQuery} setSearch={setSearchQuery} />
          {userState?.user ? (
            <User>
              {windowSize?.width > 768 && (
                <>
                  <MdVideocam
                    size={26}
                    onClick={() => navigate("/uploadVideo")}
                    cursor={"pointer"}
                  />
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
    </>
  );
}

export default Header;
