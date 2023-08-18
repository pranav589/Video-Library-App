import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import VideoList from "../../components/VideoList/VideoList";
import { useSelector } from "react-redux";
import { Box, ManageText, Title, ViewContainer } from "./styles";
import { BsGridFill, BsListUl, BsGrid } from "react-icons/bs";
import { FaList } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

function Subscriptions() {
  const location = useLocation();

  const navigate = useNavigate();
  console.log({ navigate });
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userState = useSelector((state) => state?.auth);
  const token = localStorage.getItem("token");
  const [viewType, setViewType] = useState("1");

  useEffect(() => {
    setViewType(location?.search?.split("=")?.[1]);
  }, [location.search]);
  console.log({ viewType });

  useEffect(() => {
    if (userState?.user?._id) {
      const fetchSubscribedVideos = async () => {
        try {
          setIsLoading(true);
          const res = await apiCall(
            "GET",
            `channel/subscriptions/${userState?.user?._id}`,
            token
          );
          if (res?.data?.status === "success") {
            setVideos(res?.data?.Data);
            setIsLoading(false);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsLoading(false);
        }
      };
      fetchSubscribedVideos();
    }
  }, [userState?.user?._id, token]);

  return (
    <>
      <Box>
        <Title> Subscriptions</Title>
        <ViewContainer>
          <ManageText
            onClick={() =>
              navigate({
                pathname: `/subscribedChannels`,
              })
            }
          >
            Manage
          </ManageText>
          {viewType === "1" ? (
            <BsGridFill
              size={20}
              style={{ marginRight: "25px", cursor: "pointer" }}
            />
          ) : (
            <BsGrid
              size={20}
              style={{ marginRight: "25px", cursor: "pointer" }}
              onClick={() =>
                navigate({
                  pathname: `/subscriptions/${userState?.user?._id}`,
                  search: "?flow=1",
                })
              }
            />
          )}
          {viewType === "2" ? (
            <FaList
              size={20}
              style={{ marginRight: "25px", cursor: "pointer" }}
            />
          ) : (
            <BsListUl
              size={20}
              style={{ marginRight: "25px", cursor: "pointer" }}
              onClick={() =>
                navigate({
                  pathname: `/subscriptions/${userState?.user?._id}`,
                  search: "?flow=2",
                })
              }
            />
          )}
        </ViewContainer>
      </Box>

      <VideoList
        videos={videos}
        type={`subscriptions-${viewType}`}
        loadingState={isLoading}
      />
    </>
  );
}

export default Subscriptions;
