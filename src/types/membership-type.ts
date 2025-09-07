export type MembershipType = {
  id: number;
  name: string;
  description: string;
  slug: string;
  limit: number;
  price: number;
  features: string; // Comma-separated features
  createdAt: string;
  updatedAt: string;
};

export type MembershipTypeForm = {
  name: string;
  description: string;
  limit: number;
  price: number;
  features: string; // Comma-separated features
};
