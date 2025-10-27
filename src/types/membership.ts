export type Membership = {
  id: number;
  amount: number;
  paymentDate: string;
  expiryDate: string;
  transactionId: string;
  status: string;
  paymentMethod: string;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
  membershipType: {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    limit: number;
    features: string;
  };
};

export type MembershipForm = {
  status: string;
  remarks: string;
};
