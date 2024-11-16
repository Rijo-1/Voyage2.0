// import Image from "next/image";
// import background from "./media/background.gif";

// export default function Home() {
//   return (
//     <>
//       <div className="relative">
//         <Image
//           className="absolute h-screen w-screen object-cover"
//           src={background}
//           alt="bg"
//         />
//         <div className="absolute inset-0 bg-black opacity-15"></div>
//         <h1 className="absolute flex items-center inset-0 top-80 justify-center text-slate-700 text-8xl sm:text-8xl md:text-11xl font-semibold font-serif">
//           Voyage
//         </h1>
//         <div className="absolute left-1/2 top-96 transform -translate-x-1/2 mt-12 flex space-x-8">
//           <button className="px-6 py-3 bg-slate-600 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-medium hover:bg-slate-800 transition-all">
//             Login
//           </button>
//           <button className="px-6 py-3 bg-slate-600 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-medium hover:bg-slate-800 transition-all">
//             Signup
//           </button>
//         </div>
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
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white fixed w-full z-10">
          <div className="text-3xl font-bold font-serif cursor-pointer">
            Voyage
          </div>
          <ul className="flex items-center space-x-6 text-lg">
          <div className="relative group">
              <button className="hover:text-slate-400 cursor-pointer">
                Contact Us
              </button>
              <div className="absolute hidden group-hover:block bg-slate-700 text-white py-2 px-4 rounded shadow-md mt-2 mr-5">
                <p>Email:contact@voyage.com</p>
                <p>Phone:9986270733</p>
              </div>
            </div>
            <li className="hover:text-slate-400 cursor-pointer">About</li>

            <li className="hover:text-slate-400 cursor-pointer">Services</li>
            
          </ul>
        </nav>

        
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
