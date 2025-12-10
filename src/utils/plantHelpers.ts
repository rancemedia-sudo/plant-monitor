import { Plant } from '@/types';

export const getHealthColor = (health: Plant['health']): string => {
  switch (health) {
    case 'Excellent':
      return 'text-green-600';
    case 'Good':
      return 'text-blue-600';
    case 'Fair':
      return 'text-yellow-600';
    case 'Poor':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

export const getTempColor = (temp: number): string => {
  if (temp < 60) return 'text-blue-600';
  if (temp > 80) return 'text-red-600';
  return 'text-green-600';
};

export const getHumidityColor = (humidity: number): string => {
  if (humidity < 40) return 'text-orange-600';
  if (humidity > 70) return 'text-blue-600';
  return 'text-green-600';
};
