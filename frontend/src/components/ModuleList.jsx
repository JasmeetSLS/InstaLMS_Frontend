// src/components/ModuleList.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const ModuleList = ({ onModuleSelect, selectedModule }) => {
  const modules = [
    { id: 'chassis', name: 'Chassis', duration: '10 mins', icon: '🚗', color: 'bg-purple-500' },
    { id: 'engine', name: 'Engine', duration: '15 mins', icon: '🔧', color: 'bg-blue-500' },
    { id: 'transmission', name: 'Transmission', duration: '12 mins', icon: '⚙️', color: 'bg-green-500' },
    { id: 'safety', name: 'Safety', duration: '8 mins', icon: '🛡️', color: 'bg-red-500' },
  ];

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">One Day Module Consist of</h2>
        <Clock className="w-4 h-4 text-gray-500" />
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleSelect(module.id)}
            className={`flex-shrink-0 px-4 py-3 rounded-xl transition-all ${
              selectedModule === module.id
                ? `${module.color} text-white shadow-lg scale-105`
                : 'bg-white text-gray-700 shadow-sm border border-gray-200'
            }`}
          >
            <div className="text-2xl mb-1">{module.icon}</div>
            <div className="font-semibold text-sm">{module.name}</div>
            <div className={`text-xs mt-1 ${
              selectedModule === module.id ? 'text-white/80' : 'text-gray-500'
            }`}>
              {module.duration}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModuleList;