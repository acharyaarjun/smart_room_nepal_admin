import { Media } from "./media";

export type Request = {
  id: number;
  token: string;
  isFixedDate: boolean;
  startDate: string | null;
  endDate: string | null;
  price: number;
  acceptedPrice: number | null;
  status: string; // @/enums/roomRequestStatus.ts
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    userProfile: {
      id: number;
      status: string;
      avatar: Media | null;
    };
  };
  room: {
    id: number;
    name: string;
    slug: string;
    price: number;
    unit: string;
    offerPrice: number | null;
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
  };
};
