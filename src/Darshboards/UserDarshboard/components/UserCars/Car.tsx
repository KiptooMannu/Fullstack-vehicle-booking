// import React from 'react'

// const car ={
//     name: 'car',
//     image_url: 'http://',
//     plate_number:'10',
//     status: 200,
//     price: 100



// }

// function Car() {
//   return (
//     <div className="bg-white shadow-md p-4 md:flex-col sm:h-screen">
//       <h2 className="text-xl font-semibold text-center sm:text-end sm:me-24 mt-6">
//         {car.name}
//       </h2>
//       <div className="mt-4 flex flex-col sm:flex-row">
//         <img
//           src={car.image_url}
//           alt={car.name}
//           className=" sm:w-80 sm:h-80 w-56 h-56 object-contain mx-auto"
//         />
//         <div className="flex-row me-5 ">
//           <div className="bg-gray-50 mt-2 flex items-center justify-center">
//             <table className="w-60 border-collapse border-black text-sm items-center">
//               <tbody>
//                 <tr className="p-2">
//                   <td className="p-2">Car Model</td>
//                   <td className="p-2 pe-3 text-right">
//                     {model.name}
//                   </td>
//                 </tr>
//                 <tr className="p-2 bg-gray-300">
//                   <td className="p-2">Plate number:</td>
//                   <td className="p-2 pe-3 text-right">{car.plate_number}</td>
//                 </tr>
//                 <tr className="py-1">
//                   <td className="p-2 ">Price</td>
//                   <td className="p-2  pe-3 text-right">
//                     {car.price}
//                     /day
//                   </td>
//                 </tr>
//                 <tr className="py-1 bg-gray-300">
//                   <td className="p-2">City:</td>
//                   <td className="p-2 pe-3 text-right">{car.city}</td>
//                 </tr>
//                 <tr className="py-1">
//                   <td className="p-2">Status:</td>
//                   <td className="p-2 pe-3 text-right">
//                     {car.status ? 'Available' : 'Unavailable'}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           <Link
//             to={car.status ? `/reservations/${car.id}` : '#'}
//             className={`bg-primary hover:bg-lime-400 hover:text-gray-500 text-white mt-4 p-2 m-1 rounded-lg text-sm flex mx-auto items-center justify-center max-w-fit ${
//               !car.status   ? 'opacity-50 cursor-not-allowed' : ''
//             }`}
//             onClick={(e) => {
//               if (!car.status) {
//                 e.preventDefault();
//               }
//             }}
//           >
//             <FiCalendar className="mr-2" />
//             Reserve
//           </Link>
//         </div>
//       </div>
//       <Link
//         to="/cars"
//         className="bg-primary hover:bg-lime-400 hover:text-gray-500 text-white mt-4 px-2 rounded-e-full p-1 md:ps-6 text-sm items-end"
//       >
//         <FontAwesomeIcon icon={faCaretLeft} />
//       </Link>
//     </div>
//   );
// }

// export default Car
