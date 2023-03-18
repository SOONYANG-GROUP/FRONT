import React, { useState } from "react";
import styled from "styled-components";
import ProjectList from "../Components/ProjecetList/ProjectList";

const Home = () => {
  const [projects, setProjects] = useState([]);

  return (
    <>
      <RepresentativeImage></RepresentativeImage>
      <Container>
        <Title>소환사를 찾고 있습니다.</Title>
        <ProjectList />
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
