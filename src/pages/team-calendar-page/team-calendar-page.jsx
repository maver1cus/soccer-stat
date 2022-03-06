import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Breadcrumb, Table, DatePicker, Space,
} from 'antd';
import withSoccerService from '../../hoc/with-soccer-service';
import compose from '../../hoc/compose';
import WithDataCalendar from '../../hoc/with-data-calendar';
import { Config } from '../../utils/const';
import './team-calendar-page.css';

const TeamCalendarPage = ({
  data, paginationChangeHandler, datesChangeHandler, currentPage, dateFrom, dateTo, name, count,
}) => {
  const columns = [
    {
      title: 'Дата', dataIndex: 'date', key: 'date', fixed: 'left', width: 80,
    },
    {
      title: 'Время', dataIndex: 'time', key: 'time', fixed: 'left', width: 65,
    },
    { title: 'Команда А', dataIndex: 'homeTeam', key: 'homeTeam' },
    { title: 'Команда Б', dataIndex: 'awayTeam', key: 'awayTeam' },
    { title: 'Статус', dataIndex: 'status', key: 'status' },
    { title: 'Счет', dataIndex: 'score', key: 'score' },
  ];

  const defaultValueRangePicker = (dateFrom && dateTo)
    ? [moment(dateFrom, 'YYYY-MM-DD'), moment(dateFrom, 'YYYY-MM-DD')]
    : null;

  return (
    <div className="container teams-calendar">
      <Breadcrumb className="teams-calendar__breadcrumb">
        <Breadcrumb.Item>
          <Link to="/teams">Команды</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Space>
        <DatePicker.RangePicker
          defaultValue={defaultValueRangePicker}
          onChange={datesChangeHandler}
          className="teams-calendar__date-picker"
        />
      </Space>
      <Table
        dataSource={data}
        columns={columns}
        pagination={{
          pageSize: Config.COUNT_ITEMS_PER_PAGE,
          total: count,
          defaultCurrent: currentPage,
          onChange: paginationChangeHandler,
        }}
      />
    </div>
  );
};

const mapMethodsToProps = (apiService) => ({
  getData: apiService.getTeamCalendar,
});

export default compose(
  withSoccerService(mapMethodsToProps),
  WithDataCalendar,
)(TeamCalendarPage);
