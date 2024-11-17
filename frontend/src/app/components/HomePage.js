// // // import Image from "next/image";
// // // import background from "../media/background.gif";

// // // export default function Home() {
// // //   return (
// // //     <>
// // //       <div className="relative">
// // //         <nav className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white fixed w-full z-10">
// // //           <div className="text-3xl font-bold font-serif cursor-pointer">
// // //             Voyage
// // //           </div>
// // //           <ul className="flex items-center space-x-6 text-lg">
// // //           <div className="relative group">
// // //               <button className="hover:text-slate-400 cursor-pointer">
// // //                 Contact Us
// // //               </button>
// // //               <div className="absolute hidden group-hover:block bg-slate-700 text-white py-2 px-4 rounded shadow-md mt-2 mr-5">
// // //                 <p>Email:contact@voyage.com</p>
// // //                 <p>Phone:9986270733</p>
// // //               </div>
// // //             </div>
// // //             <li className="hover:text-slate-400 cursor-pointer">About</li>

// // //             <li className="hover:text-slate-400 cursor-pointer">Services</li>
            
// // //           </ul>
// // //         </nav>

        
// // //         <Image
// // //           className="absolute h-screen w-screen object-cover"
// // //           src={background}
// // //           alt="bg"
// // //         />
// // //         <div className="absolute inset-0 bg-black opacity-15"></div>
// // //         <h1 className="absolute flex items-center inset-0 top-80 justify-center text-slate-700 text-8xl sm:text-8xl md:text-11xl font-semibold font-serif">
// // //           Voyage
// // //         </h1>
// // //         <div className="absolute left-1/2 top-96 transform -translate-x-1/2 mt-12 flex space-x-8">
// // //           <button className="px-6 py-3 bg-slate-600 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-medium hover:bg-slate-800 transition-all">
// // //             Login
// // //           </button>
// // //           <button className="px-6 py-3 bg-slate-600 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-medium hover:bg-slate-800 transition-all">
// // //             Signup
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // "use client";

// // import Image from "next/image";
// // import background from "../media/background.gif";
// // import { useRouter } from "next/navigation";

// // export default function Home() {
// //   const router = useRouter();

// //   const handleNavigate = (path) => {
// //     router.push(path);
// //   };

// //   return (
// //     <>
// //       <div className="relative">
// //         <nav className="flex justify-between items-center px-6 py-4 bg-slate-800 text-white fixed w-full z-10">
// //           <div className="text-3xl font-bold font-serif cursor-pointer">
// //             Voyage
// //           </div>
// //           <ul className="flex items-center space-x-6 text-lg">
// //             <div className="relative group">
// //               <button className="hover:text-slate-400 cursor-pointer">
// //                 Contact Us
// //               </button>
// //               <div className="absolute hidden group-hover:block bg-slate-700 text-white py-2 px-4 rounded shadow-md mt-2 mr-5">
// //                 <p>Email: contact@voyage.com</p>
// //                 <p>Phone: 9986270733</p>
// //               </div>
// //             </div>
// //             <li className="hover:text-slate-400 cursor-pointer">About</li>
// //             <li className="hover:text-slate-400 cursor-pointer">Services</li>
// //           </ul>
// //         </nav>

// //         <Image
// //           className="absolute h-screen w-screen object-cover"
// //           src={background}
// //           alt="bg"
// //         />
// //         <div className="absolute inset-0 bg-black opacity-15"></div>
// //         <h1 className="absolute flex items-center inset-0 top-80 justify-center text-slate-700 text-8xl sm:text-8xl md:text-11xl font-semibold font-serif">
// //           Voyage
// //         </h1>
// //         <div className="absolute left-1/2 top-96 transform -translate-x-1/2 mt-12 flex space-x-8">
// //           <button
// //             className="px-6 py-3 bg-slate-600 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-medium hover:bg-slate-800 transition-all"
// //             onClick={() => handleNavigate("/login")}
// //           >
// //             Login
// //           </button>
// //           <button
// //             className="px-6 py-3 bg-slate-600 text-white rounded-lg text-lg sm:text-xl md:text-2xl font-medium hover:bg-slate-800 transition-all"
// //             onClick={() => handleNavigate("/signup")}
// //           >
// //             Signup
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }


// "use client";

// import Image from "next/image";
// import background from "../media/background.gif";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Sun, Moon } from 'lucide-react';

// export default function Home() {
//   const router = useRouter();
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const handleNavigate = (path) => {
//     router.push(path);
//   };

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className="min-h-screen gradient-background ${isDarkMode ? 'bg-gray-900' : ''"}>
//       <nav className="flex justify-between items-center px-6 py-4 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80' backdrop-blur-sm fixed w-full z-10">
//         <div className={text-3xl font-bold font-serif cursor-pointer ${isDarkMode ? 'text-white' : 'text-purple-600'}}>
//           Voyage
//         </div>
//         <div className="flex items-center space-x-6">
//           <div className="relative group">
//             <button className={text-lg hover:text-purple-400 transition-colors ${isDarkMode ? 'text-white' : 'text-purple-600'}}>
//               Reach Out
//             </button>
//             <div className={`absolute hidden group-hover:block ${
//               isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//             } py-3 px-6 rounded-lg shadow-xl mt-2 -ml-4 backdrop-blur-sm`}>
//               <p className={mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}}>Email: explore@journey.com</p>
//               <p className={${isDarkMode ? 'text-gray-300' : 'text-gray-600'}}>Phone: (555) 123-4567</p>
//             </div>
//           </div>
//           <button className={text-lg hover:text-purple-400 transition-colors ${isDarkMode ? 'text-white' : 'text-purple-600'}}>
//             Our Story
//           </button>
//           <button className={text-lg hover:text-purple-400 transition-colors ${isDarkMode ? 'text-white' : 'text-purple-600'}}>
//             Experiences
//           </button>
//           <button
//             onClick={toggleDarkMode}
//             className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
//               isDarkMode 
//                 ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
//                 : 'bg-purple-500 text-white hover:bg-purple-400'
//             }`}
//           >
//             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>
//         </div>
//       </nav>

//       <div className="relative h-screen">
//         <Image
//           className="absolute h-screen w-screen object-cover"
//           src={background}
//           alt="bg"
//           priority
//         />
//         <div className={absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-black/30'}}></div>
        
//         <div className="absolute inset-0 flex flex-col items-center justify-center">
//           <h1 className="text-8xl sm:text-8xl md:text-11xl font-bold text-white tracking-wider mb-4">
//             Voyage
//           </h1>
//           <p className="text-xl md:text-2xl text-white mb-12 tracking-wide">
//             Your Journey Begins Here
//           </p>
          
//           <div className="flex space-x-6">
//             <button
//               className={`px-8 py-4 rounded-lg text-lg sm:text-xl md:text-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
//                 isDarkMode 
//                   ? 'bg-purple-600 hover:bg-purple-500 text-white' 
//                   : 'bg-purple-500 hover:bg-purple-400 text-white'
//               }`}
//               onClick={() => handleNavigate("/login")}
//             >
//               Start Planning
//             </button>
//             <button
//               className={`px-8 py-4 rounded-lg text-lg sm:text-xl md:text-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
//                 isDarkMode 
//                   ? 'bg-gray-800 hover:bg-gray-700 text-white' 
//                   : 'bg-white hover:bg-gray-100 text-purple-600'
//               }`}
//               onClick={() => handleNavigate("/signup")}
//             >
//               Begin Your Journey
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import background from "../media/background.gif";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sun, Moon } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNavigate = (path) => {
    router.push(path);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} gradient-background`}>
      <nav className={`flex justify-between items-center px-6 py-4 ${isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm fixed w-full z-10`}>
        <div className={`text-3xl font-bold font-serif cursor-pointer ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>
          Voyage
        </div>
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <button className={`text-lg hover:text-purple-400 transition-colors ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>
              Reach Out
            </button>
            <div className={`absolute hidden group-hover:block ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} py-3 px-6 rounded-lg shadow-xl mt-2 -ml-4 backdrop-blur-sm`}>
              <p className={`mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Email: explore@journey.com</p>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Phone: (555) 123-4567</p>
            </div>
          </div>
          <button className={`text-lg hover:text-purple-400 transition-colors ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>
            Our Story
          </button>
          <button className={`text-lg hover:text-purple-400 transition-colors ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>
            Experiences
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                : 'bg-purple-500 text-white hover:bg-purple-400'
            }`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <div className="relative h-screen">
        <Image
          className="absolute h-screen w-screen object-cover"
          src={background}
          alt="bg"
          priority
        />
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/50' : 'bg-black/30'}`}></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-8xl sm:text-8xl md:text-11xl font-bold text-white tracking-wider mb-4">
            Voyage
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 tracking-wide">
            Your Journey Begins Here
          </p>

          <div className="flex space-x-6">
            <button
              className={`px-8 py-4 rounded-lg text-lg sm:text-xl md:text-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : 'bg-purple-500 hover:bg-purple-400 text-white'
              }`}
              onClick={() => handleNavigate("/login")}
            >
              Start Planning
            </button>
            <button
              className={`px-8 py-4 rounded-lg text-lg sm:text-xl md:text-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                isDarkMode
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-white hover:bg-gray-100 text-purple-600'
              }`}
              onClick={() => handleNavigate("/signup")}
            >
              Begin Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
