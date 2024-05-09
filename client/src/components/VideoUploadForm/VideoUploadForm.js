import React, { useContext, useState } from "react";
import {
  ButtonContainer,
  Container,
  HeaderSection,
  Hr,
  LowerSection,
  Title,
} from "./styles";
import Stepper from "react-stepper-horizontal";
import UploadVideoDetails from "../UploadVideoDetails/UploadVideoDetails";
import CustomButton from "../CustomButton/CustomButton";
import VideoVisibility from "../VideoVisibility/VideoVisibility";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import storage from "../../firebase";
import { AuthContext } from "../../context/UserContext";
import { apiCall } from "../../utils/apiCall";
import { toast } from "react-toastify";

function VideoUploadForm({
  file,
  setFile,
  uploadedVideoUrl,
  selectedVideo,
  setShowModal,
}) {
  const token = localStorage.getItem("token");
  const userState = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [videoUploadData, setVideoUploadData] = useState({
    videoTitle: "",
    videoDescription: "",
    status: "",
    thumbnailFile: null,
  });

  const [tags, setTags] = useState([]);

  const steps = [{ title: "Details" }, { title: "Visibility" }];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <UploadVideoDetails
            videoFile={file}
            setVideoFile={setFile}
            uploadedVideoUrl={uploadedVideoUrl}
            videoUploadData={videoUploadData}
            setVideoUploadData={setVideoUploadData}
            tags={tags}
            setTags={setTags}
          />
        );
      case 1:
        return (
          <VideoVisibility
            videoFile={file}
            setVideoFile={setFile}
            uploadedVideoUrl={uploadedVideoUrl}
            videoUploadData={videoUploadData}
            setVideoUploadData={setVideoUploadData}
          />
        );
      default:
        return null;
    }
  }

  const base64ImageUpload = async (fileName, storeRef) => {
    const upload = await uploadString(
      storeRef,
      videoUploadData.thumbnailFile.value,
      "data_url"
    );
    const getDownload = await getDownloadURL(storeRef);
    if (getDownload) {
      handleVideoUpload(getDownload);
    }
  };

  const normalImageUpload = (fileName, storeRef) => {
    const uploadTask = uploadBytesResumable(
      storeRef,
      videoUploadData.thumbnailFile.value
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
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
        console.log({ error });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          handleVideoUpload(downloadURL);
        });
      }
    );
  };

  const imageUpload = async () => {
    setIsLoading(true);
    const fileName =
      new Date().getTime() + videoUploadData.thumbnailFile.value.name;
    const storageRef = ref(
      storage,
      `/thumbnails/${userState?.userData?.Data?.user?._id}/${fileName}`
    );

    videoUploadData?.thumbnailFile?.type === "GENERATED"
      ? base64ImageUpload(fileName, storageRef)
      : normalImageUpload(fileName, storageRef);
  };

  const handleVideoUpload = async (thumbnail) => {
    const payload = {
      title: videoUploadData.videoTitle,
      description: videoUploadData.videoDescription,
      thumbnail: thumbnail,
      tags: tags,
      status: videoUploadData.status,
    };
    try {
      const res = await apiCall(
        "PUT",
        `video/editVideo/${selectedVideo?._id}`,
        token,
        payload
      );
      if (res?.data?.status === "success") {
        toast.success("Video Upload Success!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
    } finally {
      setShowModal(false);
    }
  };

  const nextButtonDisableCondition = () => {
    if (activeStep === 0) {
      if (
        !videoUploadData.videoTitle ||
        !videoUploadData.videoDescription ||
        !videoUploadData.thumbnailFile.value ||
        tags.length === 0
      ) {
        return true;
      }
    } else if (activeStep === 1) {
      if (!videoUploadData.status) {
        return true;
      }
    }
    return false;
  };

  return (
    <Container>
      <HeaderSection>
        <Title>Upload Video</Title>
      </HeaderSection>
      <Hr />
      <LowerSection>
        <Stepper steps={steps} activeStep={activeStep} />
        {getSectionComponent()}
        <ButtonContainer>
          {activeStep !== 0 && activeStep !== steps.length && (
            <CustomButton
              name="BACK"
              handleSubmit={() => setActiveStep(activeStep - 1)}
            />
          )}

          <CustomButton
            disabled={nextButtonDisableCondition()}
            name={activeStep === steps.length - 1 ? "SAVE" : "NEXT"}
            handleSubmit={() =>
              activeStep === steps.length - 1
                ? imageUpload()
                : setActiveStep(activeStep + 1)
            }
          />
        </ButtonContainer>
      </LowerSection>
    </Container>
  );
}

export default VideoUploadForm;
