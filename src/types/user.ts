import { Media } from "@/types/media";

export type Role = {
  title: string;
};

export type UserResopnse = {
  status: number;
  message: string;
  data: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: User[];
  };
};

export type UserProfile = {
  avatar?: Media | null;
  phone?: string | null;
  gender?: string | null;
  dob?: string | null;
};

export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
  isEnabled: boolean;
  loginMethod: string;
  role: string;
  userProfile: {
    phone: string | null;
    gender: string | null;
    dob: string | null;
    avatar: Media | null;
  };
};
