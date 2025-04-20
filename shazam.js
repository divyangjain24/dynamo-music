import axios from 'axios';

const API_KEY = 'ace48831e7mshed1f4fe0fe83a01p12a4b7jsnd5483377b83d';

export const searchSongs = async (searchTerm) => {
  const options = {
    method: 'GET',
    url: `https://deezerdevs-deezer.p.rapidapi.com/search`,
    params: { q: searchTerm },
    headers: {
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
      'x-rapidapi-key': API_KEY
    }
  };

  try {
    const response = await axios.request(options);
    return response.data.data || [];
  } catch (error) {
    console.error('Error searching songs:', error);
    return [];
  }
};
