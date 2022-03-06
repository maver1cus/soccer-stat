import moment from 'moment';

class SoccerService {
  constructor() {
    this.apiUrl = 'https://api.football-data.org/v2';
  }

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
      date: moment(utcDate).format('YYYY-MM-DD'),
      time: moment(utcDate).format('HH:MM:SS'),
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

  getResource = async (url) => {
    const res = await fetch(`${this.apiUrl}${url}`, {
      headers: {
        'X-Auth-Token': process.env.REACT_APP_TOKEN,
      },
    });

    if (!res.ok) {
      throw new Error(`Coluld not fetch ${url}, recevived ${res.status}`);
    }

    return res.json();
  };

  getLeagues = async () => {
    const { competitions } = await this.getResource('/competitions');
    return competitions.map(SoccerService.transformLeagues);
  };

  getLeague = async (leagueId, dateFrom, dateTo) => {
    const datesQuery = (dateFrom && dateTo)
      ? `?dateFrom=${dateFrom}&dateTo=${dateTo}`
      : '';
    const leagueCalendar = await this.getResource(`/competitions/${leagueId}/matches/${datesQuery}`);

    return SoccerService.transformLeagueCalendar(leagueCalendar);
  };

  getTeams = async () => {
    const { teams } = await this.getResource('/teams ');

    return teams.map(SoccerService.transformTeams);
  };
}

export default SoccerService;
