import React, { useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [projects, setProjects] = useState([]);

  return (
    <>
      <Container>
        <Title>프로젝트 추천합니다</Title>
        <Title>개발자를 위한 로드맵</Title>
      </Container>
    </>
  );
};

export default Home;

const RepresentativeImage = styled.div`
  display: flex;
  width: 100%;
  height: 70vh;
  background-image: url("http://www.kukinews.com/data/kuk/image/2023/01/10/kuk202301100081.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
