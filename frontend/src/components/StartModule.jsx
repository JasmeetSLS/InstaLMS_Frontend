// src/components/StartModule.jsx
import React from 'react';
import { Play, Clock } from 'lucide-react';

const StartModule = ({ moduleName = 'Chassis', duration = '10mins' }) => {
  return (
    <div className="px-4 mt-4">
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white/90 text-sm font-medium">Start Module</div>
            <div className="text-white text-xl font-bold mt-1">{moduleName}</div>
            <div className="flex items-center gap-2 mt-2">
              <Clock className="w-3 h-3 text-white/80" />
              <span className="text-white/80 text-xs">Duration: {duration}</span>
            </div>
          </div>
          <button className="bg-white text-green-600 px-5 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartModule;