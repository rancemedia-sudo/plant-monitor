import React, { useState } from 'react';
import { Plus, Thermometer, Droplets } from 'lucide-react';
import { Garden, Plant, NewPlantForm } from '@/types';
import { getHealthColor, getTempColor, getHumidityColor } from '@/utils/plantHelpers';
import EnvironmentData from './EnvironmentData';

interface PlantSelectionProps {
  garden: Garden;
  plants: Plant[];
  onBack: () => void;
  onSelectPlant: (plant: Plant) => void;
  onAddPlant: (plant: NewPlantForm) => void;
}

const PlantSelection: React.FC<PlantSelectionProps> = ({
  garden,
  plants,
  onBack,
  onSelectPlant,
  onAddPlant
}) => {
  const [showAddPlant, setShowAddPlant] = useState(false);
  const [newPlant, setNewPlant] = useState<NewPlantForm>({ name: '', type: '', image: '' });

  const handleAddPlant = () => {
    if (newPlant.name.trim() && newPlant.type.trim()) {
      onAddPlant(newPlant);
      setNewPlant({ name: '', type: '', image: '' });
      setShowAddPlant(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
              >
                ←
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{garden.name}</h1>
                <p className="text-gray-600">{plants.length} plants</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddPlant(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Plant
            </button>
          </div>
        </div>

        {/* Live Environment Data from Room Alert */}
        <div className="mb-6">
          <EnvironmentData 
            deviceId={garden.roomAlertConfig?.deviceId}
            sensorName={garden.roomAlertConfig?.sensorName}
            refreshInterval={30000}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <button
                onClick={() => onSelectPlant(plant)}
                className="w-full text-left"
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={plant.image} 
                    alt={plant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{plant.name}</h3>
                      <p className="text-gray-600 text-sm">{plant.type}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(plant.health)} bg-opacity-10`}>
                      {plant.health}
                    </span>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Thermometer className={`w-4 h-4 ${getTempColor(plant.temp)}`} />
                      <span className="text-sm font-medium">{plant.temp}°F</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplets className={`w-4 h-4 ${getHumidityColor(plant.humidity)}`} />
                      <span className="text-sm font-medium">{plant.humidity}%</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {showAddPlant && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Plant</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                  placeholder="Plant name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  value={newPlant.type}
                  onChange={(e) => setNewPlant({ ...newPlant, type: e.target.value })}
                  placeholder="Plant type (e.g., Tropical, Succulent)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="text"
                  value={newPlant.image}
                  onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
                  placeholder="Image URL (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={handleAddPlant}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Add Plant
                </button>
                <button
                  onClick={() => {
                    setShowAddPlant(false);
                    setNewPlant({ name: '', type: '', image: '' });
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantSelection;
