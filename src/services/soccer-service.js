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
