// import { useState } from "react";
// import api from "../config/Api";
// import "./Auth.css";

// function Register({ switchToLogin }) {

//   const [username,setUsername] = useState("");
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");

//   const handleRegister = async () => {
//     try {
//       await api.post("/api/users/register",{
//         username,
//         email,
//         password
//       });

//       alert("Registration Successful");
//       switchToLogin();

//     } catch (error) {
//       alert("Registration Failed");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">

//         <h2>Create Account</h2>
//         <p>Register your account</p>

//         <input
//           type="text"
//           placeholder="Full Name"
//           value={username}
//           onChange={(e)=>setUsername(e.target.value)}
//         />

//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e)=>setPassword(e.target.value)}
//         />

//         <button onClick={handleRegister}>
//           Register
//         </button>

//         <p>
//           Already have an account?
//           <span onClick={switchToLogin}>
//             Login
//           </span>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Register;