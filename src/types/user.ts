import { Media } from "@/types/media";

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

export type UserResponse = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  isEmailVerified: boolean;
  isEnabled: boolean;
  loginMethod: string;
  createdAt: string;
  updatedAt: string;
  userProfile: {
    id: number;
    phone: string | null;
    isPhoneVerified: boolean | null;
    gender: string | null;
    dob: string | null;
    occupationStatus: string | null;
    maritalStatus: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
    avatar: Media | null;
    document: Media | null;
  };
};

export type UserForm = {
  status: string;
  isEnabled: boolean;
};
