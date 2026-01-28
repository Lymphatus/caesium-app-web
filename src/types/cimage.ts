export enum FILE_STATUS {
  ERROR,
  WAITING,
  COMPRESSING,
  FINISHED,
}

export interface CImage {
  file: File;
  url: string;
  status: FILE_STATUS;
  id: string;
  newSize: number;
  errorMessage: string | null;
  key: string;
  outputImageArray: Uint8Array | null;
  outputImageUrl: string | null;
}
