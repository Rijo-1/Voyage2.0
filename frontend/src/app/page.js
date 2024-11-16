import Image from "next/image";
import background from "./media/background.gif"

export default function Home() {
  return (
    <>
      <Image className="h-lvh w-lvw" src={background} alt="bg"/>
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-45"></div>
    </>
  );
}
