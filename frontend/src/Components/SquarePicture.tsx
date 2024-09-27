import React from 'react';

interface SquarePictureWithLabelProps {
  label: string;
  imageUrl: string;
}

function SquarePictureWithLabel({ label, imageUrl }: SquarePictureWithLabelProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Square image */}
      <img 
        src={imageUrl}
        alt={label}
        className="CircularPicture shadow-md rounded-lg object-cover"
      />
      
      {/* Label */}
      <p className="mt-2 text-center text-lg font-semibold">{label}</p>
    </div>
  );
}

export default SquarePictureWithLabel;