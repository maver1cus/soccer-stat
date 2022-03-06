import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ErrorMessage from '../componets/error-message/error-message';
import Spinner from '../componets/spinner/spinner';

const WithDataCalendar = (View) => (props) => {
  const { getData } = props;
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get('page') || 1);
  const [dateFrom, setDateFrom] = useState(searchParams.get('dateFrom') || '');
  const [dateTo, setDateTo] = useState(searchParams.get('dateTo') || '');
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getData(id, dateFrom, dateTo)
      .then((item) => {
        setName(item.name);
        setData(item.items);
      })
      .catch(({ message }) => setError(message))
      .finally(() => setIsLoading(false));
  }, [dateTo, dateFrom]);

  const paginationChangeHandler = (page) => {
    setSearchParams({ ...Object.fromEntries([...searchParams]), page });
    setCurrentPage(page);
  };

  const datesChangeHandler = (_, dates) => {
    const [from, to] = dates;
    const params = {
      page: 1,
      dateFrom: from,
      dateTo: to,
    };

    setSearchParams(params);
    setDateFrom(from);
    setDateTo(to);
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
      data={data}
      paginationChangeHandler={paginationChangeHandler}
      datesChangeHandler={datesChangeHandler}
      currentPage={currentPage}
      dateFrom={dateFrom}
      dateTo={dateTo}
      name={name}
      count={data.length}
    />
  );
};

export default WithDataCalendar;
