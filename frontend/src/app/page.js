// import Image from "next/image";
// import background from "./media/background.gif";

// export default function Home() {
//   return (
//     <>
//       <div>
//         <Image
//           className="absolute h-screen w-screen"
//           src={background}
//           alt="bg"
//         />
//         <h1 className="absolute flex left-52 top-52 justify-center text-slate-700 text-4xl sm:text-6xl md:text-9xl font-semibold font-serif">
//           Voyage
//         </h1>
//       <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-15"></div>
//       </div>
//     </>
//   );
// }

import Image from "next/image";
import background from "./media/background.gif";

export default function Home() {
  return (
    <>
      <div className="relative">
        <Image
          className="absolute h-screen w-screen object-cover"
          src={background}
          alt="bg"
        />
        <div className="absolute inset-0 bg-black opacity-15"></div>
        <h1 className="absolute flex items-center inset-0 top-80 justify-center text-slate-700 text-8xl sm:text-8xl md:text-11xl font-semibold font-serif">
          Voyage
        </h1>
        <div className="absolute left-1/2 top-96 transform -translate-x-1/2 mt-12 flex space-x-8">
          <button className="px-6 py-3 bg-slate-600 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-medium hover:bg-slate-800 transition-all">
            Login
          </button>
          <button className="px-6 py-3 bg-slate-600 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-medium hover:bg-slate-800 transition-all">
            Signup
          </button>
        </div>
      </div>
    </>
  );
}
