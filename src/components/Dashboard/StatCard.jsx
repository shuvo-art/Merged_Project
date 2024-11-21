import React from 'react';

const StatCard = ({
  icon, // Icon to display
  currency = '', // Optional currency symbol with default value
  value, // Main statistic value
  description, // Description text
  growth, // Optional growth percentage
  growthIcon, // Optional growth icon
}) => {
  return (
    <div className="flex items-center justify-center px-6 py-14 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 gap-10">
      {/* Icon Section */}
      <div className="text-4xl text-gray-500">{icon}</div>

      {/* Text and Details Section */}
      <div className="text-right flex items-center flex-col justify-center">
        {/* Value and Growth Section */}
        <div className="flex items-end gap-2">
          <h3 className="text-2xl font-bold text-gray-800">
            <span className="text-[#8CAB91]">{currency}</span> {value}
          </h3>
          {growth && (
            <p className="text-sm text-[#8CAB91] flex flex-col items-center justify-end gap-1">
              {growthIcon && <span>{growthIcon}</span>}
              <span>{growth}</span>
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-base text-[#8CAB91]">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
