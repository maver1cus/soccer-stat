import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Breadcrumb, Table, DatePicker, Space,
} from 'antd';
import withSoccerService from '../../hoc/with-soccer-service';
import compose from '../../hoc/compose';
import WithDataCalendar from '../../hoc/with-data-calendar';
import { COUNT_ITEMS_PER_PAGE, DATE_FORMAT } from '../../utils/const';
import './league-calendar-page.css';

const LeagueCalendarPage = ({
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
    ? [moment(dateFrom, DATE_FORMAT), moment(dateFrom, DATE_FORMAT)]
    : null;

  return (
    <div className="container">
      <Breadcrumb className="league-calendar__breadcrumb">
        <Breadcrumb.Item>
          <Link to="/">Лиги</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {name}
        </Breadcrumb.Item>
      </Breadcrumb>
      <Space>
        <DatePicker.RangePicker
          defaultValue={defaultValueRangePicker}
          onChange={datesChangeHandler}
          format={DATE_FORMAT}
          className="league-calendar__date-picker"
        />
      </Space>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{ x: 1024 }}
        pagination={{
          pageSize: COUNT_ITEMS_PER_PAGE,
          total: count,
          defaultCurrent: currentPage,
          onChange: paginationChangeHandler,
        }}
      />
    </div>
  );
};

const mapMethodsToProps = (apiService) => ({
  getData: apiService.getLeague,
});

export default compose(
  withSoccerService(mapMethodsToProps),
  WithDataCalendar,
)(LeagueCalendarPage);
