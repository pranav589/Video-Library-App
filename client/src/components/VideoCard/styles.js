import styled from "styled-components";

const Container = styled.div`
  width: ${(props) =>
    props.type === "subscriptions-2"
      ? "fit-content"
      : props?.type === "sm"
      ? ""
      : "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) =>
    (props.type === "sm" || props.type === "subscriptions-2") && "flex"};
  gap: 10px;
  margin-right: 1rem;

  @media (max-width: 768px) {
    margin-right: 0px;
  }
`;

const Image = styled.img`
  width: ${(props) =>
    props.type === "sm" || props.type === "subscriptions-2" ? "300px" : "100%"};
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: ${(props) => (props.type !== "subscriptions-2" ? "1" : "")};
  border-radius: ${(props) => (props.type === "sm" ? "0px" : "15px")};
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
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-top: 0px;
  margin-bottom: 5px;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 5px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

export {
  Container,
  Image,
  Details,
  ChannelImage,
  Texts,
  Title,
  ChannelName,
  Info,
};
