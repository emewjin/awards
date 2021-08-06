import React from "react";
import styled from "styled-components";

export default function Info() {
  return (
    <Container>
      <Title>메이플스토리 제 1회 금손어워즈 반응형 웹 뷰어</Title>
      <Lists>
        <List>예선 기간 : 8월 11일까지</List>
        <List>투표 방법 : 부문별 1일 투표권 5개 생성</List>
        <List>
          ✅이 프로젝트는 상업적, 영리적 목적으로 이용되지 않습니다. 수익을
          창출하지 않습니다.
        </List>
        <List>
          ✅이 프로젝트는 반응형으로 공모전 출품작들을 보고싶어 만들어졌습니다.
        </List>
        <List>
          ✅데이터의 모든 저작권은 넥슨 메이플스토리와 출품자에게 있습니다.
        </List>
        <List>✅본선 때도 지원할 예정입니다!</List>
      </Lists>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  padding-top: 100px;
  line-height: 1.4;
`;

const Title = styled.h1`
  margin: 20px 0;
  font-size: 40px;
  font-weight: bold;
  color: ${({ theme }) => theme.orange};
  text-align: center;
  word-break: keep-all;

  ${({ theme }) => theme.tablet`
    font-size: 30px;
  `};
`;

const Lists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const List = styled.li`
  margin: 10px 0;
  font-size: 20px;
  text-align: center;
`;
