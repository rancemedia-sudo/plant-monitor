import { Garden, PlantsMap } from '@/types';

export const MOCK_GARDENS: Garden[] = [
  { id: 1, name: 'Indoor Garden', plantCount: 8 },
  { id: 2, name: 'Greenhouse', plantCount: 4 },
  { id: 3, name: 'Outdoor Garden', plantCount: 3 }
];

export const MOCK_PLANTS: PlantsMap = {
  1: [
    { 
      id: 1, 
      name: 'Monstera Deliciosa', 
      type: 'Tropical', 
      temp: 72, 
      humidity: 65, 
      light: 'Bright Indirect', 
      waterLevel: 'Good', 
      lastWatered: '2 days ago', 
      health: 'Excellent', 
      image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Snake Plant', 
      type: 'Succulent', 
      temp: 70, 
      humidity: 45, 
      light: 'Low', 
      waterLevel: 'Good', 
      lastWatered: '5 days ago', 
      health: 'Good', 
      image: 'https://images.unsplash.com/photo-1593482892290-81f08cb4f7ca?w=400&h=400&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Pothos', 
      type: 'Vine', 
      temp: 73, 
      humidity: 60, 
      light: 'Medium', 
      waterLevel: 'Needs Water', 
      lastWatered: '4 days ago', 
      health: 'Good', 
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Peace Lily', 
      type: 'Tropical', 
      temp: 71, 
      humidity: 70, 
      light: 'Medium', 
      waterLevel: 'Good', 
      lastWatered: '1 day ago', 
      health: 'Excellent', 
      image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop' 
    },
    { 
      id: 5, 
      name: 'Spider Plant', 
      type: 'Tropical', 
      temp: 69, 
      humidity: 55, 
      light: 'Bright Indirect', 
      waterLevel: 'Good', 
      lastWatered: '3 days ago', 
      health: 'Good', 
      image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400&h=400&fit=crop' 
    },
    { 
      id: 6, 
      name: 'Aloe Vera', 
      type: 'Succulent', 
      temp: 75, 
      humidity: 40, 
      light: 'Bright Direct', 
      waterLevel: 'Good', 
      lastWatered: '7 days ago', 
      health: 'Good', 
      image: 'https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400&h=400&fit=crop' 
    },
    { 
      id: 7, 
      name: 'Fiddle Leaf Fig', 
      type: 'Tree', 
      temp: 72, 
      humidity: 65, 
      light: 'Bright Indirect', 
      waterLevel: 'Good', 
      lastWatered: '2 days ago', 
      health: 'Excellent', 
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=400&h=400&fit=crop' 
    },
    { 
      id: 8, 
      name: 'Rubber Plant', 
      type: 'Tree', 
      temp: 74, 
      humidity: 62, 
      light: 'Bright Indirect', 
      waterLevel: 'Good', 
      lastWatered: '3 days ago', 
      health: 'Excellent', 
      image: 'https://images.unsplash.com/photo-1614594737552-c2f9d1f5b90f?w=400&h=400&fit=crop' 
    }
  ],
  2: [
    { 
      id: 9, 
      name: 'Tomato Plant #1', 
      type: 'Vegetable', 
      temp: 78, 
      humidity: 70, 
      light: 'Full Sun', 
      waterLevel: 'Good', 
      lastWatered: '1 day ago', 
      health: 'Excellent', 
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=400&fit=crop' 
    },
    { 
      id: 10, 
      name: 'Basil', 
      type: 'Herb', 
      temp: 76, 
      humidity: 65, 
      light: 'Full Sun', 
      waterLevel: 'Good', 
      lastWatered: '1 day ago', 
      health: 'Good', 
      image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf976e?w=400&h=400&fit=crop' 
    },
    { 
      id: 11, 
      name: 'Pepper Plant', 
      type: 'Vegetable', 
      temp: 79, 
      humidity: 68, 
      light: 'Full Sun', 
      waterLevel: 'Needs Water', 
      lastWatered: '2 days ago', 
      health: 'Good', 
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop' 
    },
    { 
      id: 12, 
      name: 'Cucumber Vine', 
      type: 'Vegetable', 
      temp: 77, 
      humidity: 72, 
      light: 'Full Sun', 
      waterLevel: 'Good', 
      lastWatered: '1 day ago', 
      health: 'Excellent', 
      image: 'https://images.unsplash.com/photo-1604003290853-4b15f2d924cd?w=400&h=400&fit=crop' 
    }
  ],
  3: [
    { 
      id: 13, 
      name: 'Rose Bush', 
      type: 'Flower', 
      temp: 68, 
      humidity: 55, 
      light: 'Full Sun', 
      waterLevel: 'Good', 
      lastWatered: '1 day ago', 
      health: 'Good', 
      image: 'https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400&h=400&fit=crop' 
    },
    { 
      id: 14, 
      name: 'Lavender', 
      type: 'Herb', 
      temp: 70, 
      humidity: 50, 
      light: 'Full Sun', 
      waterLevel: 'Good', 
      lastWatered: '3 days ago', 
      health: 'Excellent', 
      image: 'https://images.unsplash.com/photo-1595959068281-ea63e8ac2f0e?w=400&h=400&fit=crop' 
    },
    { 
      id: 15, 
      name: 'Sunflower', 
      type: 'Flower', 
      temp: 72, 
      humidity: 52, 
      light: 'Full Sun', 
      waterLevel: 'Needs Water', 
      lastWatered: '2 days ago', 
      health: 'Good', 
      image: 'https://images.unsplash.com/photo-1597848212624-e0b25eff7dad?w=400&h=400&fit=crop' 
    }
  ]
};
