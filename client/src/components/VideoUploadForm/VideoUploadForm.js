import React, { useState } from "react";
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

function VideoUploadForm({ file, setFile }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Details" },
    { title: "Visibility" },
    { title: "Confirmation" },
  ];

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <UploadVideoDetails videoFile={file} setVideoFile={setFile} />;
      case 1:
        return <VideoVisibility videoFile={file} setVideoFile={setFile} />;
      case 2:
        return <p>Confirm</p>;
      default:
        return null;
    }
  }
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
          {activeStep !== 0 && activeStep !== steps.length - 1 && (
            <CustomButton
              name="BACK"
              handleSubmit={() => setActiveStep(activeStep - 1)}
            />
          )}
          {activeStep !== steps.length - 1 && (
            <CustomButton
              name="NEXT"
              handleSubmit={() => setActiveStep(activeStep + 1)}
            />
          )}
        </ButtonContainer>
      </LowerSection>
    </Container>
  );
}

export default VideoUploadForm;
