import React from 'react';
import Search from 'antd/es/input/Search';
import { Pagination } from 'antd';
import { Config } from '../../utils/const';
import compose from '../../hoc/compose';
import withSoccerService from '../../hoc/with-soccer-service';
import withData from '../../hoc/withData';
import TeamCard from '../../componets/team-card/team-card';
import ItemList from '../../componets/item-list/item-list';
import './teams-page.css';

const TeamsPage = (props) => {
  const {
    items, paginationChangeHandler, searchChangeHandler, currentPage, searchPhrase, count,
  } = props;

  const card = (cardProps) => <TeamCard {...cardProps} />;

  return (
    <div className="container">
      <Search
        className="teams-page__search"
        placeholder="input search text"
        onSearch={searchChangeHandler}
        style={{ width: 200 }}
        defaultValue={searchPhrase}
      />
      <ItemList
        items={items}
        card={card}
      />
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
