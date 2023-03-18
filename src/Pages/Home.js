import React, { useState } from "react";
import styled from "styled-components";
import AnnouncementList from "../Components/Announcement/AnnouncementList";
import ProjectList from "../Components/ProjecetList/ProjectList";
import RoadmapList from "../Components/Roadmap/RoadmapList";
import SummonerRanking from "../Components/SummonerRanking/SummonerRankingList";

const Home = () => {
  const [projects, setProjects] = useState([]);

  return (
    <>
      <RepresentativeImage></RepresentativeImage>
      <Container>
        <Title>소환사를 찾고 있습니다.</Title>
        <ProjectList />
<<<<<<< HEAD

=======
        <Title>챔피온이 되기 위한 로드맵</Title>
        <RoadmapList />
        <Container className="row">
          <div className="col-md-6 ">
            <Title>이 달의 Summoner Ranking</Title>
            <SummonerRanking />
          </div>
          <div className="col-md-6">
            <Title>공지사항 및 업데이트 사항</Title>
            <AnnouncementList />
          </div>
        </Container>
>>>>>>> ab65a36010227de19eeb6fbee2c2a640ed758d03
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
