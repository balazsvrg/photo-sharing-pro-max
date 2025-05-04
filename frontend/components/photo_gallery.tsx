"use client";

import { useState, useEffect } from "react";
import { Photo } from "@/types/photo";

type SortKey = "owner" | "upload_date";
type SortOrder = "asc" | "desc";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loggedInUsername, setLoggedInUsername] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [sortKey, setSortKey] = useState<SortKey>("upload_date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch photos");

      const data = await response.json();
      setPhotos(data);
    } catch (err) {
      setError("Error loading photos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem("username");
    setLoggedInUsername(username);
    fetchPhotos();
  }, []);

  const handleDelete = async () => {
    if (!selectedPhotoId) return;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/photos/${selectedPhotoId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      setShowDeleteModal(false);
      setSelectedPhotoId(null);
      await fetchPhotos();
    } else {
      const errorData = await response.json();
      setError(errorData.detail || "Failed to delete the photo.");
    }
  };

  const getSortedPhotos = (): Photo[] => {
    return [...photos].sort((a, b) => {
      const aValue = sortKey === "owner" ? a.owner.toLowerCase() : new Date(a.upload_date).getTime();
      const bValue = sortKey === "owner" ? b.owner.toLowerCase() : new Date(b.upload_date).getTime();

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Photos</h2>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Sort
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-700">
              <div className="px-4 py-2 text-sm text-gray-300">Sort By:</div>
              {["owner", "upload_date"].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSortKey(key as SortKey);
                    setDropdownOpen(false);
                  }}
                  className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-gray-700 text-white"
                >
                  {key === "owner" ? "Owner" : "Upload Date"}
                  {sortKey === key && <span className="text-green-400 ml-2">✔</span>}
                </button>
              ))}
              <div className="border-t border-gray-700 my-1" />
              {["asc", "desc"].map((order) => (
                <button
                  key={order}
                  onClick={() => {
                    setSortOrder(order as SortOrder);
                    setDropdownOpen(false);
                  }}
                  className="flex justify-between items-center w-full px-4 py-2 text-left hover:bg-gray-700 text-white"
                >
                  {order === "asc" ? "Ascending" : "Descending"}
                  {sortOrder === order && <span className="text-green-400 ml-2">✔</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading ? (
        <p className="text-center text-gray-400">Loading photos...</p>
      ) : (
        <div className={previewImage ? "blur-sm transition duration-300" : "transition duration-300"}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {getSortedPhotos().map((photo) => (
              <div
                key={photo.id}
                className="bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="relative h-48 group cursor-pointer">
                  {photo.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${photo.image}`}
                      alt={photo.title || "Untitled"}
                      className="object-cover transition-opacity duration-300 group-hover:opacity-60"
                      onClick={() =>
                        setPreviewImage(`${process.env.NEXT_PUBLIC_BACKEND_URL}${photo.image}`)
                      }
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full bg-gray-700">
                      No image available
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col items-center text-center">
                  <h2 className="font-semibold text-xl">{photo.title || "Untitled"}</h2>
                  <p className="text-sm text-gray-400">{photo.owner}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(photo.upload_date).toLocaleDateString()}
                  </p>
                  {loggedInUsername === photo.owner && (
                    <button
                      onClick={() => {
                        setSelectedPhotoId(photo.id);
                        setShowDeleteModal(true);
                      }}
                      className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-8 rounded-xl shadow-lg w-96 max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Confirm Deletion</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <p className="text-center mb-6">Are you sure you want to delete this photo?</p>
            <div className="flex justify-around">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            onClick={() => setPreviewImage(null)}
            className="fixed top-6 right-6 w-10 h-10 rounded-full bg-black opacity-75 hover:opacity-100 text-white text-2xl font-bold flex items-center justify-center transition"
            aria-label="Close preview"
          >
            x
          </button>
          <div className="relative w-[90vw] h-[90vh] rounded-lg overflow-hidden">
            <img
              src={previewImage}
              alt="Preview"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
