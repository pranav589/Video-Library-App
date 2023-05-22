import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0px;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 15px;
`;

const ReplyText = styled.div`
  font-size: 16px;
  margin-left: 15px;
  padding: 7px;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.soft};
    border-radius: 15px;
  }
`;

const CommentActionsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MoreReplies = styled.p`
  margin: 0px 0px 10px 0px;
  color: ${({ theme }) => theme.textSoft};
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export {
  Container,
  Avatar,
  Details,
  Name,
  Date,
  Text,
  ReplyText,
  CommentActionsContainer,
  Wrapper,
  MoreReplies,
  ButtonContainer,
};
