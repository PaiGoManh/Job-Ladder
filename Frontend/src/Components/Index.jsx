


import React from 'react';
import './Index.css'; // Importing the CSS file

const Index = () => {
  const sliderItems = [
    "/src/Images/NOTIFICATIONS AND SAVED JOBS LISTING.jpg",
    "/src/Images/DAD.jpg",
    "/src/Images/Tuned(1).jpg",
    "/src/Images/imagejob2.jpg",
    "/src/Images/Tuned(3).jpg",
    "/src/Images/Tuned(4).jpg",
    "/src/Images/DAD(2).jpg",
    "/src/Images/Tuned.jpg",
    "/src/Images/JOB LADDER.jpg",
  ];

  return (
    <div>
      <header className="bg-blue-100 text-black">
        {/* //navbar */}
        <nav className="bg-blue-600 flex justify-between items-center py-4 px-6">
          <img
            className="w-[200px] h-[200px]"
            src="/src/Images/JOB LADDER.jpg"
            alt="Job Ladder Logo"
          />
          <a
            href="#"
            className="animate-bounce text-8xl font-extrabold text-white"
          >
            JOB LADDER
          </a>
          <ul className="flex space-x-10 items-center">
            <li>
              <a
                href="/about"
                className="text-white font-extrabold text-xl hover:underline"
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="animate-pulse text-white font-extrabold text-xl hover:underline"
              >
                LOGIN
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="animate-pulse font-extrabold text-white text-xl"
              >
                JOIN
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main className="text-center mt-8">
        {/* <h1 className="text-4xl font-bold text-gray-800 animate-slideIn">
          WELCOME TO JOB LADDER
        </h1> */}
        <p className="mt-4 mb-8 text-2xl text-blue-900 r ">
        JOB LADDER IS A COMPREHENSIVE JOB RECRUITMENT PLATFORM DESIGNED TO STREAMLINE THE HIRING PROCESS FOR BOTH EMPLOYERS AND JOB SEEKERS.

        </p>

        <section className="mt-12 banner">
          <div className="slider" style={{ '--quantity': sliderItems.length }}>
            {sliderItems.map((src, index) => (
              <div
                className="item"
                style={{ '--position': index + 1 }}
                key={index}
              >
                <img src={src} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white mt-12 py-6">
        <div className="flex justify-between px-10">
          <p className="text-sm">© MANEESH@KBA.in OCT-24-2024</p>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:underline">
                KBA Project
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Index;

// import React from 'react';
// import './Index.css'; // Importing the CSS file

// const Index = () => {
//   const sliderItems = [
//     "/src/",
//     "/src/Images/NOTIFICATIONS AND SAVED JOBS LISTING.jpg",
//     "/src/Images/DAD.jpg",
//     "/src/Images/Tuned(1).jpg",
//     "/src/Images/imagejob2.jpg",
//     "/src/Images/Tuned(3).jpg",
//     "/src/Images/Tuned(4).jpg",
//     "/src/Images/DAD(2).jpg",
//     "/src/Images/Tuned.jpg",
//     "/src/Images/JOB LADDER.jpg",
//   ];

//   return (
//     <div>
//       <header className="bg-blue-100 text-black">
//         <nav className="bg-blue-600 flex justify-between items-center py-4 px-6">
//           <img
//             className="w-40 h-24"
//             src="/src/Images/JOB LADDER.jpg"
//             alt="Job Ladder Logo"
//           />
//           <a
//             href="#"
//             className="animate-bounce text-4xl font-extrabold text-white"
//           >
//             JOB LADDER
//           </a>
//           <ul className="flex space-x-10 items-center">
//             <li>
//               <a
//                 href="/"
//                 className="text-white font-extrabold text-xl hover:underline"
//               >
//                 ABOUT
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/login"
//                 className="text-white font-extrabold text-xl hover:underline"
//               >
//                 LOGIN
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/signup"
//                 className="animate-pulse text-white text-xl"
//               >
//                 JOIN
//               </a>
//             </li>
//           </ul>
//         </nav>
//       </header>

//       <main className="text-center mt-8">
//         <h1 className="text-4xl font-bold text-gray-800 animate-slideIn">
//           WELCOME TO JOB LADDER
//         </h1>
//         <p className="mt-4 text-xl text-blue-900">
//           Job Ladder is a comprehensive job recruitment platform designed to
//           streamline the hiring process for both employers and job seekers.
//         </p>

//         <section className="mt-12 banner">
//           <div className="slider" style={{ '--quantity': sliderItems.length }}>
//             {sliderItems.map((src, index) => (
//               <div
//                 className="item"
//                 style={{ '--position': index + 1 }}
//                 key={index}
//               >
//                 <img src={src} alt={`Slide ${index + 1}`} />
//               </div>
//             ))}
//           </div>
//         </section>
//       </main>

//       <footer className="bg-blue-600 text-white mt-12 py-6">
//         <div className="flex justify-between px-10">
//           <p className="text-sm">© MANEESH@KBA.in OCT-24-2024</p>
//           <ul className="flex space-x-6">
//             <li>
//               <a href="/" className="hover:underline">
//                 KBA Project
//               </a>
//             </li>
//             <li>
//               <a href="/" className="hover:underline">
//                 Privacy Policy
//               </a>
//             </li>
//             <li>
//               <a href="/" className="hover:underline">
//                 Terms & Conditions
//               </a>
//             </li>
//           </ul>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Index;


// // import React from 'react';



// // const Index = () => {
// //   return (
// //     <>
// //       <div>
// //         <header className="bg-blue-100 text-black py-6">
// //           <nav className=" bg-blue-600 mx-auto flex justify-between items-center">
// //             <img
// //               style={{ width: '200px', height: '150px', paddingLeft: '50px' }}
// //               src="/src/Images/JOB LADDER.jpg"
// //               alt="Job Ladder"
// //             />
// //             <a
// //               href="#"
// //               className="ani animate-bounce mr-96 text-5xl font-extrabold text-white"
// //             >
// //               JOB LADDER
// //             </a>
// //             <ul className="flex items-center">
// //               <li className="mr-4">
// //                 <a
// //                   href="/"
// //                   className="font-extrabold text-3xl mr-28 hover:border-blue-700"
// //                 >
// //                   ABOUT
// //                 </a>
// //               </li>
// //               <li className="mr-4">
// //                 <a
// //                   href="/login"
// //                   className="font-extrabold text-3xl mr-28 hover:border-blue-700"
// //                 >
// //                   LOGIN JOB LADDER
// //                 </a>
// //               </li>
// //               <li>
// //                 <a
// //                   href="/signup"
// //                   className="animate-pulse text-3xl mr-20"
// //                 >
// //                   JOIN JOB LADDER
// //                 </a>
// //               </li>
// //             </ul>
// //           </nav>

// //           <div>
// //             <h1 className="text-center font-extrabold text-5xl text-gray-600 mt-10">
// //               WELCOME TO JOB LADDER
// //             </h1>
// //             <br />
// //             <h1 className="text-center font-extrabold text-3xl text-blue-900 mt-10">
// //               Job Ladder is a comprehensive job recruitment platform designed to
// //               streamline the hiring process for both employers and job seekers.
// //             </h1>
// //           </div>

// //           <div>
// //             <h1 className="text-center font-extrabold text-3xl">
// //               FEATURES ADDED TO JOB LADDER
// //             </h1>
// //             <div className=".banner">
// //     <img className="mb-10" src="/src/Images/saurav-mahto-ijWb7URJQyo-unsplash.jpg"  alt=""/>
// //     <div className=".slider" style={{quantity: '10'}} >
// //         <div className="item" style={{position: '1'}}><img src="/src/Images/DAD(1).jpg" alt=""/></div>
// //         <div className="item" style={{position: '2'}}><img src="/src/Images/NOTIFICATIONS AND SAVED JOBS LISTING.jpg" alt=""/></div>
// //         <div className="item" style={{position: '3'}}><img src="/src/Images/DAD.jpg" alt=""/></div>
// //         <div className="item" style={{position: '4'}}><img src="/src/Images/Tuned(1).jpg" alt=""/></div>
// //         <div className="item" style={{position: '5'}}><img src="/src/Images/imagejob2.jpg" alt=""/></div>
// //         <div className="item" style={{position: '6'}}><img src="/src/Images/Tuned(3).jpg" alt=""/></div>
// //         <div className="item" style={{position: '7'}}><img src="/src/Images/Tuned(4).jpg" alt=""/></div>
// //         <div className="item" style={{position: '8'}}><img src="/src/Images/DAD(2).jpg" alt=""/></div>
// //         <div className="item" style={{position: '9'}}><img src="/src/Images/Tuned.jpg" alt=""/></div>
// //         <div className="item" style={{position: '10'}}><img src="/src/Images/JOB LADDER.jpg" alt=""/></div>
// //     </div>
// // </div>
// //           </div>

// //           <div className="bg-blue-200 mt-10">
// //             <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row bg-blue-600 pl-4 pr-4">
// //               <p className="text-sm text-white">
// //                 © MANEESH@KBA.in OCT-24-2024
// //               </p>
// //               <ul className="flex flex-col mb-3 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row">
// //                 <li>
// //                   <a
// //                     href="/"
// //                     className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
// //                   >
// //                     KBA Project
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="/"
// //                     className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
// //                   >
// //                     Privacy Policy
// //                   </a>
// //                 </li>
// //                 <li>
// //                   <a
// //                     href="/"
// //                     className="text-sm text-white transition-colors duration-300 hover:text-deep-purple-accent-400"
// //                   >
// //                     Terms &amp; Conditions
// //                   </a>
// //                 </li>
// //               </ul>
// //             </div>
// //           </div>
// //         </header>
// //       </div>
// //     </>
// //   );
// // };

// // export default Index;
