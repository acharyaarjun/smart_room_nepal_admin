export type Media = {
  url: string;
  id?: number;
  fileName: string;
  path: string;
  mimeType: string;
};

export type OrginalMedia = {
  id: number;
  url: string;
  fileName: string;
  path: string;
  mimeType: string;
};

export type FileItem = {
  id: number; // Unique identifier for the file (e.g., file name or ID)
  name: string; // Name of the file
  mimeType: string; // MIME type of the file (e.g., 'image/jpeg', 'video/mp4')
  url: string; // URL or base64 data representing the file (used for previews or uploads)
};

export type MediaUpload = {
  id: number;
  url: string;
};
