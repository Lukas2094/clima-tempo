import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city') || 'São Paulo';

  try {
    const { data } = await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
        lang: 'pt',
        days: 3,
      },
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: 'Erro ao buscar clima' }, { status: 500 });
  }
}
