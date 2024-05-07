import React, { useRef } from "react";
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

function SelectVideoSection({
  file,
  setFile,
  videoUploadStep,
  setVideoUploadStep,
}) {
  const ref = useRef();

  const handleSelectFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setVideoUploadStep(2);
    }
  };

  return (
    <Container>
      <HeaderSection>
        <Title>Upload Video</Title>
      </HeaderSection>
      <Hr />
      <LowerSection>
        <UploadIconContainer>
          <MdUpload color="#909090" size={70} />
        </UploadIconContainer>

        <UploadText>Drag and drop video files to upload</UploadText>
        <UploadSubText>
          Your videos will be private until you publish them.
        </UploadSubText>
        <input
          type="file"
          id="uploadBtn"
          hidden
          ref={ref}
          onChange={handleSelectFile}
        />

        <CustomButton
          name="SELECT FILES"
          handleSubmit={() => ref.current.click()}
        />
      </LowerSection>
    </Container>
  );
}

export default SelectVideoSection;
