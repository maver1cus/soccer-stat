import React from 'react';
import Search from 'antd/es/input/Search';
import { Pagination } from 'antd';
import Config from '../../utils/const';
import compose from '../../hoc/compose';
import withSoccerService from '../../hoc/with-soccer-service';
import withData from '../../hoc/withData';
import TeamsList from '../../componets/teams-list/teams-list';

const TeamsPage = (props) => {
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
      <TeamsList teams={data} />
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
  getData: soccerService.getTeams,
});

export default compose(
  withSoccerService(mapMethodsToProps),
  withData,
)(TeamsPage);
