import styled from "styled-components";

const InputTag = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  flex-wrap: wrap;
  min-height: 48px;
  width: 100%;

  /* border: 1px solid rgb(214, 216, 218); */
  border-radius: 6px;

  @media screen and (max-width: 567px) {
    width: calc(100vw - 32px);
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  margin: 8px 0px 8px 0px;
  border-radius: 6px;
  border: 1px solid rgba(245, 245, 245, 0.7);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Tag = styled.div`
  width: auto;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 0 8px;
  font-size: 14px;
  list-style: none;
  border-radius: 6px;
  /* margin: 0 8px 8px 0; */
  background: #f03d4e;
`;

const TagTitle = styled.div`
  margin-top: 3px;
`;

const CloseIcon = styled.div`
  display: block;
  width: 16px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  font-size: 14px;
  margin-left: 8px;
  color: #f03d4e;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
`;

export { InputTag, Tags, Tag, TagTitle, CloseIcon };
