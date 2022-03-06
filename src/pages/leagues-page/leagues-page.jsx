import React from 'react';
import Search from 'antd/es/input/Search';
import { Pagination } from 'antd';
import withSoccerService from '../../hoc/with-soccer-service';
import LeaguesList from '../../componets/leagues-list/leagues-list';
import { Config } from '../../utils/const';
import withData from '../../hoc/withData';
import compose from '../../hoc/compose';

const LeaguesPage = (props) => {
  const {
    data, paginationChangeHandler, searchChangeHandler, currentPage, searchPhrase, count,
  } = props;

  return (
    <div className="container">
      <Search
        placeholder="input search text"
        onSearch={searchChangeHandler}
        style={{ width: 200 }}
        defaultValue={searchPhrase}
      />
      <LeaguesList leagues={data} />
      <Pagination
        defaultCurrent={currentPage}
        total={count}
        pageSize={Config.COUNT_ITEMS_PER_PAGE}
        onChange={paginationChangeHandler}
      />
    </div>
  );
};

const mapMethodsToProps = (soccerService) => ({
  getData: soccerService.getLeagues,
});

export default compose(
  withSoccerService(mapMethodsToProps),
  withData,
)(LeaguesPage);
