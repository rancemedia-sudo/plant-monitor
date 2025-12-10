import { RoomAlertData } from '@/types';

/**
 * Room Alert API Service
 * 
 * This service connects to your Room Alert device to fetch real-time
 * temperature and humidity data for your gardens.
 * 
 * Setup Instructions:
 * 1. Get your public device link from https://account.roomalert.com
 * 2. Extract the UUID from the URL
 *    Example URL: https://account.roomalert.com/public/device/112f34ac-76a1-421b-8dc1-89c619eb5d1a
 *    Device ID: 112f34ac-76a1-421b-8dc1-89c619eb5d1a
 * 3. No API key required for public devices
 * 4. Configure in the app or environment variables
 */

const ROOM_ALERT_BASE_URL = import.meta.env.VITE_ROOM_ALERT_BASE_URL || 'https://account.roomalert.com';

export class RoomAlertService {
  /**
   * Fetch current sensor data from Room Alert device
   * @param deviceId - Your Room Alert device UUID (from public link)
   * @param sensorName - Optional: specific sensor name to filter
   */
  static async fetchSensorData(
    deviceId: string, 
    sensorName?: string
  ): Promise<RoomAlertData | null> {
    try {
      // Room Alert public API endpoint using device UUID
      const url = `${ROOM_ALERT_BASE_URL}/public/device/${deviceId}`;
      
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const response = await fetch(url, { 
        headers
      });
      
      if (!response.ok) {
        throw new Error(`Room Alert API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Room Alert API returns sensors array with readings
      // Each sensor has: name, value, unit, etc.
      let temperature = null;
      let humidity = null;

      // Look for temperature sensor
      if (data.sensors && Array.isArray(data.sensors)) {
        const tempSensor = data.sensors.find((s: any) => 
          s.name?.toLowerCase().includes('temp') || 
          s.unit === '°F' || 
          s.unit === '°C' ||
          s.type === 'temperature'
        );
        
        const humiditySensor = data.sensors.find((s: any) => 
          s.name?.toLowerCase().includes('humidity') || 
          s.unit === '%' ||
          s.type === 'humidity'
        );

        if (tempSensor) temperature = parseFloat(tempSensor.value);
        if (humiditySensor) humidity = parseFloat(humiditySensor.value);
      }

      if (temperature === null || humidity === null) {
        console.warn(`Temperature or humidity sensor not found for device ${macAddress}`, data);
        return null;
      }

      return {
        temperature,
        humidity,
        timestamp: new Date(data.timestamp || data.last_updated || Date.now()),
        deviceId: deviceId,
        sensorName: sensorName || data.name || 'Room Alert Device'
      };
    } catch (error) {
      console.error('Error fetching Room Alert data:', error);
      return null;
    }
  }

  /**
   * Simulated data for development/testing
   * Remove this method when connecting to real Room Alert device
   */
  static async fetchMockSensorData(
    deviceId: string, 
    sensorName?: string
  ): Promise<RoomAlertData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate realistic fluctuating values
    const baseTemp = 72;
    const baseHumidity = 60;
    const tempVariation = (Math.random() - 0.5) * 4;
    const humidityVariation = (Math.random() - 0.5) * 10;

    return {
      temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
      humidity: Math.round((baseHumidity + humidityVariation) * 10) / 10,
      timestamp: new Date(),
      deviceId: deviceId,
      sensorName: sensorName || 'Room Alert Sensor'
    };
  }

  /**
   * Start polling for sensor data at regular intervals
   * @param deviceId - Your Room Alert device UUID
   * @param sensorName - Optional: specific sensor name
   * @param callback - Function to call with updated data
   * @param intervalMs - Polling interval in milliseconds (default: 30 seconds)
   * @returns Function to stop polling
   */
  static startPolling(
    deviceId: string,
    sensorName: string | undefined,
    callback: (data: RoomAlertData | null) => void,
    intervalMs: number = 30000
  ): () => void {
    const useMockData = import.meta.env.VITE_USE_MOCK_ROOM_ALERT === 'true';
    
    // Initial fetch
    const fetchData = async () => {
      const data = useMockData 
        ? await this.fetchMockSensorData(macAddress, sensorName)
        : await this.fetchSensorData(macAddress, sensorName);
      callback(data);
    };

    fetchData();

    // Set up polling interval
    const intervalId = setInterval(fetchData, intervalMs);

    // Return cleanup function
    return () => clearInterval(intervalId);
  }
}
