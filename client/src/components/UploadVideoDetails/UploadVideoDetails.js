import React from "react";
import {
  Container,
  GeneratedImage,
  InfoValue,
  Label,
  LeftHeading,
  LeftLowerSection,
  LeftSection,
  RightSection,
  TagsSection,
  ThumbnailContainer,
  ThumbnailSubText,
  ThumbnailTitle,
  ThumbnailUpload,
  ThumbnailWrapper,
  ThumbnailsGenerated,
  UploadText,
  VideoInfoContainer,
  VideoMediaContainer,
} from "./styles";
import InputBox from "../InputBox/InputBox";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import { IoImagesOutline } from "react-icons/io5";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  generateVideoThumbnails,
  importFileandPreview,
} from "../../utils/generateThumbnail";
import InputTags from "../InputTags/InputTags";
function UploadVideoDetails({
  videoFile,
  setVideoFile,
  uploadedVideoUrl,
  videoUploadData,
  setVideoUploadData,
  setTags,
  tags,
}) {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumb, setVideoThumb] = useState({
    type: "",
    value: "",
  });
  const [thumbnails, setThumbnails] = useState([]);

  const handleSelectFile = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].type.split("/").includes("image")) {
        setFile(e.target.files[0]);
        setVideoThumb({
          type: "UPLOADED",
          value: e.target.files[0],
          preview: URL.createObjectURL(e.target.files[0]),
        });
        setVideoUploadData({
          ...videoUploadData,
          thumbnailFile: {
            type: "UPLOADED",
            value: e.target.files[0],
          },
        });
      }
    }
  };

  useEffect(() => {
    if (videoFile) {
      importFileandPreview(videoFile).then((res) => {
        setVideoUrl(res);
      });

      generateVideoThumbnails(videoFile, 2).then((thumbs) => {
        setThumbnails(thumbs);
      });
    }
  }, [videoFile]);

  const handleGeneratedThumbnailSelection = (item) => {
    setVideoUploadData({
      ...videoUploadData,
      thumbnailFile: {
        type: "GENERATED",
        value: item,
      },
    });
    setVideoThumb({ type: "GENERATED", value: item });
  };

  return (
    <Container>
      <LeftSection>
        <LeftHeading>Details</LeftHeading>
        <LeftLowerSection>
          <InputBox
            placeholder="Title (required)"
            required={true}
            value={videoUploadData.videoTitle}
            onChange={(e) =>
              setVideoUploadData({
                ...videoUploadData,
                videoTitle: e.target.value,
              })
            }
          />
          <CustomTextArea
            placeholder={"Description"}
            value={videoUploadData.videoDescription}
            onChange={(e) =>
              setVideoUploadData({
                ...videoUploadData,
                videoDescription: e.target.value,
              })
            }
          />
          <ThumbnailContainer>
            <ThumbnailTitle>Thumbnail</ThumbnailTitle>
            <ThumbnailSubText>
              Select or upload a picture that shows what's in your video. A good
              thumbnail stands out and draws viewers' attention.
            </ThumbnailSubText>
            <ThumbnailWrapper>
              <input
                type="file"
                id="uploadBtn"
                hidden
                ref={ref}
                onChange={handleSelectFile}
              />
              <ThumbnailUpload onClick={() => ref.current.click()}>
                {videoThumb?.value && videoThumb.type === "UPLOADED" ? (
                  <img
                    src={videoThumb.preview || videoThumb.value}
                    alt="Thumbnail"
                    style={{ width: "100%", height: "100%", padding: "5px" }}
                  />
                ) : (
                  <>
                    <IoImagesOutline color="#606060" />
                    <UploadText>Upload Thumbnail</UploadText>
                  </>
                )}
              </ThumbnailUpload>
              <ThumbnailsGenerated>
                {thumbnails.map((item) => {
                  return (
                    <GeneratedImage
                      style={{
                        border: item === videoThumb.value && "1px dashed red",
                      }}
                      src={item}
                      alt=""
                      onClick={() => handleGeneratedThumbnailSelection(item)}
                    />
                  );
                })}
              </ThumbnailsGenerated>
            </ThumbnailWrapper>
            <TagsSection>
              <ThumbnailTitle>Tags</ThumbnailTitle>
              <InputTags tags={tags} setTags={setTags} />
            </TagsSection>
          </ThumbnailContainer>
        </LeftLowerSection>
      </LeftSection>
      <RightSection>
        <VideoMediaContainer>
          <video
            poster={videoThumb.preview || videoThumb.value}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={uploadedVideoUrl}
            controls
          />
        </VideoMediaContainer>
        <VideoInfoContainer>
          <Label>Video Link</Label>
          <InfoValue>sdnsdkhsd</InfoValue>
          <Label>Filename</Label>
          <InfoValue>Some file name</InfoValue>
        </VideoInfoContainer>
      </RightSection>
    </Container>
  );
}

export default UploadVideoDetails;
