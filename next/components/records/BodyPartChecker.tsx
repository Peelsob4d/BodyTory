import ToryPurpleAnim from "@components/lotties/ToryPurpleAnim";
import { RoundedDefaultButton } from "@components/layout/buttons/DefaultButtons";
import { BTN_VARIANTS } from "@styles/ButtonStyled";
import { Box, BtnBox, FlexContainer, ToryText } from "@styles/Common";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import styled from "styled-components";
import { bodyPartType } from "types/bodyParts";
import { KoreanPosition } from "types/write";
import { Dispatch, SetStateAction } from "react";
import { media } from "@styles/theme";

interface SelectBodyPartProps {
  selectedBodyPart: bodyPartType;
  setIsSelect: Dispatch<SetStateAction<boolean>>;
}

const BodyPartChecker = ({ selectedBodyPart, setIsSelect }: SelectBodyPartProps) => {
  const router = useRouter();

  return (
    <FlexContainer>
      <ContentBox>
        <ToryBox>
          <ToryMotion>
            <ToryPurpleAnim segmentIndex={0} />
          </ToryMotion>
        </ToryBox>
        <TextBox>
          {!selectedBodyPart ? (
            <ToryText>증상을 기록할 부위를 선택해주세요</ToryText>
          ) : (
            <ToryText>
              <PositionTextBox
                key={KoreanPosition[selectedBodyPart]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {KoreanPosition[selectedBodyPart]}
              </PositionTextBox>
              에 대한 증상을 기록할까요?
            </ToryText>
          )}
        </TextBox>
        <CreateBtnBox>
          {selectedBodyPart ? (
            <BtnBox variants={BTN_VARIANTS} initial="initial" animate="animate" exit="exit">
              <RoundedDefaultButton
                bgColor="rgb(83, 89, 233)"
                onClick={() => router.push(`./write/${selectedBodyPart}`)}
              >
                네, 기록할게요!
              </RoundedDefaultButton>
            </BtnBox>
          )
          :
          <MobBtnBox variants={BTN_VARIANTS} initial="initial" animate="animate" exit="exit">
              <RoundedDefaultButton
                bgColor="rgb(83, 89, 233)"
                onClick={() => setIsSelect(true)}
              >
                부위 선택하기
              </RoundedDefaultButton>
            </MobBtnBox>
        }
        </CreateBtnBox>
      </ContentBox>
    </FlexContainer>
  );
};

export default BodyPartChecker;

const MobBtnBox = styled(BtnBox)`
  display:none;
  ${media.custom(1280)}{
    display:flex;
  }
`

export const PositionTextBox = styled(motion.span)`
  border-radius: 10px;
  background-color: #e8e9ff;
  padding: 5px 20px;
  margin-right: 10px;
  color: ${({ theme }) => theme.color.darkBg};
  font-weight: 800;
`;

const ContentBox = styled.div`
  width: 540px;
  padding-bottom: 170px;
`;

export const ToryBox = styled(Box)`
`;

const ToryMotion = styled.div`
  width: 360px;
  height: 360px;
  transform: translate(0, -10%);
  margin: 0 auto;

  ${media.mobile}{
    width: 280px;
    height: 280px;
  }
`;

export const TextBox = styled(Box)`
  margin-bottom: 90px;
  text-align: center;
  word-break: keep-all;
  
  ${media.mobile}{
    margin-bottom: 50px;
  }
`;
export const CreateBtnBox = styled(BtnBox)`
  height: 60px;
  justify-content: center;
`;
