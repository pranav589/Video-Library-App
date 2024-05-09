import React, { useContext, useRef, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import {
  Container,
  HeaderSection,
  Hr,
  LowerSection,
  Title,
  UploadIconContainer,
  UploadSubText,
  UploadText,
} from "./styles";
import { MdUpload } from "react-icons/md";
import storage from "../../firebase";
import { AuthContext } from "../../context/UserContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { apiCall } from "../../utils/apiCall";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

function SelectVideoSection({
  setFile,
  setVideoUploadStep,
  setUploadedVideoUrl,
  setSelectedVideo,
}) {
  const refs = useRef();
  const userState = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);

  const videoUpload = (videoFile) => {
    const fileName = new Date().getTime() + videoFile.name;
    const storageRef = ref(
      storage,
      `/videos/${userState?.userData?.Data?.user?._id}/${fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, videoFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log({ snapshot });
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadedVideoUrl(downloadURL);
          videoUploadCall(downloadURL, videoFile);
          setUploadedVideoUrl(downloadURL);
        });
      }
    );
  };

  const videoUploadCall = async (videoUrl, videoFile) => {
    const payload = {
      userId: userState?.userData?.Data?.user?._id,
      title: videoFile.name,
      description: "",
      thumbnail: "",
      videoURL: videoUrl,
      tags: [],
      status: "draft",
    };

    try {
      const res = await apiCall("POST", "video/uploadVideo", token, payload);
      if (res?.data?.status === "success") {
        setIsLoading(false);
        setSelectedVideo(res?.data?.Data);
        setVideoUploadStep(2);
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsLoading(false);
    }
  };

  const handleSelectFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setIsLoading(true);
      videoUpload(e.target.files[0]);
    }
  };

  return (
    <Container>
      <HeaderSection>
        <Title>Upload Video</Title>
      </HeaderSection>
      <Hr />
      <LowerSection>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <UploadIconContainer>
              <MdUpload color="#909090" size={70} />
            </UploadIconContainer>

            <UploadText>Select video file to upload</UploadText>
            <UploadSubText>
              Your videos will be private until you publish them.
            </UploadSubText>
            <input
              type="file"
              id="uploadBtn"
              hidden
              ref={refs}
              onChange={handleSelectFile}
            />

            <CustomButton
              name="SELECT FILES"
              handleSubmit={() => refs.current.click()}
            />
          </>
        )}
      </LowerSection>
    </Container>
  );
}

export default SelectVideoSection;
