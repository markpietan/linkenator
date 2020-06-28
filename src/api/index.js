import axios from 'axios';


export async function getLinks() {
  try {
    const { data } = await axios.get('/api/links');
    console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}

export default async function addClick(id){
  try {
    const { data } = await axios.patch('/api/links/clicks/'+id);
    return data
  } catch (error) {
    throw error
  }
}

export async function generateLink({comment, URL, tags}){
  console.log(comment, URL, tags)
  try {
    const response = await axios.post('/api/links', {
      data: {comment, URL, tags}
    });   
    console.log(response)
    return response.data
  } catch (error) {
    throw error
  }
}