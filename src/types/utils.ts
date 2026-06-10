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
