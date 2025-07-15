'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '@/utils/formatDate/formateDate';

export function WeatherLive({ city: initialCity, initial }: { city: string; initial: any }) {
    const [city, setCity] = useState(initialCity);
    const [query, setQuery] = useState(initialCity);
    const [weather, setWeather] = useState(initial);
    const [loading, setLoading] = useState(false);

    async function fetchWeather(newCity: string) {
        try {
            setLoading(true);
            const { data } = await axios.get('/api/weather', {
                params: { city: newCity },
            });
            setWeather(data);
            setCity(newCity);
        } catch (err) {
            console.error('Erro ao buscar clima:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            fetchWeather(city);
        }, 60000); // Atualiza a cada 1 min

        return () => clearInterval(interval);
    }, [city]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        fetchWeather(query);
    };

    return (
        <div className="flex flex-col items-center justify-center text-white">
            <form onSubmit={handleSubmit} className="mb-6 flex gap-2 w-full max-w-md">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Digite a cidade..."
                    className="w-full px-4 py-2 rounded-lg text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold"
                >
                    Buscar
                </button>
            </form>

            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md text-center transition">
                {loading ? (
                    <p className="text-lg animate-pulse">🔄 Buscando clima para {query}...</p>
                ) : !weather?.current ? (
                    <p className="text-red-200">❌ Dados não disponíveis</p>
                ) : (
                    <>
                                <h2 className="text-3xl font-bold mb-2 text-blue-700">{weather.location.name}, {weather.location.region}</h2>
                                <p className="text-lg mb-4 text-red-600">{formatDate(weather.location.localtime)}</p>

                        <div className="flex items-center justify-center gap-4 mb-4">
                            <img
                                src={`https:${weather.current.condition.icon}`}
                                alt="Clima"
                                className="w-20 h-20"
                            />
                            <div>
                                        <p className="text-5xl font-semibold text-red-600">{weather.current.temp_c}°C</p>
                                        <p className="capitalize text-red-600">{weather.current.condition.text}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-red-600">
                            <div>💨 Vento: <strong>{weather.current.wind_kph} km/h</strong></div>
                            <div>💧 Umidade: <strong>{weather.current.humidity}%</strong></div>
                            <div>🌡️ Sensação térmica: <strong>{weather.current.feelslike_c}°C</strong></div>
                            <div>🌅 Nascer do sol: <strong>{weather.forecast?.forecastday[0]?.astro?.sunrise || 'N/D'}</strong></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};