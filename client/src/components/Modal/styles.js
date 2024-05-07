import styled from "styled-components";
import { MdClose } from "react-icons/md";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

const ModalWrapper = styled.div`
  max-width: 100%;
  max-height: 600px;
  min-height: 150px;
  min-width: 300px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  overflow: auto;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  padding: 0;
  z-index: 10;
`;
export { Background, CloseModalButton, ModalWrapper };
