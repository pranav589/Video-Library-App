import styled from "styled-components";

const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  /* margin-bottom: 45px; */
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  background-color: #999;

  border-radius: 50%;
  :hover {
    border-radius: 0px;
    transition: border-radius 0.3s ease-out;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
  margin-left: 20px;
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-top: 0px;
  margin-bottom: 5px;
`;

const ChannelSubscribers = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 5px 10px 5px 0px;
`;

const ChannelSubVideoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.textSoft};
`;

export {
  Container,
  Image,
  Details,
  Texts,
  Title,
  ChannelSubscribers,
  Info,
  ChannelSubVideoContainer,
  Hr,
};
