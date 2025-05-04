
import { fetchPhotos } from "@/lib/api";
import { Photo } from "@/types/photo";
import PhotoGallery from "@/components/photo_gallery";
import Navbar from "@/components/navbar";
import UploadModal from "@/components/upload_modal"; // Import the upload modal

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="pt-24 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-500">Gallery</h1>
        <PhotoGallery />
      </main>
      <UploadModal />
    </div>
  );
}
