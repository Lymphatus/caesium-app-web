import { compress, compressToSize, initialize } from './index.js';

// COMPRESSION_MODE enum values
const COMPRESSION_MODE = {
  QUALITY: 0,
  SIZE: 1,
};

let isInitialized = false;

onmessage = async (e) => {
  if (e.data === 'initLib') {
    try {
      if (!isInitialized) {
        await initialize();
        isInitialized = true;
      }
      postMessage('initFinished');
    } catch (err) {
      postMessage({
        success: false,
        size: 0,
        data: null,
        errorCode: 3,
        errorString: err.toString(),
        uuid: null,
      });
    }
  } else {
    const file = e.data[0];
    const quality = e.data[1];
    const lossless = e.data[2];
    const keepMetadata = e.data[3];
    const maxSize = e.data[4];
    const compressionMode = e.data[5];
    const uuid = e.data[6];

    try {
      await performCompress(file, quality, lossless, keepMetadata, maxSize, compressionMode, uuid);
    } catch (err) {
      postMessage({
        success: false,
        size: file.size,
        data: null,
        errorCode: 100,
        errorString: err.toString(),
        uuid,
      });
    }
  }
};

async function performCompress(file, quality, lossless, keepMetadata, maxSize, compressionMode, uuid) {
  if (!isInitialized) {
    postMessage({
      success: false,
      size: 0,
      data: null,
      errorCode: 1,
      errorString: 'WASM not initialized',
      uuid,
    });
    return;
  }

  try {
    const ab = await file.arrayBuffer();
    const inputArray = new Uint8Array(ab);

    if (compressionMode === COMPRESSION_MODE.SIZE && inputArray.length < maxSize) {
      postMessage({
        success: true,
        size: inputArray.length,
        data: inputArray,
        errorCode: 0,
        errorString: '',
        uuid,
      });
      return;
    }

    const options = {
      jpeg: { quality, chromaSubsampling: 0, progressive: true, optimize: lossless },
      png: { quality, optimizationLevel: 2, forceZopfli: false, optimize: lossless },
      webp: { quality, lossless },
      tiff: { compression: 0, deflateLevel: 6 },
      gif: { quality },
      keepMetadata,
      width: 0,
      height: 0,
    };

    let result;
    if (compressionMode === COMPRESSION_MODE.QUALITY) {
      result = compress(inputArray, options);
    } else {
      result = compressToSize(inputArray, maxSize, options);
    }

    postMessage({
      success: result.status,
      size: result.size,
      data: result.status ? result.compressedImage : null,
      errorCode: result.errorCode,
      errorString: result.status ? '' : `Error: ${result.errorCode}`,
      uuid,
    });
  } catch (e) {
    postMessage({
      success: false,
      size: 0,
      data: null,
      errorCode: 2,
      errorString: e.toString(),
      uuid,
    });
  }
}
