import React, { useEffect, useState } from "react";
import {
  Container,
  Hr,
  IconWrapper,
  Img,
  Item,
  ItemContainer,
  Logo,
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
  MdPlaylistAdd,
} from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { RiVideoLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";

function Sidebar({
  isSideBarOpened,
  setIsSideBarOpened,
  darkMode,
  setDarkMode,
}) {
  const token = localStorage.getItem("token");
  const userState = useSelector((state) => state?.auth);
  const [playListsData, setPlayListsData] = useState([]);

  const firstSet = [
    {
      icon: <AiOutlineHome />,
      name: "Home",
      link: "/",
    },
    {
      icon: <MdOutlineSubscriptions />,
      name: "Subscriptions",
      link: `/subscriptions/${userState?.user?._id}?flow=1`,
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
      link: "/myVideos",
    },
    {
      icon: <MdOutlineWatchLater />,
      name: "Watch Later",
      link: "/watchLater",
    },
    // {
    //   icon: <MdPlaylistAdd />,
    //   name: "Play Lists",
    //   link: "/playlists",
    // },
  ];
  const thirdSet = [
    {
      icon: <MdOutlineDarkMode />,
      name: "Switch Theme",
    },
  ];

  useEffect(() => {
    if (token) {
      const fetchPlayLists = async () => {
        try {
          const res = await apiCall("GET", "playList", token);
          if (res?.data?.status === "success") {
            setPlayListsData(res?.data?.Data);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
        }
      };
      fetchPlayLists();
    }
  }, [token]);

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
        {playListsData?.map((playList) => (
          <Link
            to={`/playList/${playList?._id}?name=${playList.name}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ItemContainer>
              <Item>
                <MdPlaylistAdd />
              </Item>
              <Item>{playList?.name}</Item>
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
      </Wrapper>
    </Container>
  );
}

export default Sidebar;
