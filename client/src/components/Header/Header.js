import React from "react";
import {
  Button,
  Container,
  Input,
  Logo,
  Search,
  Wrapper,
  IconWrapper,
} from "./styles";
import { Link } from "react-router-dom";
import { MdMenu, MdOutlineSearch } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";
import CustomButton from "../CustomButton/CustomButton";

function Header({ setIsSideBarOpened }) {
  return (
    <>
      <Container>
        <Wrapper>
          <IconWrapper onClick={() => setIsSideBarOpened(true)}>
            <MdMenu />
          </IconWrapper>

          <Logo>
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
          {/* {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
              {currentUser.name}
            </User>
          ) : ( */}
          {/* <Link to="signin" style={{ textDecoration: "none" }}> */}
          {/* <Button> */}
          {/* <AccountCircleOutlinedIcon /> */}
          <CustomButton />
          {/* SIGN IN
          </Button> */}
          {/* </Link> */}
          {/* )} */}
        </Wrapper>
      </Container>
      {/* {open && <Upload setOpen={setOpen} />} */}
    </>
  );
}

export default Header;
