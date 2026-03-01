export interface ILibcaesium {
    _malloc: (size: number) => number;
    _free: (ptr: number) => void;
    HEAP8: Int8Array;
    HEAPU8: Uint8Array;
    HEAP16: Int16Array;
    HEAPU16: Uint16Array;
    HEAP32: Int32Array;
    HEAPU32: Uint32Array;
    HEAPF32: Float32Array;
    HEAPF64: Float64Array;
    getValue: (ptr: number, type: string) => number;
    cwrap: (name: string, returnType: unknown, argTypes: string[]) => (...args: unknown[]) => number;
    ready: Promise<void>;
    asm: {
        za: WebAssembly.Memory;
        Fa: WebAssembly.Table;
        Aa: (...args: unknown[]) => unknown;
    };
}
export declare function initialize(): Promise<ILibcaesium | null>;
export interface CompressionResult {
    status: boolean;
    errorCode: number;
    compressedImage: Uint8Array;
    size: number;
}
export interface CompressionOptions {
    jpeg: {
        quality: number;
        chromaSubsampling: number;
        progressive: boolean;
        optimize: boolean;
    };
    png: {
        quality: number;
        optimizationLevel: number;
        forceZopfli: boolean;
        optimize: boolean;
    };
    webp: {
        quality: number;
        lossless: boolean;
    };
    tiff: {
        compression: number;
        deflateLevel: number;
    };
    gif: {
        quality: number;
    };
    keepMetadata: boolean;
    width: number;
    height: number;
}
export declare function compress(ui8a: Uint8Array, options: CompressionOptions): CompressionResult;
export declare function compressToSize(ui8a: Uint8Array, maxSize: number, options: CompressionOptions): CompressionResult;
