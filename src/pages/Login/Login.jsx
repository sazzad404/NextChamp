import React, { useContext } from "react";
import { motion } from "framer-motion";
import bgImage from "../../assets/loginBG.jpg";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUser, googleAuthProvider } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle Email/Password Login
  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password).then((res) => {
        Swal.fire({
          icon: "success",
          title: "Log In Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        reset();
        navigate("/");
      });
    } catch (err) {
      Swal.fire("Error", "Invalid email or password!", "error");
    }
  };

  // Google Login
  const handleGoogleAuth = async () => {
    try {
      const result = await googleAuthProvider();
      const loggedUser = result.user;

      // Login success alert
      Swal.fire("Success!", "Logged in with Google!", "success");

      // Database POST (optional fail won't affect login)
      try {
        const userForDB = {
          name: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
          role: "user",
        };
        await axios.post("http://localhost:3000/users", userForDB);
      } catch (dbErr) {
        console.log("DB insert error (ignored):", dbErr);
      }

      navigate("/home");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Google login failed!", "error");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md bg-black/80 p-10 rounded-lg shadow-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>

        {/* FORM START */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email or mobile number"
              className="w-full px-4 py-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-700 rounded font-semibold mt-2 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center justify-center text-gray-400">
          <span className="border-b border-gray-500 w-1/5"></span>
          <span className="mx-2">OR</span>
          <span className="border-b border-gray-500 w-1/5"></span>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleAuth}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition mb-4"
        >
          Sign in with Google
        </button>

        {/* Extra Options */}
        <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
          <label className="flex items-center gap-1">
            <input type="checkbox" className="accent-red-600" /> Remember me
          </label>
        </div>

        {/* Signup */}
        <p className="text-gray-400 text-center text-sm">
          New to Next Champ?{" "}
          <Link
            to="/register"
            className="text-white font-semibold hover:underline"
          >
            Sign up now.
          </Link>
        </p>

        <p className="text-gray-500 text-xs mt-4 text-center">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
