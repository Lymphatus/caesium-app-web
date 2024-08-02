export declare enum FILE_STATUS {
    ERROR = 0,
    WAITING = 1,
    COMPRESSING = 2,
    FINISHED = 3
}
export declare enum COMPRESSION_STATUS {
    WAITING = 0,
    COMPRESSING = 1,
    FINISHED = 2,
    FINISHED_ALL_ERRORS = 3
}
export declare enum MESSAGE_LEVEL {
    ERROR = 0,
    WARNING = 1,
    INFO = 2,
    SUCCESS = 3
}
export declare enum COMPRESSION_MODE {
    QUALITY = 0,
    SIZE = 1
}
export interface CImage {
    file: File;
    status: FILE_STATUS;
    uploadedSize: number;
    id: string;
    newSize: number;
    errorMessage: string;
    key: string;
    outputImageArray: Uint8Array;
}
export interface GeneralMessage {
    level: MESSAGE_LEVEL;
    message: string;
    visible: boolean;
    timeout: number;
}
export declare enum MAX_SIZE_UNIT {
    BYTE = 1,
    KILOBYTE = 1000,
    MEGABYTE = 1000000
}
