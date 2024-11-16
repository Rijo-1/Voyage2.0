import Image from "next/image";
import background from "./media/background.gif"

export default function Home() {
  return (
    <>
      <Image className=" absolute h-lvh w-lvw" src={background} alt="bg"/>
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-45"></div>
      <h1 className="absolute text-pink-800  text-7xl font-semibold font-serif">Voyage</h1>
    </>
  );
}
