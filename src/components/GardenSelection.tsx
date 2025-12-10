import React, { useState } from 'react';
import { Leaf, Plus, Trash2, Settings } from 'lucide-react';
import GreenThumbLogo from './GreenThumbLogo';
import { Garden } from '@/types';

interface GardenSelectionProps {
  gardens: Garden[];
  onSelectGarden: (garden: Garden) => void;
  onAddGarden: (name: string) => void;
  onDeleteGarden: (gardenId: number) => void;
  onUpdateGarden: (garden: Garden) => void;
  onLogout: () => void;
}

const GardenSelection: React.FC<GardenSelectionProps> = ({
  gardens,
  onSelectGarden,
  onAddGarden,
  onDeleteGarden,
  onUpdateGarden,
  onLogout
}) => {
  const [showAddGarden, setShowAddGarden] = useState(false);
  const [newGardenName, setNewGardenName] = useState('');
  const [editingGarden, setEditingGarden] = useState<Garden | null>(null);
  const [deviceId, setDeviceId] = useState('');
  const [sensorName, setSensorName] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  const handleAddGarden = () => {
    if (newGardenName.trim()) {
      onAddGarden(newGardenName);
      setNewGardenName('');
      setShowAddGarden(false);
    }
  };

  const handleOpenConfig = (garden: Garden, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingGarden(garden);
    setDeviceId(garden.roomAlertConfig?.deviceId || '');
    setSensorName(garden.roomAlertConfig?.sensorName || '');
    setDeviceModel(garden.roomAlertConfig?.model || '');
    setSerialNumber(garden.roomAlertConfig?.serialNumber || '');
  };

  const handleSaveConfig = () => {
    if (editingGarden) {
      const updatedGarden: Garden = {
        ...editingGarden,
        roomAlertConfig: deviceId.trim() ? {
          deviceId: deviceId.trim(),
          sensorName: sensorName.trim() || 'Room Alert Sensor',
          model: deviceModel.trim() || undefined,
          serialNumber: serialNumber.trim() || undefined
        } : undefined
      };
      onUpdateGarden(updatedGarden);
      setEditingGarden(null);
      setDeviceId('');
      setSensorName('');
      setDeviceModel('');
      setSerialNumber('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GreenThumbLogo size="medium" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">My Gardens</h1>
                <p className="text-gray-600">Select a garden to view plants</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gardens.map((garden) => (
            <div key={garden.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
              <button
                onClick={() => onSelectGarden(garden)}
                className="w-full p-6 text-left"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{garden.name}</h3>
                <p className="text-gray-600">{garden.plantCount} plants</p>
                {garden.roomAlertConfig && (
                  <div className="mt-2 inline-block bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-medium">
                    Room Alert Connected
                  </div>
                )}
              </button>
              <div className="px-6 pb-4 flex gap-2">
                <button
                  onClick={(e) => handleOpenConfig(garden, e)}
                  className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Configure
                </button>
                <button
                  onClick={() => onDeleteGarden(garden.id)}
                  className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
          
          <button
            onClick={() => setShowAddGarden(true)}
            className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-dashed border-green-300 rounded-xl p-6 hover:border-green-500 transition-all text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Plus className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Add Garden</h3>
            <p className="text-gray-600">Create a new garden</p>
          </button>
        </div>

        {showAddGarden && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Garden</h2>
              <input
                type="text"
                value={newGardenName}
                onChange={(e) => setNewGardenName(e.target.value)}
                placeholder="Garden name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddGarden}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Add Garden
                </button>
                <button
                  onClick={() => {
                    setShowAddGarden(false);
                    setNewGardenName('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {editingGarden && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Configure Room Alert</h2>
              <p className="text-gray-600 mb-4">
                Connect your Room Alert device to display live temperature and humidity data for <strong>{editingGarden.name}</strong>.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device Model
                </label>
                <select
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Model (Optional)</option>
                  <option value="RA3">Room Alert 3 (RA3)</option>
                  <option value="RA12S">Room Alert 12S</option>
                  <option value="RA32E">Room Alert 32E</option>
                  <option value="RA4E">Room Alert 4E</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number (Optional)
                </label>
                <input
                  type="text"
                  value={serialNumber}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="e.g., RA3E-A46074"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Device ID / MAC Address *
                </label>
                <input
                  type="text"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="e.g., RA3E-A46074 or 00:80:A3:A4:60:74"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Serial number, MAC address, or UUID from your device
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Friendly Name (Optional)
                </label>
                <input
                  type="text"
                  value={sensorName}
                  onChange={(e) => setSensorName(e.target.value)}
                  placeholder="e.g., Indoor Garden Sensor"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveConfig}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Save Configuration
                </button>
                <button
                  onClick={() => {
                    setEditingGarden(null);
                    setDeviceId('');
                    setSensorName('');
                    setDeviceModel('');
                    setSerialNumber('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800 font-medium mb-2">Quick Setup - Available Devices:</p>
                
                <div className="mb-3 pb-3 border-b border-blue-200">
                  <p className="text-xs text-blue-700 font-semibold">RA3E Device</p>
                  <p className="text-xs text-blue-700">Serial: RA3E-A46074</p>
                  <p className="text-xs text-blue-700">MAC: 00:80:A3:A4:60:74</p>
                  <button
                    onClick={() => {
                      setDeviceModel('RA3');
                      setSerialNumber('RA3E-A46074');
                      setDeviceId('RA3E-A46074');
                      setSensorName('RA3 Sensor');
                    }}
                    className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Use This Device
                  </button>
                </div>

                <div>
                  <p className="text-xs text-blue-700 font-semibold">RA12S Device</p>
                  <p className="text-xs text-blue-700">Serial: RA12S-703DEF</p>
                  <p className="text-xs text-blue-700">MAC: 50:62:55:70:3D:EF</p>
                  <button
                    onClick={() => {
                      setDeviceModel('RA12S');
                      setSerialNumber('RA12S-703DEF');
                      setDeviceId('RA12S-703DEF');
                      setSensorName('RA12S Sensor');
                    }}
                    className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Use This Device
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GardenSelection;
