import moment from 'moment';

class SoccerService {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_BASE;
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
    leagueName: competition.name,
    matches: matches.map(SoccerService.transformMatch),
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

  getLeague = async (leagueId, dateStart, dateEnd) => {
    const datesQuery = (dateStart && dateEnd)
      ? `?dateFrom=${dateStart}&dateTo=${dateEnd}`
      : '';
    const leagueCalendar = await this.getResource(`/competitions/${leagueId}/matches/${datesQuery}`);

    return SoccerService.transformLeagueCalendar(leagueCalendar);
  };
}

export default SoccerService;
