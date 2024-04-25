import React, { useContext, useState } from "react";
import { Container, Logo, Wrapper, IconWrapper, User, Avatar } from "./styles";
import { useNavigate } from "react-router-dom";
import { MdMenu, MdVideocam } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import CustomButton from "../CustomButton/CustomButton";

import useWindowSize from "../../hooks/useWindowSize";
import AutoCompleteSearch from "../AutoCompleteSearch/AutoCompleteSearch";
import { AuthContext } from "../../context/UserContext";
import { toast } from "react-toastify";

function Header({ setIsSideBarOpened }) {
  const windowSize = useWindowSize();
  const userState = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    userState.setUser(false);
    userState?.setUserData(null);
    toast.success("See you again!");
    navigate("/");
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
            <BsYoutube style={{ marginRight: "10px" }} />
            <div>MyTube</div>
          </Logo>
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
                  <Avatar
                    src={
                      userState?.user?.avatar ||
                      userState?.userData?.Data?.user?.avatar
                    }
                  />
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
