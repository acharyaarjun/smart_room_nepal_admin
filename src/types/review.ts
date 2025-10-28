import { Media } from "./media";

export type Review = {
  id: number;
  rating: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  roomRequest: {
    id: number;
    token: string;
    status: string;
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
};
