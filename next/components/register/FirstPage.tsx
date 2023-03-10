import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import { RegisterForm } from "pages/auth/register";
import { Col, FlexContainer, InnerContainer, Row, WhiteText } from "@styles/Common";
import Link from "next/link";
import CheckBoxInput from "@components/layout/input/CheckBoxInput";
import MessageBox from "@components/MessageBox";
import styled from "styled-components";
import { media, theme } from "@styles/theme";
import Modal from "@components/modals/Modal";
import PersonalInformation from "./PersonalInformation";
import UseOfService from "./UseOfService";
import { motion } from "framer-motion";
import { CircleDefaultButton, RectangleDefaultButton } from "@components/layout/buttons/DefaultButtons";
interface FirstRegisterForm {
  agree: boolean;
}
interface RegisterPageProps {
  user: RegisterForm | undefined;
  setUser: Dispatch<SetStateAction<RegisterForm | undefined>>;
  setPage: Dispatch<SetStateAction<number>>;
}
const FirstPage = ({ user, setUser, setPage }: RegisterPageProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isFirstOne, setIsFirstOne] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<FirstRegisterForm>({
    mode: "onChange",
    defaultValues: {
      agree: user?.agree,
    },
  });

  const onValid = () => {
    setUser(prev => ({ ...prev!, agree: true }));
    if (user?.type !== "origin") {
      setPage(3);
    } else setPage(2);
  };
  return (
    <FlexContainer>
      <InnerContainer>
        <Form onSubmit={handleSubmit(onValid)}>
          <FormContents>
            <MessageBox>토리가 이용자님의 정보를 수집하고 안전하게 보호해요</MessageBox>
            <Col>
              <CheckBoxInput
                label="모든 약관에 동의합니다."
                name="agree"
                register={register("agree", { required: "약관 동의 해주세요" })}
                error={errors.agree}
              />
              <TermsBox>
                <TermsRow>
                  <WhiteText>[필수] 서비스 이용 약관 </WhiteText>
                  <RectangleDefaultButton
                    sm
                    type="button"
                    bgColor="rgb(61, 66, 191)"
                    onClick={() => {
                      setShowModal(true);
                      setIsFirstOne(true);
                    }}
                  >
                    내용 보기
                  </RectangleDefaultButton>
                </TermsRow>
                <TermsRow>
                  <WhiteText>[필수] 개인 정보 수집 및 이용 약관 </WhiteText>
                  <RectangleDefaultButton
                    sm
                    type="button"
                    bgColor="rgb(61, 66, 191)"
                    onClick={() => {
                      setShowModal(true);
                      setIsFirstOne(false);
                    }}
                  >
                    내용 보기
                  </RectangleDefaultButton>
                </TermsRow>
              </TermsBox>
            </Col>
          </FormContents>
          <PrevNextButtonBox>
            <Link href="/auth/register/choice">
              <CircleDefaultButton type="button" bgColor="rgb(75, 80, 211)">
                이전 단계
              </CircleDefaultButton>
            </Link>
            <CircleDefaultButton bgColor={theme.color.mintBtn} disable={Boolean(errors.agree) || !watch("agree")}>
              다음 단계
            </CircleDefaultButton>
          </PrevNextButtonBox>
        </Form>
      </InnerContainer>
      <Modal
        terms
        closingComment
        show={showModal}
        onClose={() => setShowModal(false)}
        activeFunction={() => setShowModal(false)}
        title={isFirstOne ? "[필수] 서비스 이용약관" : "[필수] 개인 정보 수집 및 이용 약관"}
      >
        {isFirstOne ? <UseOfService /> : <PersonalInformation />}
      </Modal>
    </FlexContainer>
  );
};

export default FirstPage;

export const Form = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;
const TermsBox = styled(Col)`
  max-width: 520px;
  width:90%;
  margin-top: 40px;
  ${media.mobile}{
    
  }
`;
const TermsRow = styled(Row)`
  width: 100%;
  height: 70px;
  justify-content: space-between;
  span {
    font-size: 16px;
  }
  & + & {
    border-top: 1px solid #646aeb;
  }
  ${media.mobile}{
    span {
      font-size: 14px;
    }
  }
`;
export const FormContents = styled(motion.div)``;
export const PrevNextButtonBox = styled(Row)`
  gap: 65px;
  ${media.custom(770)}{
    gap: 40px;
  }
`;
