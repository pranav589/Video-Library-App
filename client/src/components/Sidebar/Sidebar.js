import React, { useState } from "react";
import {
  Button,
  Container,
  Hr,
  IconWrapper,
  Img,
  Item,
  ItemContainer,
  Login,
  Logo,
  Title,
  Wrapper,
} from "./styles";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineCloseCircle } from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineHistory,
  MdOutlineWatchLater,
  MdOutlineDarkMode,
  MdOutlineAccountCircle,
  MdOutlineLibraryMusic,
  MdOutlineSportsBaseball,
  MdOutlineSportsEsports,
  MdOutlineMovieFilter,
  MdPlaylistAdd,
} from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { RiVideoLine } from "react-icons/ri";

function Sidebar({
  isSideBarOpened,
  setIsSideBarOpened,
  darkMode,
  setDarkMode,
}) {
  const firstSet = [
    {
      icon: <AiOutlineHome />,
      name: "Home",
      link: "/",
    },
    {
      icon: <MdOutlineExplore />,
      name: "Explore",
      link: "/explore",
    },
    {
      icon: <SiYoutubemusic />,
      name: "Shorts",
      link: "/shorts",
    },
    {
      icon: <MdOutlineSubscriptions />,
      name: "Subscriptions",
      link: "/subscriptions",
    },
  ];

  const secondSet = [
    {
      icon: <MdOutlineVideoLibrary />,
      name: "Library",
      link: "/library",
    },
    {
      icon: <MdOutlineHistory />,
      name: "History",
      link: "/history",
    },
    {
      icon: <RiVideoLine />,
      name: "Your Videos",
      link: "/yourVideos",
    },
    {
      icon: <MdOutlineWatchLater />,
      name: "Watch Later",
      link: "/watchLater",
    },
    {
      icon: <MdPlaylistAdd />,
      name: "Play Lists",
      link: "/playlists",
    },
  ];
  const thirdSet = [
    {
      icon: <MdOutlineDarkMode />,
      name: "Switch Theme",
    },
  ];

  return (
    <Container isOpen={isSideBarOpened}>
      <Wrapper>
        <IconWrapper onClick={() => setIsSideBarOpened(false)}>
          <AiOutlineCloseCircle fontSize={"30px"} />
        </IconWrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={""} />
            MyTube
          </Logo>
        </Link>
        {firstSet.map((item) => (
          <Link
            to={item.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ItemContainer>
              <Item>{item.icon}</Item>
              <Item>{item.name}</Item>
            </ItemContainer>
          </Link>
        ))}
        <Hr />
        {secondSet.map((item) => (
          <Link
            to={item.link}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ItemContainer>
              <Item>{item.icon}</Item>
              <Item>{item.name}</Item>
            </ItemContainer>
          </Link>
        ))}
        <Hr />
        {thirdSet.map((item) => (
          <ItemContainer onClick={() => setDarkMode(!darkMode)}>
            <Item>{item.icon}</Item>
            <Item>{item.name}</Item>
          </ItemContainer>
        ))}
        {/* <Item>
          <AiOutlineHome />
          Home
        </Item>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <MdOutlineExplore />
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <MdOutlineSubscriptions />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <MdOutlineVideoLibrary />
          Library
        </Item>
        <Item>
          <MdOutlineHistory />
          History
        </Item>
        <Hr /> */}
        {/* {!currentUser && */}
        {/* <>
          <Login>
            Sign in to like videos, comment, and subscribe.
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <MdOutlineAccountCircle />
                SIGN IN
              </Button>
            </Link>
          </Login>
          <Hr />
        </> */}
        {/* } */}
        {/* <Title>BEST OF LAMATUBE</Title>
        <Item>
          <MdOutlineLibraryMusic />
          Music
        </Item>
        <Item>
          <MdOutlineSportsBaseball />
          Sports
        </Item>
        <Item>
          <MdOutlineSportsEsports />
          Gaming
        </Item>
        <Item>
          <MdOutlineMovieFilter />
          Movies
        </Item> */}
        {/* <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item> */}
        {/* <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item> */}
      </Wrapper>
    </Container>
  );
}

export default Sidebar;
