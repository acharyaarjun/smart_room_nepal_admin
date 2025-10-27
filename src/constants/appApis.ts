/**
 * @description AppApis is a collection of all the API endpoints used in the app.
 * @example
 * import AppApis from `@/utils/appApis`;
 * axiosInstance.get(AppApis.auth.login);
 */

const API_VERSION = "v1";

const AppApis = {
  auth: {
    login: `/api/${API_VERSION}/auth/login`,
    refreshToken: `/api/${API_VERSION}/auth/refresh-access-token`,
    logout: `/api/${API_VERSION}/auth/logout`,
    logoutAll: `/api/${API_VERSION}/auth/logout-all`,
  },
  resetPassword: {
    forgotPassword: `/api/${API_VERSION}/password-reset/forgot-password`,
    validateResetPasswordOtp: `/api/${API_VERSION}/password-reset/verify-otp`,
    resetPassword: `/api/${API_VERSION}/password-reset/reset-password`,
  },
  medias: {
    get: `/api/${API_VERSION}/medias`,
    upload: `/api/${API_VERSION}/medias`,
    delete: (id: string | number) => `/api/${API_VERSION}/medias/${id}`,
  },
  districts: {
    all: `/api/${API_VERSION}/districts`,
    getSingle: (slug: string) => `/api/${API_VERSION}/districts/${slug}`,
    create: `/api/${API_VERSION}/districts`,
    update: (id: string | number) => `/api/${API_VERSION}/districts/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/districts/${id}`,
  },
  amenity: {
    all: `/api/${API_VERSION}/amenities`,
    getSingle: (id: string | number) => `/api/${API_VERSION}/amenities/${id}`,
    create: `/api/${API_VERSION}/amenities`,
    update: (id: string | number) => `/api/${API_VERSION}/amenities/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/amenities/${id}`,
  },
  membershipType: {
    all: `/api/${API_VERSION}/membership-types`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/membership-types/${id}`,
    create: `/api/${API_VERSION}/membership-types`,
    update: (id: string | number) =>
      `/api/${API_VERSION}/membership-types/${id}`,
    delete: (id: string | number) =>
      `/api/${API_VERSION}/membership-types/${id}`,
  },
  users: {
    all: `/api/${API_VERSION}/users`,
    getSingle: (id: string | number) => `/api/${API_VERSION}/users/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/users/${id}`,
  },
  membership: {
    all: `/api/${API_VERSION}/membership/admin/payments`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/membership/admin/payments/${id}`,
    update: (id: string | number) =>
      `/api/${API_VERSION}/membership/admin/payments/${id}`,
  },
  rooms: {
    all: `/api/${API_VERSION}/rooms/admin`,
    getSingle: (slug: string) => `/api/${API_VERSION}/rooms/${slug}`,
    update: (slug: string) => `/api/${API_VERSION}/rooms/${slug}`,
    amenities: (slug: string) => `/api/${API_VERSION}/rooms/amenities/${slug}`,
    medias: (slug: string) => `/api/${API_VERSION}/rooms/medias/${slug}`,
  },
};

export default AppApis;
