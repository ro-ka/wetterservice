import https from 'https';
import type { NextRequest } from 'next/server'
import { isToday, isTomorrow } from 'date-fns';

function getCurrent(currently: any): string {
  const { summary, temperature } = currently;
  return `Aktuell ${summary} bei ${Math.round(temperature)} Grad.`;
}

function getForecast(hourly: any): string {
  const now = new Date();
  const isDesiredDay = now.getHours() < 15 ? isToday : isTomorrow;
  const temperatures = hourly.data
    .filter((hourData: any) => isDesiredDay(new Date(hourData.time * 1000)))
    .map((hourData: any) => hourData.temperature);
  const maxTemperature = Math.max(temperatures);

  return `Vorschau: ${hourly.summary} Maximal ${Math.round(maxTemperature)} Grad.`;
}

function fetch(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

export async function middleware(req: NextRequest) {
  const apiKey = process.env.API_KEY;
  const url = `https://api.darksky.net/forecast/${apiKey}/53.5630217,10.0095132?lang=de&units=si&exclude=daily,flags,alerts,minutely`;

  try {
    const data = await fetch(url);
    // const text = getCurrent(data.currently) + getForecast(data.hourly);
    return new Response(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: 'Failed fetching data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}