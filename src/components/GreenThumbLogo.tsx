import React from 'react';
import { Leaf } from 'lucide-react';

interface GreenThumbLogoProps {
  size?: 'small' | 'medium' | 'large';
}

const GreenThumbLogo: React.FC<GreenThumbLogoProps> = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };
  
  return (
    <div className={`${sizes[size]} relative`}>
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl transform rotate-12"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center">
        <Leaf className="w-2/3 h-2/3 text-white" strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default GreenThumbLogo;
