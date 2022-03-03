class SoccerService {
  constructor() {
    this.apiUrl = process.env.REACT_APP_API_BASE;
  }

  static transformLeagues = (competition) => ({
    id: competition.id,
    country: competition.area.name,
    name: competition.name,
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
}

export default SoccerService;
