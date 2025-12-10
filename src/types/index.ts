export interface Garden {
  id: number;
  name: string;
  plantCount: number;
  roomAlertConfig?: {
    deviceId: string;
    sensorName: string;
    model?: string;
    serialNumber?: string;
  };
}

export interface Plant {
  id: number;
  name: string;
  type: string;
  temp: number;
  humidity: number;
  light: string;
  waterLevel: string;
  lastWatered: string;
  health: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  image: string;
}

export interface PlantsMap {
  [gardenId: number]: Plant[];
}

export interface NewPlantForm {
  name: string;
  type: string;
  image: string;
}

export interface RoomAlertData {
  temperature: number;
  humidity: number;
  timestamp: Date;
  deviceId: string;
  sensorName: string;
}

export interface RoomAlertResponse {
  sensor_data: Array<{
    name: string;
    value: number;
    unit: string;
  }>;
  device_name: string;
  timestamp: string;
}
