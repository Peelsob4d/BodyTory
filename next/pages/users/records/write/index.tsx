import BodyNavigator from "@components/records/BodyNavigator";
import styled, { css } from "styled-components";
import BodyPartChecker from "@components/records/BodyPartChecker";
import { useEffect, useState } from "react";
import { bodyPartType } from "../../../../types/bodyParts";
import { useSetRecoilState } from "recoil";
import { currentBodyPosition } from "atoms/atoms";
import { motion } from "framer-motion";
import withGetServerSideProps from "@utils/client/withGetServerSideProps";
import { GetServerSidePropsContext, NextPage } from "next";
import { media } from "@styles/theme";
import doubleArrowIcon from "@src/assets/icons/doubleRight.png";

const WritePage: NextPage = () => {
  const [selectedBodyPart, setSelectedBodyPart] = useState<bodyPartType>(null);
  const setCurrentPosition = useSetRecoilState(currentBodyPosition);
  const [isSelect, setIsSelect] = useState(false);
  useEffect(() => {
    setCurrentPosition("front");
  }, []);
  useEffect(() => {
    if (selectedBodyPart) {
      setIsSelect(false);
    }
  }, [selectedBodyPart]);

  return (
    <RecordContainer>
      <BodyPartCheckerArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut" }}
      >
        <BodyPartChecker selectedBodyPart={selectedBodyPart} setIsSelect={setIsSelect} />
      </BodyPartCheckerArea>
      <BodyNavigatorArea
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, type: "tween", ease: "easeOut", delay: 0.4 }}
      >
        <BodyNavigator
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          isWritePage={true}
        />
      </BodyNavigatorArea>
      <MobBodyNavigatorArea isSelect={isSelect}>
        <BodyNavigator
          selectedBodyPart={selectedBodyPart}
          setSelectedBodyPart={setSelectedBodyPart}
          isWritePage={true}
        />
        <EnterNavigatorButton isSelect={isSelect} onClick={() => setIsSelect(prev => !prev)} >
          <i/>
        </EnterNavigatorButton>
      </MobBodyNavigatorArea>
    </RecordContainer>
  );
};
export default WritePage;
export const getServerSideProps = withGetServerSideProps(async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  };
});
const RecordContainer = styled.div`
  position: relative;
  padding: 50px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.custom(1280)} {
    padding: 50px 20px;
  }
`;

const BodyPartCheckerArea = styled(motion.div)`
  width: 55%;
  max-width: 1200px;

  ${media.custom(1280)} {
    width: 100%;
  }
`;

export const MobBodyNavigatorArea = styled.div<{ isSelect: boolean }>`
  display: none;
  width: 45%;
  max-width: 820px;
  position: fixed;
  left: 50%;
  bottom: 0;
  height: 90vh;
  width: 88%;
  border-bottom: none;
  border-radius: 30px 30px 0 0;
  transform: translate(-50%, 100%);
  transition: transform 0.8s;


  ${({ isSelect }) =>
    isSelect &&
    css`
      transform: translate(-50%, 0%);
    `}
  ${media.custom(1280)} {
    display: block;
  }
`;

const BodyNavigatorArea = styled(motion.div)`
  width: 45%;
  max-width: 820px;
  ${media.custom(1280)} {
    display: none;
  }
`;
export const EnterNavigatorButton = styled.button<{ isSelect: boolean }>`
  display: none;
  position: absolute;
  left: 50%;
  top: -40px;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  background-color: ${({ theme }) => theme.color.mintBtn};
  border-radius: 50%;
  z-index: 5;
  box-shadow: 0 -4px 10px 5px rgba(115, 240, 233, 0.3);
  justify-content:center;
  i{
    width:30px;
    height:30px;
    background: url(${doubleArrowIcon.src}) no-repeat 50% 10%;
    background-size:contain;
    transform: rotate(-90deg);
    margin-top: 5px;
  }
  ${media.custom(1280)} {
    display:flex;
    ${({ isSelect }) =>
      isSelect &&
      css`
        i{
          transform: rotate(-1350deg);
        }
      `}
  }
`;
