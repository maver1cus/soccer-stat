import moment from 'moment';
import {
  DATE_FORMAT, DATE_REQUSET_FORMAT, Message, TIME_FORMAT,
} from '../utils/const';

class SoccerService {
  constructor() {
    this.apiUrl = 'https://api.football-data.org/v2';
  }

  static getQueryString = (dateFrom, dateTo) => {
    const dateFromRequestFormat = moment(dateFrom).format(DATE_REQUSET_FORMAT);
    const dateToRequestFormat = moment(dateTo).format(DATE_REQUSET_FORMAT);

    return (dateFrom && dateTo)
      ? `?dateFrom=${dateFromRequestFormat}&dateTo=${dateToRequestFormat}`
      : '';
  };

  static transformLeagues = ({
    id, name, emblemUrl, area,
  }) => ({
    country: area.name,
    id,
    name,
    emblemUrl,
  });

  static transformMatch = ({
    id, utcDate, status, homeTeam, awayTeam, score,
  }) => {
    const { extraTime, fullTime, penalties } = score;
    const fullTimeStr = fullTime.homeTeam && fullTime.awayTeam
      ? `${fullTime.homeTeam} : ${fullTime.awayTeam}`
      : '';
    const extraTimeStr = extraTime.homeTeam && extraTime.awayTeam
      ? ` ${extraTime.homeTeam} : ${extraTime.awayTeam}`
      : '';
    const penaltiesStr = penalties.homeTeam && penalties.awayTeam
      ? ` ${penalties.homeTeam} : ${penalties.awayTeam}`
      : '';

    return {
      id,
      key: id,
      date: moment(utcDate).format(DATE_FORMAT),
      time: moment(utcDate).format(TIME_FORMAT),
      homeTeam: homeTeam.name,
      awayTeam: awayTeam.name,
      status,
      score: fullTimeStr + extraTimeStr + penaltiesStr,
    };
  };

  static transformLeagueCalendar = ({ competition, matches }) => ({
    name: competition.name,
    items: matches.map(SoccerService.transformMatch),
  });

  static transformTeams = ({ id, name, crestUrl }) => ({
    id, name, image: crestUrl,
  });

  static transformTeamCalendar = ({ id, name, matches }) => ({
    id,
    name,
    items: matches.map(SoccerService.transformMatch),
  });

  getResource = async (url) => {
    const res = await fetch(`${this.apiUrl}${url}`, {
      headers: {
        'X-Auth-Token': process.env.REACT_APP_TOKEN,
      },
    });

    if (!res.ok) {
      let message = Message.UNKNOWN_ERROR;

      if (res.status === 403) {
        message = Message.ERROR_PERMISSIONS_API;
      }
      throw new Error(message);
    }

    return res.json();
  };

  getLeagues = async () => {
    const { competitions } = await this.getResource('/competitions');
    return competitions.map(SoccerService.transformLeagues);
  };

  getLeague = async (leagueId, dateFrom, dateTo) => {
    const queryString = SoccerService.getQueryString(dateFrom, dateTo);
    const leagueCalendar = await this.getResource(`/competitions/${leagueId}/matches/${queryString}`);

    return SoccerService.transformLeagueCalendar(leagueCalendar);
  };

  getTeams = async () => {
    const { teams } = await this.getResource('/teams ');

    return teams.map(SoccerService.transformTeams);
  };

  getTeamName = async (teamId) => {
    const { name } = await this.getResource(`/teams/${teamId}`);

    return name;
  };

  getTeamCalendar = async (teamId, dateFrom, dateTo) => {
    const queryString = SoccerService.getQueryString(dateFrom, dateTo);
    const teamCalendar = await this.getResource(`/teams/${teamId}/matches/${queryString}`);
    const name = await this.getTeamName(teamId);

    return { ...SoccerService.transformTeamCalendar(teamCalendar), name };
  };
}

export default SoccerService;
