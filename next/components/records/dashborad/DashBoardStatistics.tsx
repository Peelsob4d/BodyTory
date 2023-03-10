import useUser from "@hooks/useUser";
import { Position } from "@prisma/client";
import LoadingAnim from "@components/lotties/LoadingAnim";
import { useQuery } from "@tanstack/react-query";
import customApi from "@utils/client/customApi";
import { BODYPART_CHARTDATA_READ, KEYWORDS_CHARTDATA_READ } from "constant/queryKeys";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { KoreanPosition } from "types/write";
import MostBodyPart from "./MostBodyPart";
import MostKeyword from "./MostKeyword";
import { media } from "@styles/theme";

interface ThreeMonthResponse {
  position: Position;
  userLength?: number;
  hospitalLength?: number;
}

function DashBoardStatistics() {
  const { user } = useUser();

  const [mostPart, setMostPart] = useState<string[]>();
  const [mostPartIdx, setMostPartIdx] = useState<number[]>();
  const [bodyPartChartData, setBodyPartChartData] = useState<ThreeMonthResponse[]>();

  const [mostKeyword, setMostKeyword] = useState<string>();
  const [keywordChartData, setKeywordChartData] = useState<string[]>();

  const dashboardGetApi = customApi(`/api/users/records/dashboard/threeMonth`);
  const dashboardQuery = useQuery<any>([BODYPART_CHARTDATA_READ], dashboardGetApi.getApi);

  const flaskGetApi = customApi(`/api/users/records/flask/threeMonth`);
  const flaskQuery = useQuery<any>([KEYWORDS_CHARTDATA_READ], flaskGetApi.getApi);

  useEffect(() => {
    // 가장 기록이 많은 부위 찾기
    if (dashboardQuery.data && dashboardQuery.data.length !== 0) {
      let maxLength = 0;
      let maxPart: string[] = [];
      let maxIdx: number[] = [];

      dashboardQuery.data.forEach((ele: any) => {
        if (ele.userLength > maxLength) maxLength = ele.userLength;
      });
      dashboardQuery.data.forEach((ele: any, idx: number) => {
        if (ele.userLength === maxLength) {
          maxPart.push(ele.position);
          maxIdx.push(idx);
        }
      });

      setMostPart(maxPart);
      setMostPartIdx(maxIdx);
      setBodyPartChartData(dashboardQuery.data);
    }

    // 키워드 데이터 전달
    if (flaskQuery.data) {
      setKeywordChartData(flaskQuery.data);
      setMostKeyword(flaskQuery.data[0]);
    }
  }, [dashboardQuery.data, flaskQuery.data]);

  return user ? (
    <StatisticsContainer>
      <Title>최근 3개월 동안 {user?.name}님의 건강상태를 분석했어요</Title>
      <HorizontalScrollContainer>
        <FlexContainer>
          <ChartBox>
            {mostPart && (
              <>
                <p>
                  가장 많은 기록을 남긴 부위는{" "}
                  <strong>
                    {mostPart?.length > 1
                      ? `${KoreanPosition[mostPart[0] as Position]} 외 ${mostPart.length - 1}곳`
                      : KoreanPosition[mostPart[0] as Position]}
                  </strong>{" "}
                  입니다
                </p>
                <MostBodyPart
                  chartData={bodyPartChartData ? bodyPartChartData : null}
                  mostPartIdx={mostPartIdx ? mostPartIdx : null}
                />
              </>
            )}
          </ChartBox>
          <ChartBox>
            {keywordChartData?.length === 0 && (
              <NoKeywordChart>
                <LoadingAnim />
                <p>기록이 더 많아지면 키워드를 분석할 수 있어요!</p>
              </NoKeywordChart>
            )}
            {keywordChartData?.length !== 0 && (
              <>
                <p>
                  가장 많이 기록된 키워드는 <strong>{mostKeyword}</strong> 입니다
                </p>
                <MostKeyword chartData={keywordChartData ? keywordChartData : null} />
              </>
            )}
          </ChartBox>
        </FlexContainer>
      </HorizontalScrollContainer>
    </StatisticsContainer>
  ) : null;
}

const StatisticsContainer = styled.div``;

const HorizontalScrollContainer = styled.div`
  width: 100%;

  ${media.mobile} {
    overflow-x: scroll;
    padding: 0 20px 20px 0;
  }
`;

const FlexContainer = styled.div`
  display: flex;

  ${media.mobile} {
    width: calc(180% + 20px);
  }
`;

const Title = styled.p`
  padding: 0 25px;
  margin-bottom: 30px;
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.white};

  ${media.custom(1280)} {
    font-size: 20px;
    margin-bottom: 20px;
  }

  ${media.tablet} {
    font-size: 18px;
  }

  ${media.mobile} {
    font-size: 15px;
    padding: 0 15px;
  }
`;

const ChartBox = styled.div`
  width: calc(50% - 20px);
  height: 480px;
  background: ${({ theme }) => theme.color.white};
  border-radius: 40px;
  padding: 30px;
  box-shadow: 8px 8px 18px 0px rgba(32, 36, 120, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;

  & + & {
    margin-left: 40px;
  }

  p {
    text-align: center;
    margin-bottom: 30px;

    strong {
      font-weight: 700;
      padding: 0 1px 2px;
      background: linear-gradient(to top, rgba(18, 212, 201, 0.4) 40%, transparent 40%);
    }
  }

  ${media.custom(1440)} {
    width: calc(50% - 10px);
    height: 440px;

    & + & {
      margin-left: 20px;
    }
  }

  ${media.tablet} {
    padding: 20px;
    height: 400px;

    p {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  ${media.tablet} {
    height: auto;
    aspect-ratio: 1 / 1;
  }
`;

const NoKeywordChart = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  p {
    font-weight: 500;
    margin-top: 50px;
  }
`;

export default DashBoardStatistics;
