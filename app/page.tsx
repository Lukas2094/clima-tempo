// app/weather/page.tsx
import axios from 'axios';
import { WeatherLive } from '@/components/Weather';

export const dynamic = 'force-dynamic';

async function getInitialWeather(city: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const { data } = await axios.get(`${baseUrl}/api/weather`, {
    params: { city },
  });
  return data;
}

export default async function WeatherPage() {
  const city = '';
  const initialData = await getInitialWeather(city);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 to-indigo-900 p-4">
      <WeatherLive city={city} initial={initialData} />
    </main>
  );
}
