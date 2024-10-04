interface CircularPictureWithLabelProps {
  label: string;
  imageUrl: string;
}

function CircularPictureWithLabel({ label, imageUrl }: CircularPictureWithLabelProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Circular image */}
      <img 
        src={imageUrl}
        alt={label}
        className="CircularPicture shadow-lg rounded-full object-cover"
      />
      
      {/* Label */}
      <p className="mt-2 text-center text-lg font-semibold">{label}</p>
    </div>
  );
}

export default CircularPictureWithLabel;