import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";

const AddContest = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const selectedDate = watch("deadline");

  const showToast = (msg, icon = "success") => {
    Swal.fire({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
      icon: icon,
      title: msg,
    });
  };

  const onSubmit = (data) => {
    console.log(data);

    const contest = {
      name: data.name,
      price: data.price,
      prize: data.prize,
      type: data.type,
      deadline: data.deadline,
      description: data.description,
      image: data.image,
      instruction: data.instruction,
      creatorEmail: user?.email,
    };

    axiosSecure
      .post("/contests", contest)
      .then((res) => {
        console.log(res);
        if (res.data.insertedId) {
          showToast("Contest Added Successfully! 🎉");
          navigate("/dashboard/my-contests");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    reset();
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 text-white p-8 rounded-2xl shadow-lg border border-gray-700 mt-6">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Add New Contest
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block mb-1">Contest Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 focus:ring focus:ring-indigo-500"
            placeholder="Enter contest name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">Name is required</p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1">Contest Image URL</label>
          <input
            type="text"
            {...register("image", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600"
            placeholder="Image URL"
          />
          {errors.image && (
            <p className="text-red-400 text-sm mt-1">Image is required</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600"
            placeholder="Write contest details..."
            rows="3"
          ></textarea>
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">Description is required</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600"
            placeholder="Entry price"
          />
          {errors.price && (
            <p className="text-red-400 text-sm mt-1">Price is required</p>
          )}
        </div>

        {/* Prize Money */}
        <div>
          <label className="block mb-1">Prize Money</label>
          <input
            type="number"
            {...register("prize", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600"
            placeholder="Prize amount"
          />
          {errors.prize && (
            <p className="text-red-400 text-sm mt-1">Prize money is required</p>
          )}
        </div>

        {/* Task Instructions */}
        <div>
          <label className="block mb-1">Task Instruction</label>
          <textarea
            {...register("instruction", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600"
            placeholder="Write task instructions..."
            rows="3"
          ></textarea>
          {errors.instruction && (
            <p className="text-red-400 text-sm mt-1">
              Instructions are required
            </p>
          )}
        </div>

        {/* Contest Type */}
        <div>
          <label className="block mb-1">Contest Type</label>
          <select
            {...register("type", { required: true })}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600"
          >
            <option value="">Select type</option>
            <option value="design">Design</option>
            <option value="writing">Writing</option>
            <option value="development">Development</option>
            <option value="gaming">Gaming</option>
            <option value="music">Music</option>
          </select>
          {errors.type && (
            <p className="text-red-400 text-sm mt-1">Type is required</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="block mb-1">Deadline</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setValue("deadline", date)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white"
            placeholderText="Select contest deadline"
            dateFormat="dd/MM/yyyy"
          />
          {errors.deadline && (
            <p className="text-red-400 text-sm mt-1">Deadline is required</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
          >
            Add Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContest;
