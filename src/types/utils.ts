export const FILES_LIMIT: number = 10; // TODO conf
export const MAX_FILE_SIZE: number = 10_000_000; // TODO conf

export enum COMPRESSION_MODE {
  QUALITY,
  SIZE,
}
export enum MESSAGE_LEVEL {
  ERROR,
  WARNING,
  INFO,
  SUCCESS,
}

export interface GeneralMessage {
  level: MESSAGE_LEVEL;
  translationKey: string;
  translationNs: string;
  translationParams?: Record<string, unknown>;
  timeout: number;
}
