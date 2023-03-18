import React, { useState } from "react";
import styled from "styled-components";
import ProjectList from "../Components/ProjecetList/ProjectList";

const Home = () => {
  const [projects, setProjects] = useState([]);

  return (
    <>
      <Container className="container-fluid">
        대표 이미지
        <RepresentativeImage></RepresentativeImage>
      </Container>
      <Container className="container-fluid">
        모집중인 projects
        <ProjectList />
      </Container>
    </>
  );
};

export default Home;

const RepresentativeImage = styled.div`
  display: flex;
  height: 48rem;
  background-image: url("http://www.kukinews.com/data/kuk/image/2023/01/10/kuk202301100081.jpg");
  background-repeat: no-repeat;
`;

const Container = styled.div`
  border: 1px solid;
`;
