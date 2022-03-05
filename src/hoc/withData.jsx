import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useSearchParams } from 'react-router-dom';
import Config from '../utils/const';

const withData = (View) => (props) => {
  const { getData } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const [searchPhrase, setSearchPhrase] = useState(searchParams.get('q') || '');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getData()
      .then((items) => setData(items))
      .catch(() => setIsError(true))
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
    return <Spin />;
  }

  if (isError) {
    return <div>error</div>;
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
