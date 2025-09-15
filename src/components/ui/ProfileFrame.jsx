import Image from 'next/image';
import React from 'react'

const ProfileFrame = ({ name, designation, image }) => {
  return (
    <div className="w-50 h-75  sm:w-70 sm:h-105 bg-white mx-auto p-2 rounded-sm overflow-hidden -rotate-2 shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-0">
      <div className="w-full h-60  sm:h-90">
        <Image
          src={image}
          alt={name}
          width={80}
          height={100}
          className="passport-image"
          loading="eager"
          quality={100}
        />
      </div>
      <p className="text-sm font-medium capitalize pt-2 text-black">{name}</p>
      <p className="text-xs font-normal text-gray-600">{designation}</p>
    </div>
  );
};

export default ProfileFrame
