"use client";

import Link from "next/link";

const RegistrationSuccess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-xl shadow-lg w-96 max-w-md text-center">
        <h2 className="text-3xl font-bold text-blue-500 mb-6">
          Registration Successful!
        </h2>
        <p className="mb-4 text-lg">
          Congratulations! Your registration was successful.
        </p>
        <p>
          Now you can log in to your account and start sharing photos.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-blue-500 hover:underline"
        >
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
