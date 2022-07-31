export default async function fetchDarksky(): Promise<any> {
  const apiKey = process.env.API_KEY;
  const url = `https://api.darksky.net/forecast/${apiKey}/53.5630217,10.0095132?lang=de&units=si&exclude=daily,flags,alerts,minutely`;
  const response = await fetch(url);
  return await response.json();
}