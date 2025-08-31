export enum FILE_STATUS {
  ERROR,
  WAITING,
  COMPRESSING,
  FINISHED,
}

export enum COMPRESSION_STATUS {
  WAITING,
  COMPRESSING,
  FINISHED,
  FINISHED_ALL_ERRORS,
}

export enum MESSAGE_LEVEL {
  ERROR,
  WARNING,
  INFO,
  SUCCESS,
}

export enum COMPRESSION_MODE {
  QUALITY,
  SIZE,
}

export enum APP_THEME {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
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

export interface GeneralMessage {
  level: MESSAGE_LEVEL;
  message: string;
  visible: boolean;
  timeout: number;
}

export enum MAX_SIZE_UNIT {
  BYTE = 1,
  KILOBYTE = 1000,
  MEGABYTE = 1000000,
}

export interface CompressionResult {
  success: boolean;
  size: number;
  data: Uint8Array | null;
  errorCode: number;
  errorString: string;
  uuid: string;
}
