import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ezreal from "../../Images/WebFrontend.png";
import SummonerRanking from "../../Components/SummonerRanking/SummonerRankingList";
import AnnouncementList from "../../Components/Announcement/AnnouncementList";

const Summoners = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Container>
        <Logo src={Ezreal} alt="Summoners" />
        <SearchContainer>
          <Input
            type="text"
            placeholder="Search Summoner"
            aria-label="Search Summoner"
            aria-describedby="search-button"
            value={searchTerm}
            onChange={onChangeSearchTerm}
            className="form-control"
          />
          <Button id="search-button" className="btn btn-primary ms-2">
            Search
          </Button>
        </SearchContainer>
      </Container>
      <div className="container-fluid my-5 mx-auto">
        <div className="row justify-content-center">
          <div className="col-md-3 mb-3">
            <Title>Player of the Month Ranking</Title>
            <SummonerRanking />
          </div>
          <div className="col-md-3">
            <Title>Popular occupations</Title>
            <AnnouncementList />
          </div>
        </div>
      </div>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.img`
  width: 20%;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
`;

const Input = styled.input`
  flex: 1;
  height: 50px;
  border: none;
  border-radius: 5px 0 0 5px;
  padding: 0 20px;
  font-size: 18px;
`;

const Button = styled.button`
  height: 50px;
  border: none;
  border-radius: 0 5px 5px 0;
  padding: 0 20px;
  font-size: 18px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default Summoners;
