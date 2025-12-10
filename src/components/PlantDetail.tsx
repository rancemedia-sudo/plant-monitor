import React from 'react';
import { Thermometer, Droplets, Sun, Calendar, Trash2 } from 'lucide-react';
import { Plant } from '@/types';
import { getHealthColor, getTempColor, getHumidityColor } from '@/utils/plantHelpers';

interface PlantDetailProps {
  plant: Plant;
  onBack: () => void;
  onDelete: (plantId: number) => void;
}

const PlantDetail: React.FC<PlantDetailProps> = ({ plant, onBack, onDelete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="h-64 overflow-hidden bg-gradient-to-br from-green-400 to-emerald-600 relative">
            <img 
              src={plant.image} 
              alt={plant.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <button
              onClick={onBack}
              className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-lg"
            >
              ←
            </button>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h1 className="text-4xl font-bold mb-2 drop-shadow-lg">{plant.name}</h1>
              <p className="text-lg opacity-90 drop-shadow">{plant.type}</p>
            </div>
            <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium ${getHealthColor(plant.health)} bg-white shadow-lg`}>
              {plant.health}
            </span>
          </div>
          
          <div className="p-6">
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => onDelete(plant.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium"
              >
                <Trash2 className="w-4 h-4" />
                Delete Plant
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Thermometer className={`w-6 h-6 ${getTempColor(plant.temp)}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Temperature</h3>
                    <p className={`text-3xl font-bold ${getTempColor(plant.temp)}`}>
                      {plant.temp}°F
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getTempColor(plant.temp).replace('text', 'bg')}`}
                    style={{ width: `${(plant.temp / 100) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Droplets className={`w-6 h-6 ${getHumidityColor(plant.humidity)}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">Humidity</h3>
                    <p className={`text-3xl font-bold ${getHumidityColor(plant.humidity)}`}>
                      {plant.humidity}%
                    </p>
                  </div>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getHumidityColor(plant.humidity).replace('text', 'bg')}`}
                    style={{ width: `${plant.humidity}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-yellow-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-semibold text-gray-800">Light</h4>
                </div>
                <p className="text-gray-700">{plant.light}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Water Status</h4>
                </div>
                <p className="text-gray-700">{plant.waterLevel}</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-800">Last Watered</h4>
                </div>
                <p className="text-gray-700">{plant.lastWatered}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm text-gray-600">Live data from Room Alert sensors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetail;
