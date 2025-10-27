import { Media } from "./media";
import { Amenity } from "./amenity";

export type Room = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  unit: string;
  offerPrice: number | null;
  longitude: number;
  latitude: number;
  address: string;
  roomType: string;
  maxCapacity: number;
  roomStatus: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  district: {
    id: number;
    name: string;
    slug: string;
    description: string;
  };
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    userProfile: {
      id: number;
      phone: string | null;
      status: string;
      avatar: Media | null;
    };
  };
  image: Media | null;
  amenities?: Amenity[];
  medias?: Media[];
};

export type RoomForm = {
  roomStatus: string;
  isFeatured: boolean;
};

export type RoomAmenity = {
  id: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  amenity: {
    id: number;
    description: string | null;
    icon: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type RoomMedia = {
  id: number;
  createdAt: string;
  updatedAt: string;
  media: Media | null;
};
