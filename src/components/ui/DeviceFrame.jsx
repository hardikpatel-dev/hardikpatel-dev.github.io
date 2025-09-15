import Image from "next/image";

export default function DeviceFrame({ type, src }) {
  let frameClass = "";

  if (type === "mobile") {
    frameClass = "w-28 h-58";
  } else if (type === "desktop") {
    frameClass = "w-85 h-52 ";
  } 

  return (
    <div
      className={`flex overflow-hidden items-center justify-center bg-gray-400 rounded-2xl border-5 border-current shadow-md lg:shadow-lg transition-all duration-300 ${frameClass} ${
        type == "mobile"
          ? "lg:-rotate-2 translate-y-[-4px]"
          : "lg:rotate-2 translate-y-[4px]"
      }`}
    >
      {src && (
        <img
        width={85}
        height={52}
          src={src}
          alt={`${type} mockup`}
          className="w-full h-full object-cover rounded-lg"
        />
      )}
    </div>
  );
}
