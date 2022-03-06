import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Config } from '../utils/const';
import Spinner from '../componets/spinner/spinner';
import ErrorMessage from '../componets/error-message/error-message';

const withData = (View) => (props) => {
  const { getData } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const [searchPhrase, setSearchPhrase] = useState(searchParams.get('q') || '');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getData()
      .then((data) => setItems(data))
      .catch(({ message }) => setError(message))
      .finally(() => setIsLoading(false));
  }, []);

  const paginationChangeHandler = (page) => {
    setSearchParams({ ...Object.fromEntries([...searchParams]), page });
    setCurrentPage(page);
  };

  const searchChangeHandler = (phrase) => {
    setSearchParams({ page: 1, q: phrase });
    setSearchPhrase(phrase);
  };

  const getItemsToShow = (filteredItems) => {
    const indexFirstElementToCurrentPage = (currentPage - 1) * Config.COUNT_ITEMS_PER_PAGE;
    const indexLastElementToCurrentPage =
      indexFirstElementToCurrentPage + Config.COUNT_ITEMS_PER_PAGE;

    return filteredItems
      .slice(indexFirstElementToCurrentPage, indexLastElementToCurrentPage);
  };

  const filteredItems = items
    .filter(({ name }) => name.toLowerCase().includes(searchPhrase.toLowerCase()));

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View
      {...props}
      items={getItemsToShow(filteredItems)}
      paginationChangeHandler={paginationChangeHandler}
      searchChangeHandler={searchChangeHandler}
      currentPage={currentPage}
      searchPhrase={searchPhrase}
      count={filteredItems.length}
    />
  );
};

export default withData;
