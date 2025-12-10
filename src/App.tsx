import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import GardenSelection from './components/GardenSelection';
import PlantSelection from './components/PlantSelection';
import PlantDetail from './components/PlantDetail';
import { Garden, Plant, PlantsMap, NewPlantForm } from './types';
import { MOCK_GARDENS, MOCK_PLANTS } from './constants/mockData';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedGarden, setSelectedGarden] = useState<Garden | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [gardens, setGardens] = useState<Garden[]>(MOCK_GARDENS);
  const [plants, setPlants] = useState<PlantsMap>(MOCK_PLANTS);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedGarden(null);
    setSelectedPlant(null);
  };

  const handleGardenSelect = (garden: Garden) => {
    setSelectedGarden(garden);
    setSelectedPlant(null);
  };

  const handleBack = () => {
    if (selectedPlant) {
      setSelectedPlant(null);
    } else if (selectedGarden) {
      setSelectedGarden(null);
    }
  };

  const handleAddGarden = (name: string) => {
    const newGarden: Garden = {
      id: Math.max(...gardens.map(g => g.id)) + 1,
      name,
      plantCount: 0
    };
    setGardens([...gardens, newGarden]);
    setPlants({ ...plants, [newGarden.id]: [] });
  };

  const handleDeleteGarden = (gardenId: number) => {
    if (window.confirm('Are you sure you want to delete this garden?')) {
      setGardens(gardens.filter(g => g.id !== gardenId));
      const newPlants = { ...plants };
      delete newPlants[gardenId];
      setPlants(newPlants);
    }
  };

  const handleUpdateGarden = (updatedGarden: Garden) => {
    setGardens(gardens.map(g => g.id === updatedGarden.id ? updatedGarden : g));
    if (selectedGarden?.id === updatedGarden.id) {
      setSelectedGarden(updatedGarden);
    }
  };

  const handleAddPlant = (newPlant: NewPlantForm) => {
    if (selectedGarden) {
      const plant: Plant = {
        id: Math.max(...Object.values(plants).flat().map(p => p.id)) + 1,
        name: newPlant.name,
        type: newPlant.type,
        temp: 72,
        humidity: 60,
        light: 'Medium',
        waterLevel: 'Good',
        lastWatered: 'Just now',
        health: 'Good',
        image: newPlant.image || 'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop'
      };
      
      const updatedPlants = { ...plants };
      updatedPlants[selectedGarden.id] = [...(updatedPlants[selectedGarden.id] || []), plant];
      setPlants(updatedPlants);
      
      const updatedGardens = gardens.map(g => 
        g.id === selectedGarden.id ? { ...g, plantCount: g.plantCount + 1 } : g
      );
      setGardens(updatedGardens);
      setSelectedGarden(updatedGardens.find(g => g.id === selectedGarden.id) || null);
    }
  };

  const handleDeletePlant = (plantId: number) => {
    if (selectedGarden && window.confirm('Are you sure you want to delete this plant?')) {
      const updatedPlants = { ...plants };
      updatedPlants[selectedGarden.id] = updatedPlants[selectedGarden.id].filter(p => p.id !== plantId);
      setPlants(updatedPlants);
      
      const updatedGardens = gardens.map(g => 
        g.id === selectedGarden.id ? { ...g, plantCount: g.plantCount - 1 } : g
      );
      setGardens(updatedGardens);
      setSelectedGarden(updatedGardens.find(g => g.id === selectedGarden.id) || null);
      setSelectedPlant(null);
    }
  };

  // Login Screen
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Garden Selection Screen
  if (!selectedGarden) {
    return (
      <GardenSelection
        gardens={gardens}
        onSelectGarden={handleGardenSelect}
        onAddGarden={handleAddGarden}
        onDeleteGarden={handleDeleteGarden}
        onUpdateGarden={handleUpdateGarden}
        onLogout={handleLogout}
      />
    );
  }

  // Plant Selection Screen
  if (!selectedPlant) {
    const gardenPlants = plants[selectedGarden.id] || [];
    return (
      <PlantSelection
        garden={selectedGarden}
        plants={gardenPlants}
        onBack={handleBack}
        onSelectPlant={setSelectedPlant}
        onAddPlant={handleAddPlant}
      />
    );
  }

  // Plant Detail Screen
  return (
    <PlantDetail
      plant={selectedPlant}
      onBack={handleBack}
      onDelete={handleDeletePlant}
    />
  );
};

export default App;
