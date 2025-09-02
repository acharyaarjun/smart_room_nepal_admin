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
  banners: {
    get: `/api/${API_VERSION}/banners/admin/all`,
    add: `/api/${API_VERSION}/banners`,
    update: (id: string | number) => `/api/${API_VERSION}/banners/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/banners/${id}`,
  },
  services: {
    get: `/api/${API_VERSION}/services/admin/all`,
    add: `/api/${API_VERSION}/services`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/services/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/services/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/services/${id}`,
  },
  testPreparations: {
    get: `/api/${API_VERSION}/test-preparations/admin/all`,
    add: `/api/${API_VERSION}/test-preparations`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/test-preparations/admin/${id}`,
    update: (id: string | number) =>
      `/api/${API_VERSION}/test-preparations/${id}`,
    delete: (id: string | number) =>
      `/api/${API_VERSION}/test-preparations/${id}`,
  },
  events: {
    get: `/api/${API_VERSION}/events/admin/all`,
    add: `/api/${API_VERSION}/events`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/events/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/events/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/events/${id}`,
  },
  teams: {
    get: `/api/${API_VERSION}/teams/admin/all`,
    add: `/api/${API_VERSION}/teams`,
    getSingle: (id: string | number) => `/api/${API_VERSION}/teams/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/teams/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/teams/${id}`,
  },
  accreditations: {
    get: `/api/${API_VERSION}/accreditations/admin/all`,
    add: `/api/${API_VERSION}/accreditations`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/accreditations/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/accreditations/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/accreditations/${id}`,
  },
  partners: {
    get: `/api/${API_VERSION}/partners/admin/all`,
    add: `/api/${API_VERSION}/partners`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/partners/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/partners/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/partners/${id}`,
  },
  testimonials: {
    get: `/api/${API_VERSION}/testimonials/admin/all`,
    add: `/api/${API_VERSION}/testimonials`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/testimonials/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/testimonials/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/testimonials/${id}`,
  },
  galleries: {
    categories: {
      get: `/api/${API_VERSION}/galleries/categories/admin/all`,
      add: `/api/${API_VERSION}/galleries/categories`,
      getSingle: (id: string | number) =>
        `/api/${API_VERSION}/galleries/categories/admin/${id}`,
      update: (id: string | number) =>
        `/api/${API_VERSION}/galleries/categories/${id}`,
      delete: (id: string | number) =>
        `/api/${API_VERSION}/galleries/categories/${id}`,
    },
    get: `/api/${API_VERSION}/galleries/admin/all`,
    add: `/api/${API_VERSION}/galleries`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/galleries/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/galleries/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/galleries/${id}`,
  },
  blogs: {
    categories: {
      get: `/api/${API_VERSION}/blogs/categories/admin/all`,
      add: `/api/${API_VERSION}/blogs/categories`,
      getSingle: (id: string | number) =>
        `/api/${API_VERSION}/blogs/categories/admin/${id}`,
      update: (id: string | number) =>
        `/api/${API_VERSION}/blogs/categories/${id}`,
      delete: (id: string | number) =>
        `/api/${API_VERSION}/blogs/categories/${id}`,
    },
    get: `/api/${API_VERSION}/blogs/admin/all`,
    add: `/api/${API_VERSION}/blogs`,
    getSingle: (id: string | number) => `/api/${API_VERSION}/blogs/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/blogs/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/blogs/${id}`,
  },
  destinations: {
    get: `/api/${API_VERSION}/destinations/admin/all`,
    add: `/api/${API_VERSION}/destinations`,
    getSingle: (id: string | number) =>
      `/api/${API_VERSION}/destinations/admin/${id}`,
    update: (id: string | number) => `/api/${API_VERSION}/destinations/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/destinations/${id}`,

    faqs: {
      get(id: string | number) {
        return `/api/${API_VERSION}/destinations/admin/${id}/faqs`;
      },
      add(id: string | number) {
        return `/api/${API_VERSION}/destinations/${id}/faqs`;
      },
      update: (id: string | number, faqId: string | number) =>
        `/api/${API_VERSION}/destinations/${id}/faqs/${faqId}`,
      delete: (id: string | number, faqId: string | number) =>
        `/api/${API_VERSION}/destinations/${id}/faqs/${faqId}`,
    },

    partners: {
      get(id: string | number) {
        return `/api/${API_VERSION}/destinations/admin/${id}/partners`;
      },
      add(id: string | number) {
        return `/api/${API_VERSION}/destinations/${id}/partners`;
      },
      update: (id: string | number, partnerId: string | number) =>
        `/api/${API_VERSION}/destinations/${id}/partners/${partnerId}`,
      delete: (id: string | number, partnerId: string | number) =>
        `/api/${API_VERSION}/destinations/${id}/partners/${partnerId}`,
    },
  },
  contacts: {
    get: `/api/${API_VERSION}/contacts`,
    update: (id: string | number) => `/api/${API_VERSION}/contacts/${id}`,
    delete: (id: string | number) => `/api/${API_VERSION}/contacts/${id}`,
  },
  siteSettings: {
    get: `/api/${API_VERSION}/site-settings`,
    add: `/api/${API_VERSION}/site-settings`,
    update: (id: number) => `/api/${API_VERSION}/site-settings/${id}`,
    delete: (id: number) => `/api/${API_VERSION}/site-settings/${id}`,
  },
  app: {
    reset: `/api/${API_VERSION}/app/reset`,
    downloadBackup: `/api/${API_VERSION}/app/download-backup`,
    restoreBackup: `/api/${API_VERSION}/app/restore-backup`,
  },
};

export default AppApis;
