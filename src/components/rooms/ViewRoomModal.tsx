"use client";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Room } from "@/types/room";
import { IconComponent, Lightbox } from "@/components/common";
import {
  getAllAmenitiesForRoom,
  getAllMediasForRoom,
} from "@/services/roomService";
import { Amenity } from "@/types/amenity";
import { Media } from "@/types/media";
import Image from "next/image";

interface ViewRoomModalProps {
  item: Room;
  isOpen: boolean;
  onClose: () => void;
}

const ViewRoomModal = ({ item, isOpen, onClose }: ViewRoomModalProps) => {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxMedia, setLightboxMedia] = useState<Media | null>(null);

  useEffect(() => {
    if (isOpen && item.slug) {
      const fetchDetails = async () => {
        try {
          const [amenitiesRes, mediasRes] = await Promise.all([
            getAllAmenitiesForRoom(item.slug),
            getAllMediasForRoom(item.slug),
          ]);

          // Extract amenities from roomAmenities
          const extractedAmenities = amenitiesRes.data.data.map(
            (ra: any) => ra.amenity
          );
          setAmenities(extractedAmenities);

          // Extract media from roomMedias
          const extractedMedias = mediasRes.data.data
            .map((rm: any) => rm.media)
            .filter(Boolean);
          setMedias(extractedMedias);
        } catch (error) {
          console.error("Failed to fetch room details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchDetails();
    }
  }, [isOpen, item.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status?: string) => {
    if (!status) return "bg-gray-500/20 text-gray-600 dark:text-gray-400";

    switch (status.toLowerCase()) {
      case "pending":
        return "bg-warning/20 text-warning";
      case "approved":
        return "bg-success/20 text-success";
      case "maintenance":
        return "bg-orange-500/20 text-orange-500";
      case "disabled":
        return "bg-danger/20 text-danger";
      default:
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
    }
  };

  const openLightbox = (media: Media) => {
    setLightboxMedia(media);
  };

  const closeLightbox = () => {
    setLightboxMedia(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50">
        <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-3xl w-full max-w-4xl mx-4">
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Room Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="px-6 py-6 max-h-[85vh] overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="text-primary">Loading...</div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Main Image */}
                {item.image?.url && (
                  <div className="w-full">
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      width={800}
                      height={400}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Name
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        item.roomStatus
                      )}`}
                    >
                      {item.roomStatus
                        ?.replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Type
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {item.roomType
                        ?.replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Max Capacity
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {item.maxCapacity}{" "}
                      {item.maxCapacity === 1 ? "Person" : "Persons"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Price
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {formatPrice(item.price)} / {item.unit}
                    </p>
                  </div>
                  {item.offerPrice && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Offer Price
                      </p>
                      <p className="font-medium text-success">
                        {formatPrice(item.offerPrice)}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Featured
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {item.isFeatured ? (
                        <span className="text-yellow-600 dark:text-yellow-400">
                          Yes
                        </span>
                      ) : (
                        "No"
                      )}
                    </p>
                  </div>
                </div>

                {/* Descriptions */}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Short Description
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.shortDescription}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    Full Description
                  </p>
                  <div
                    className="text-gray-700 dark:text-gray-300 prose dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Location
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        District
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.district?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Address
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Latitude
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.latitude}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Longitude
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.longitude}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Host Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    Host Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Name
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.user?.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.user?.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Username
                      </p>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {item.user?.username}
                      </p>
                    </div>
                    {item.user?.userProfile?.phone && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Phone
                        </p>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {item.user.userProfile.phone}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Amenities */}
                {amenities.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Amenities
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {amenities.map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
                        >
                          <IconComponent icon={amenity.icon} size="size-5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {amenity.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media Gallery */}
                {medias.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                      Media Gallery
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      {medias.map((media, index) => (
                        <div
                          key={index}
                          className="relative aspect-square cursor-pointer rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
                          onClick={() => openLightbox(media)}
                        >
                          <Image
                            src={media.url}
                            alt={`Room media ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created At
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Updated At
                    </p>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {formatDate(item.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxMedia && (
        <Lightbox media={lightboxMedia} closeLightbox={closeLightbox} />
      )}
    </>
  );
};

export default ViewRoomModal;
