import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Pagination, Spin } from 'antd';
import Search from 'antd/lib/input/Search';
import withSoccerService from '../../hoc/with-soccer-service';
import Config from '../../utils/const';
import LeaguesList from '../../componets/leagues-list/leagues-list';

const LeaguesPage = ({ getData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const [leagues, setLeagues] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState(searchParams.get('q') || '');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const setCurrentSearchParams = () => {
    setSearchParams({
      page: currentPage,
      q: searchPhrase,
    });
  };

  const paginationChangeHandler = (page) => {
    setCurrentPage(page);
    setCurrentSearchParams();
  };

  const searchHandler = (value) => {
    setSearchPhrase(value);
    setCurrentSearchParams();
  };

  useEffect(() => {
    getData()
      .then((data) => setLeagues(data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredLeagues = leagues
    .filter(({ name }) => name.toLowerCase().includes(searchPhrase.toLowerCase()));
  const firstElementToCurrentPage = (currentPage - 1) * Config.COUNT_ITEMS_PER_PAGE;
  const lastElementToCurrentPage = firstElementToCurrentPage + Config.COUNT_ITEMS_PER_PAGE;
  const leaguesToShow = filteredLeagues
    .slice(firstElementToCurrentPage, lastElementToCurrentPage);

  if (isLoading) {
    return <Spin />;
  }

  if (isError) {
    return <div>errror</div>;
  }

  return (
    <div className="container">
      <Search placeholder="input search text" onSearch={searchHandler} style={{ width: 200 }} defaultValue={searchPhrase} />
      <LeaguesList leagues={leaguesToShow} />
      <Pagination
        defaultCurrent={currentPage}
        total={filteredLeagues.length}
        pageSize={Config.COUNT_ITEMS_PER_PAGE}
        onChange={paginationChangeHandler}
      />
    </div>
  );
};

const mapMethodsToProps = (soccerService) => ({
  getData: soccerService.getLeagues,
});

export default withSoccerService(mapMethodsToProps)(LeaguesPage);
