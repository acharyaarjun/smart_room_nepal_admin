import { Media } from "@/types/media";

export type Accreditation = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  media: Media | null;
};

export type AccreditationForm = {
  title: string;
  mediaId: number | undefined;
  isActive: boolean;
  order: number;
};
