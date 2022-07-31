import { isToday, isTomorrow } from 'date-fns';
import fetchDarksky from './fetch-darksky';

function getCurrent(currently: any): string {
  const { summary, temperature } = currently;
  return `Aktuell ${summary} bei ${Math.round(temperature)} Grad. `;
}

function getForecast(hourly: any): string {
  const now = new Date();
  const isDesiredDay = now.getHours() < 15 ? isToday : isTomorrow;
  const temperatures = hourly.data
    .filter((hourData: any) => isDesiredDay(new Date(hourData.time * 1000)))
    .map((hourData: any) => hourData.temperature);
  const maxTemperature = Math.max(...temperatures);

  return `Vorschau: ${hourly.summary} Maximal ${Math.round(maxTemperature)} Grad. `;
}

export default async function getText(): Promise<string> {
  const data = await fetchDarksky();
  return getCurrent(data.currently) + getForecast(data.hourly);
}