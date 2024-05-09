import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";
import { useSelector } from "react-redux";
import VideoList from "../../components/VideoList/VideoList";
import { Title } from "../Subscriptions/styles";
import { AuthContext } from "../../context/UserContext";
import Modal from "../../components/Modal/Modal";
import SelectVideoSection from "../../components/SelectVideoSection/SelectVideoSection";
import VideoUploadForm from "../../components/VideoUploadForm/VideoUploadForm";

function YourVideos() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [myVideos, setMyVideos] = useState([]);
  const [videoUploadStep, setVideoUploadStep] = useState(1);
  // const userState = useSelector((state) => state?.auth);
  const userState = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [file, setFile] = useState(null);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    if (userState?.userData?.Data?.user?._id) {
      const fetchMyVideos = async () => {
        try {
          setIsLoading(true);
          const res = await apiCall(
            "GET",
            `video/myVideos/${userState?.userData?.Data?.user?._id}`,
            token
          );
          if (res?.data?.status === "success") {
            setIsLoading(false);
            setMyVideos(res?.data?.Data);
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsLoading(false);
        }
      };
      fetchMyVideos();
    }
  }, [token, userState?.userData?.Data?.user?._id]);

  useEffect(() => {
    setIsUploadModalOpen(true);
  }, []);

  return (
    <>
      <Title>Your Videos</Title>
      <VideoList videos={myVideos} loadingState={isLoading} />
      {/* <Modal showModal={isUploadModalOpen} setShowModal={setIsUploadModalOpen}>
        {videoUploadStep === 1 && (
          <SelectVideoSection
            file={file}
            setFile={setFile}
            videoUploadStep={videoUploadStep}
            setVideoUploadStep={setVideoUploadStep}
            uploadedVideoUrl={uploadedVideoUrl}
            setUploadedVideoUrl={setUploadedVideoUrl}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
          />
        )}
        {videoUploadStep === 2 && (
          <VideoUploadForm
            file={file}
            setFile={setFile}
            uploadedVideoUrl={uploadedVideoUrl}
            selectedVideo={selectedVideo}
            setSelectedVideo={setSelectedVideo}
            setShowModal={setIsUploadModalOpen}
          />
        )}
      </Modal> */}
    </>
  );
}

export default YourVideos;
