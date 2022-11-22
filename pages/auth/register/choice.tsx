import ChoiceResiterBox from "@components/ChoiceResiterBox";
import KakaoLoginBtn from "@components/button/KakaoLoginBtn";
import NaverLoginBtn from "@components/button/NaverLoginBtn";
import customApi from "utils/client/customApi";
import { useMutation } from "@tanstack/react-query";
import { USER_LOGIN } from "constant/queryKeys";
import { useRouter } from "next/router";
import React from "react";

export default function ChoicePage() {
  const router = useRouter();
  const { postApi } = customApi("/api/auth/login");
  const { mutate } = useMutation([USER_LOGIN], postApi, {
    onError(error: any) {
      console.log(error);
    },
    onSuccess(data) {
      if (data.isNew) {
        console.log("----------------------------", data);
        return router.push(
          {
            pathname: "/auth/register",
            query: data,
          },
          "/auth/register",
        );
      } else return router.push("/");
    },
  });
  return (
    <div>
      <h2>어떤 방식으로 회원가입 할까요?</h2>
      <ChoiceResiterBox title="일반" img="없음" />
      <NaverLoginBtn mutate={mutate} />
      <KakaoLoginBtn mutate={mutate} />
    </div>
  );
}
