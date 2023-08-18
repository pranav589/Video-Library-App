import React, { useEffect, useState } from "react";
import {
  Container,
  UploadContainer,
  LowerContainer,
  SingleUploadWrapper,
} from "./styles";
import { useNavigate } from "react-router-dom";
import DropZoneComponent from "../../components/DropZoneComponent/DropZoneComponent";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";
import { useSelector } from "react-redux";
import InputBox from "../../components/InputBox/InputBox";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomTextArea from "../../components/CustomTextArea/CustomTextArea";
import Dropdown from "../../components/Dropdown/Dropdown";
import { toast } from "react-toastify";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { videoUploadValidation } from "../../utils/validation";
import { apiCall } from "../../utils/apiCall";
import InputTags from "../../components/InputTags/InputTags";

function VideoUpload() {
  const token = localStorage.getItem("token");
  const privacy = ["Private", "Public", "dynmic", "abc"];
  const category = ["All", "Latest", "Cricket", "Series", "Movies"];

  const userState = useSelector((state) => state.auth);
  const initialState = {
    imageUrl: "",
    videoUrl: "",
    imagePreview: "",
    videoPreview: "",
    imageFile: null,
    videoFile: null,
    title: "",
    description: "",
    privacy: "Private",
    category: "",
    imageUpload: false,
    videoUpload: false,
    imageUploadProgress: 0,
    videoUploadProgress: 0,
    error: false,
    loading: false,
  };
  const [state, setState] = useState(initialState);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onDropImage = (file) => {
    if (!file) {
      return toast.error("Please select file.");
    }

    if (file[0].type.split("/").includes("image")) {
      setState({
        ...state,
        imagePreview: URL.createObjectURL(file[0]),
        imageFile: file,
      });
    } else {
      toast.error("Please select image");
    }
  };

  const imageUpload = () => {
    const fileName = new Date().getTime() + state.imageFile[0].name;
    const storageRef = ref(
      storage,
      `/thumbnails/${userState.user._id}/${fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, state.imageFile[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log({ snapshot });
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setState({
          ...state,
          imageUploadProgress: progress.toFixed(2),
        });
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
          setState({ ...state, imageUrl: downloadURL, imageUpload: true });
        });
      }
    );
  };

  const onDropVideo = (file) => {
    if (!file) {
      return toast.error("Please select a file.");
    }
    if (file[0].type.split("/").includes("video")) {
      setState({
        ...state,
        videoPreview: URL.createObjectURL(file[0]),
        videoFile: file,
      });
    } else {
      toast.error("Please select a video");
    }
  };
  const videoUpload = () => {
    const fileName = new Date().getTime() + state.videoFile[0].name;
    const storageRef = ref(
      storage,
      `/videos/${userState.user._id}/${fileName}`
    );
    const uploadTask = uploadBytesResumable(storageRef, state.videoFile[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log({ snapshot });
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setState({
          ...state,
          videoUploadProgress: progress.toFixed(2),
        });
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
          setState({ ...state, videoUrl: downloadURL, videoUpload: true });
        });
      }
    );
  };

  const removePreview = (type) => {
    if (type === "Thumbnail") {
      setState({ ...state, imagePreview: "" });
    } else {
      setState({ ...state, videoPreview: "" });
    }
  };

  const handlePostUpload = async () => {
    const {
      imagePreview,
      videoPreview,
      title,
      description,
      privacy,
      category,
    } = state;
    const isValid = videoUploadValidation(
      imagePreview,
      videoPreview,
      title,
      description,
      privacy,
      category
    );
    if (isValid) {
      return toast.error(isValid);
    }
    setIsLoading(true);
    try {
      imageUpload();
      videoUpload();
    } catch (error) {
      toast.error(error.toString());
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const videoUploadCall = async () => {
      const payload = {
        userId: userState?.user?._id,
        title: state.title,
        description: state.description,
        privacy: state.privacy,
        category: state.category,
        thumbnail: state.imageUrl,
        videoURL: state.videoUrl,
        tags: tags,
      };
      console.log({ state: state.imageUpload, state1: state?.videoUpload });
      if (state.imageUpload && state.videoUpload) {
        console.log({ state2: state.imageUpload, state3: state?.videoUpload });
        try {
          const res = await apiCall(
            "POST",
            "video/uploadVideo",
            token,
            payload
          );
          if (res?.data?.status === "success") {
            setIsLoading(false);
            toast.success("Video Uploaded!");
            setState(initialState);
            navigate("/");
          }
        } catch (error) {
          toast.error(error?.response?.data?.err);
          setIsLoading(false);
        }
      }
    };
    videoUploadCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.imageUpload, state.videoUpload]);

  return (
    <Container>
      <UploadContainer>
        <SingleUploadWrapper>
          <DropZoneComponent
            text={"Drop your image files here"}
            type={"Thumbnail"}
            onDrop={onDropImage}
            accept={"image/*"}
            preview={state.imagePreview}
            removePreview={removePreview}
          />
          <ProgressBar
            color={"#ff7979"}
            width={"240px"}
            value={state.imageUploadProgress}
            max={100}
          />
        </SingleUploadWrapper>
        <SingleUploadWrapper>
          <DropZoneComponent
            text={"Drop your video files here"}
            type={"Video"}
            onDrop={onDropVideo}
            accept={"video/*"}
            preview={state.videoPreview}
            removePreview={removePreview}
          />
          <ProgressBar
            color={"#ff7979"}
            width={"240px"}
            value={state.videoUploadProgress}
            max={100}
          />
        </SingleUploadWrapper>
      </UploadContainer>
      <LowerContainer>
        <InputBox
          name={"title"}
          type={"text"}
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.target.value })}
          placeholder="Enter Title"
          required={true}
        />
        <CustomTextArea
          name={"description"}
          type={"text"}
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
          placeholder="Enter Description"
          required={true}
        />
        <InputTags tags={tags} setTags={setTags} />
        <Dropdown
          label={"Privacy"}
          values={privacy}
          onChange={(val) => setState({ ...state, privacy: val })}
        />
        <Dropdown
          label={"Select Category"}
          values={category}
          onChange={(val) => setState({ ...state, category: val })}
        />
        <CustomButton name={"POST"} handleSubmit={handlePostUpload} />
      </LowerContainer>
    </Container>
  );
}

export default VideoUpload;
