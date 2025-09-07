import { Media } from "./media";

export type District = {
  id: number;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  image: Media | null;
};

export type DistrictForm = {
  name: string;
  description: string;
  image?: File | null;
};
