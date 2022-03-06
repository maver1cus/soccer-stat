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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    getData()
      .then((items) => setData(items))
      .catch(({ message }) => setError(message))
      .finally(() => setIsLoading(false));
  }, []);

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

  const searchChangeHandler = (phrase) => {
    setSearchPhrase(phrase);
    setCurrentSearchParams();
  };

  const getDataToShow = () => {
    const indexFirstElementToCurrentPage = (currentPage - 1) * Config.COUNT_ITEMS_PER_PAGE;
    const indexLastElementToCurrentPage =
      indexFirstElementToCurrentPage + Config.COUNT_ITEMS_PER_PAGE;

    return data
      .filter(({ name }) => name.toLowerCase().includes(searchPhrase.toLowerCase()))
      .slice(indexFirstElementToCurrentPage, indexLastElementToCurrentPage);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <View
      {...props}
      data={getDataToShow()}
      paginationChangeHandler={paginationChangeHandler}
      searchChangeHandler={searchChangeHandler}
      currentPage={currentPage}
      searchPhrase={searchPhrase}
      count={data.length}
    />
  );
};

export default withData;
