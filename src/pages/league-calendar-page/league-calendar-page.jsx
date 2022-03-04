import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Breadcrumb, Table, DatePicker, Space, Spin,
} from 'antd';
import withSoccerService from '../../hoc/with-soccer-service';

const LeagueCalendarPage = ({ getData }) => {
  const { id: leagueId } = useParams();
  const [leagueName, setLeagueName] = useState('');
  const [matches, setMatches] = useState([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEror, setIsError] = useState(false);

  const columns = [
    { title: 'Дата', dataIndex: 'date', key: 'date' },
    { title: 'Время', dataIndex: 'time', key: 'time' },
    { title: 'Команда А', dataIndex: 'homeTeam', key: 'homeTeam' },
    { title: 'Команда Б', dataIndex: 'awayTeam', key: 'awayTeam' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Счет', dataIndex: 'score', key: 'score' },
  ];

  useEffect(() => {
    getData(leagueId, dateStart, dateEnd)
      .then((data) => {
        setLeagueName(data.leagueName);
        setMatches(data.matches);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [dateStart, dateEnd]);

  const dataPickerChangeHandler = (_, dates) => {
    setDateStart(dates[0]);
    setDateEnd(dates[1]);
  };

  if (isLoading) {
    return <Spin />;
  }

  if (isEror) {
    return <div>error</div>;
  }

  return (
    <div className="container">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Лиги</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {leagueName}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Space>
        <DatePicker.RangePicker onChange={dataPickerChangeHandler} />
      </Space>
      <Table
        dataSource={matches}
        columns={columns}
      />
    </div>
  );
};

const mapMethodsToProps = (apiService) => ({
  getData: apiService.getLeague,
});

export default withSoccerService(mapMethodsToProps)(LeagueCalendarPage);
