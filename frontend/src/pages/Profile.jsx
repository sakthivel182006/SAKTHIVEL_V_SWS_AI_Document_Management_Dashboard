// import React, { useEffect, useState } from "react";

// const Profile = () => {

//   const [userData, setUserData] = useState({
//     username: "",
//     userid: "",
//     role: ""
//   });

//   useEffect(() => {
//     const username = localStorage.getItem("username");
//     const userid = localStorage.getItem("userid");
//     const role = localStorage.getItem("role");

//     setUserData({
//       username,
//       userid,
//       role
//     });
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">

//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

//         {/* Profile Header */}
//         <div className="flex flex-col items-center">

//           <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
//             {userData.username?.charAt(0)?.toUpperCase()}
//           </div>

//           <h2 className="text-xl font-semibold">
//             {userData.username}
//           </h2>

//           <p className="text-gray-500 text-sm">
//             {userData.role}
//           </p>

//         </div>

//         {/* Details */}
//         <div className="mt-6 space-y-4">

//           <div className="bg-gray-50 p-3 rounded">
//             <p className="text-sm text-gray-500">User ID</p>
//             <p className="font-medium">{userData.userid}</p>
//           </div>

//           <div className="bg-gray-50 p-3 rounded">
//             <p className="text-sm text-gray-500">Role</p>
//             <p className="font-medium">{userData.role}</p>
//           </div>

//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
//         >
//           Logout
//         </button>

//       </div>

//     </div>
//   );
// };

// export default Profile;