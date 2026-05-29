// import { useState } from "react";
// import api from "../config/Api";
// import "./Auth.css";

// function Login({ switchToRegister }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       const response = await api.post("/api/users/login", {
//         email,
//         password
//       });

//       const data = response.data;

//       localStorage.setItem("userid", data.id);
//       localStorage.setItem("username", data.username);
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("role", data.role);

//       alert("Login Successful");
//       window.location.reload();
//     } catch (error) {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">

//         <h2>Welcome Back</h2>
//         <p>Sign in to continue</p>

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

//         <button onClick={handleLogin}>
//           Login
//         </button>

//         <p>
//           Don't have an account?
//           <span onClick={switchToRegister}>
//             Register
//           </span>
//         </p>

//       </div>
//     </div>
//   );
// }

// export default Login;