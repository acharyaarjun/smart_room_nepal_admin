import { Media } from "@/types/media";

export type Event = {
  id: number;
  title: string;
  slug: string;
  description: string;
  eventDate: string;
  venue: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  featuredImage: Media | null;
};

export type EventForm = {
  title: string;
  description: string;
  eventDate: string;
  venue: string;
  isActive: boolean;
  featuredImageId: number | undefined;
};
