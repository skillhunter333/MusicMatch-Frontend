// import { useState } from "react";
// import { HiOutlineArrowRight } from "react-icons/hi";

// const ProfileModal = ({ user, children }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const openModal = () => {
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   return (
//     <>
//       {children ? (
//         <span className="cursor-pointer" onClick={openModal}>
//           {children}
//         </span>
//       ) : (
//         <button
//           className="flex items-center justify-center focus:outline-none"
//           onClick={openModal}
//         >
//           <HiOutlineArrowRight className="w-6 h-6" />
//         </button>
//       )}
//       {isOpen && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="absolute inset-0 bg-black opacity-75"></div>
//           <div className="relative z-10 w-full max-w-lg p-6 bg-white rounded-lg">
//             <h1 className="text-4xl font-bold text-center">
//               {user.name}
//             </h1>
//             <button
//               className="absolute top-4 right-4 text-gray-500 focus:outline-none"
//               onClick={closeModal}
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 ></path>
//               </svg>
//             </button>
//             <div className="flex flex-col items-center justify-between mt-6">
//               <img
//                 className="w-48 h-48 rounded-full"
//                 src={user.imgUrl}
//                 alt={user.firstName}
//               />
//               <p className="text-lg font-medium">{`Email: ${user.email}`}</p>
//             </div>
//             <div className="flex justify-center mt-6">
//               <button
//                 className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
//                 onClick={closeModal}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ProfileModal;
