// components/upload_modal.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // For redirection

const UploadModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setError("Please select an image.");
      return;
    }

    // Perform the actual upload via POST request
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos/`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("token")}`, // Add your auth token here
      },
      body: formData,
    });

    if (response.ok) {
      setShowModal(false); // Close the modal on success
      // You can also trigger a refresh or redirect if needed
    } else {
      const errorData = await response.json();
      setError(errorData.detail || "Upload failed. Please try again.");
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg hover:bg-blue-700 transition-all duration-300"
        aria-label="Upload Photo"
      >
        +
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-8 rounded-xl shadow-lg w-96 max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Upload Photo</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold">Image</label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full p-3 mt-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Upload
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadModal;
