export type Media = {
  url: string;
  fileName: string;
  path: string;
  mimeType: string;
};

export type District = {
  id: number;
  name: string;
  slug: string;
};

export type AdminUserProfile = {
  phone: string | null;
  status: string;
  avatar: Media | null;
};

export type AdminRecentUser = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string; // host, admin, user
  createdAt: string;
  userProfile: AdminUserProfile;
};

export type AdminRecentRoom = {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit: string;
  roomType: string; // @/enums/roomType.ts
  roomStatus: string; // @/enums/roomStatus.ts
  isFeatured: boolean;
  createdAt: string;
  image: Media;
  district: District;
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
  };
};

export type AdminRequestRoom = {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit: string;
  image: Media;
};

export type AdminRequestUser = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  userProfile: {
    phone: string;
  };
};

export type AdminRecentRequest = {
  id: number;
  token: string;
  userId: number;
  roomId: number;
  isFixedDate: boolean;
  startDate: string | null;
  endDate: string | null;
  status: string; // @/enums/roomRequestStatus.ts
  price: number;
  acceptedPrice: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  room: AdminRequestRoom;
  user: AdminRequestUser;
};

export type AdminDashboardStats = {
  users: {
    total: number;
    admins: number;
    hosts: number;
    normalUsers: number;
    active: number;
    inactive: number;
  };
  rooms: {
    total: number;
    approved: number;
    pending: number;
    maintenance: number;
    disabledByAdmin: number;
    disabledByOwner: number;
    featured: number;
  };
  requests: {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    ongoing: number;
    completed: number;
  };
  reviews: {
    total: number;
    averageRating: number;
  };
  payments: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    totalRevenue: number;
  };
  districts: {
    total: number;
  };
};

export type AdminDashboard = {
  stats: AdminDashboardStats;
  recentUsers: AdminRecentUser[];
  recentRooms: AdminRecentRoom[];
  recentRequests: AdminRecentRequest[];
};
