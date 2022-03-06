import React from 'react';
import Search from 'antd/es/input/Search';
import { Pagination } from 'antd';
import withSoccerService from '../../hoc/with-soccer-service';
import { COUNT_ITEMS_PER_PAGE } from '../../utils/const';
import withData from '../../hoc/withData';
import compose from '../../hoc/compose';
import LeagueCard from '../../componets/league-card/league-card';
import ItemList from '../../componets/item-list/item-list';
import './leagues-page.css';

const LeaguesPage = (props) => {
  const {
    items, paginationChangeHandler, searchChangeHandler, currentPage, searchPhrase, count,
  } = props;

  const card = (cardProps) => <LeagueCard {...cardProps} />;

  return (
    <div className="container">
      <Search
        className="leagues-page__search"
        placeholder="input search text"
        onSearch={searchChangeHandler}
        style={{ width: 200 }}
        defaultValue={searchPhrase}
      />
      <ItemList items={items} card={card} />
      <Pagination
        defaultCurrent={currentPage}
        total={count}
        pageSize={COUNT_ITEMS_PER_PAGE}
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
