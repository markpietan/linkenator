import axios from 'axios';

export async function getLinks() {
  try {
    const { data } = await axios.get('/api/links');
    return data.cleanRows;
  } catch (error) {
    throw error;
  }
}