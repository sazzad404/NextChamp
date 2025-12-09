import React, { useContext } from "react";
import { motion } from "framer-motion";
import bgImage from "../../assets/loginBG.jpg";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser, googleAuthProvider } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // -------------------------
  // HANDLE FORM SUBMIT
  // -------------------------
  const onSubmit = async (data) => {
    try {
      // 1 Create user
      await createUser(data.email, data.password);

      const profileImg = data.photo[0];
      const formData = new FormData();
      formData.append("image", profileImg);

      //  Upload image
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      );
      const photoURL = res.data.data.display_url;
      console.log("after image upload", photoURL);

      // Update user profile
      await updateUser({
        displayName: data.name,
        photoURL: photoURL,
      });
      console.log("user profile Updated");

      // 4️⃣ Save user to MongoDB
      const user = {
        name: data.name,
        email: data.email,
        photoURL: photoURL,
      };
      await axios.post("http://localhost:3000/users", user);

      // Success feedback
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      navigate("/home");
    } catch (err) {
      console.log(err);
      Swal.fire("Error", "Registration failed!", "error");
    }
  };

  // -------------------------
  // GOOGLE AUTH
  // -------------------------
  const handleGoogleAuth = async () => {
    try {
      // 1️⃣ Google Auth login
      const result = await googleAuthProvider();
      const loggedUser = result.user;

      // 2️⃣ Prepare user data for DB
      const userForDB = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        photoURL: loggedUser.photoURL,
        role: "user", // default role
      };

      // 3️⃣ Save to DB (upsert)
      await axios.post("http://localhost:3000/users", userForDB);

      // 4️⃣ Feedback & navigate
      Swal.fire("Success!", "Logged in with Google!", "success");
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
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* FILE IMAGE UPLOAD */}
          <div>
            <input
              type="file"
              accept="image/*"
              className="w-full rounded bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 file:bg-gray-700 file:border-none file:mr-3 file:px-4 file:py-2"
              {...register("photo")}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-orange-500 hover:bg-orange-700 rounded font-semibold mt-2 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center justify-center text-gray-400">
          <span className="border-b border-gray-500 w-1/5"></span>
          <span className="mx-2">OR</span>
          <span className="border-b border-gray-500 w-1/5"></span>
        </div>

        {/* GOOGLE SIGN IN */}
        <button
          onClick={handleGoogleAuth}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition mb-4"
        >
          Sign in with Google
        </button>

        <p className="text-gray-400 text-center text-sm mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
