import React, { useEffect, useState } from 'react';
import { Thermometer, Droplets, RefreshCw, AlertCircle } from 'lucide-react';
import { RoomAlertData } from '@/types';
import { RoomAlertService } from '@/utils/roomAlertService';

interface EnvironmentDataProps {
  deviceId?: string;
  sensorName?: string;
  refreshInterval?: number; // in milliseconds, default 30s
}

const EnvironmentData: React.FC<EnvironmentDataProps> = ({ 
  deviceId, 
  sensorName,
  refreshInterval = 30000 
}) => {
  const [data, setData] = useState<RoomAlertData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    if (!deviceId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Start polling for sensor data
    const stopPolling = RoomAlertService.startPolling(
      deviceId,
      sensorName,
      (newData) => {
        setIsLoading(false);
        if (newData) {
          setData(newData);
          setLastUpdate(new Date());
          setError(null);
        } else {
          setError('Failed to fetch sensor data');
        }
      },
      refreshInterval
    );

    // Cleanup on unmount
    return () => {
      stopPolling();
    };
  }, [deviceId, sensorName, refreshInterval]);

  if (!deviceId) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
        <div className="flex items-center gap-2 text-gray-500">
          <AlertCircle size={20} />
          <span className="text-sm">No Room Alert device configured for this garden</span>
        </div>
      </div>
    );
  }

  if (isLoading && !data) {
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 text-gray-500">
          <RefreshCw className="animate-spin" size={20} />
          <span className="text-sm">Loading sensor data...</span>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="bg-red-50 rounded-lg p-4 border border-red-200">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle size={20} />
          <span className="text-sm">{error}</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const getTemperatureColor = (temp: number) => {
    if (temp < 60) return 'text-blue-600';
    if (temp > 80) return 'text-red-600';
    return 'text-green-600';
  };

  const getHumidityColor = (humidity: number) => {
    if (humidity < 40) return 'text-orange-600';
    if (humidity > 70) return 'text-blue-600';
    return 'text-green-600';
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    return date.toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
          Live Environment Data
        </h3>
        {lastUpdate && (
          <span className="text-xs text-gray-500">
            {formatTimestamp(lastUpdate)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 ${getTemperatureColor(data.temperature)}`}>
            <Thermometer size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Temperature</p>
            <p className={`text-2xl font-bold ${getTemperatureColor(data.temperature)}`}>
              {data.temperature}°F
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 ${getHumidityColor(data.humidity)}`}>
            <Droplets size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Humidity</p>
            <p className={`text-2xl font-bold ${getHumidityColor(data.humidity)}`}>
              {data.humidity}%
            </p>
          </div>
        </div>
      </div>

      {sensorName && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            <span className="font-medium">Sensor:</span> {sensorName}
          </p>
        </div>
      )}
    </div>
  );
};

export default EnvironmentData;
