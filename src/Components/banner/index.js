import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillPlayCircle } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import b1 from "../../../public/p1.jpg" 

export default function Banner({ medias }) {


  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={b1}
          alt="Banner"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-800 to-transparent bottom-0 z-20" />
      </div>
      <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold">
        
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5">
      </p>
      <div className="flex space-x-3">
      
      </div>
    </div>
  );
}
