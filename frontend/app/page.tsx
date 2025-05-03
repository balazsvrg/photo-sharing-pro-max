
import { fetchPhotos } from "@/lib/api";
import { Photo } from "@/types/photo";
import PhotoGallery from "@/components/photo_gallery";
import Navbar from "@/components/navbar";
import UploadModal from "@/components/upload_modal"; // Import the upload modal
import PhotoRefreshButton from "@/components/photo_refresh_button";

export default async function HomePage() {
  // Fetch photos server-side
  const photos: Photo[] = await fetchPhotos();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-24 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-500">Gallery</h1>

        {/* Display loading state */}
        <PhotoGallery photos={photos} />
      </main>
      
      {/* Floating Upload Button */}
      <UploadModal /> {/* This will be a client-side component */}
    </div>
  );
}
