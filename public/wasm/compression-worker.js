// Load the WASM bridge as ES module
import CaesiumWASM from './libcaesium-wasm.js';

// COMPRESSION_MODE enum values
const COMPRESSION_MODE = {
  QUALITY: 0,
  SIZE: 1,
};

let LibcaesiumWasm = null;
self.onmessage = (e) => {
  if (e.data === 'initLib') {
    initLib();
  } else {
    const file = e.data[0];
    const quality = e.data[1];
    const keepMetadata = e.data[2];
    const maxSize = e.data[3];
    const compressionMode = e.data[4];
    const uuid = e.data[5];
    try {
      performCompress(file, quality, keepMetadata, maxSize, compressionMode, uuid);
    } catch (err) {
      self.postMessage({
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

function initLib() {
  CaesiumWASM()
    .then((lw) => {
      LibcaesiumWasm = lw;
      self.postMessage('initFinished');
    })
    .catch((e) => {
      const result = {
        success: false,
        size: 0,
        data: null,
        errorCode: 3,
        errorString: e.toString(),
        uuid: null,
      };
      self.postMessage(result);
    });
}

function performCompress(file, quality, keepMetadata, maxSize, compressionMode, uuid) {
  if (!LibcaesiumWasm) {
    const result = {
      success: false,
      size: 0,
      data: null,
      errorCode: 1,
      errorString: 'WASM not initialized',
      uuid,
    };
    self.postMessage(result);
    return;
  }
  file
    .arrayBuffer()
    .then((ab) => {
      let success = false;
      const inputArray = new Uint8Array(ab);

      if (compressionMode === COMPRESSION_MODE.SIZE && inputArray.length < maxSize) {
        const result = {
          success: true,
          size: inputArray.length,
          data: inputArray,
          errorCode: 0,
          errorString: '',
          uuid,
        };

        self.postMessage(result);
        return;
      }

      const inputPointer = LibcaesiumWasm._malloc(inputArray.length);
      LibcaesiumWasm.HEAP8.set(inputArray, inputPointer);

      let outputVector;
      if (compressionMode === COMPRESSION_MODE.QUALITY) {
        const js_wrapped_compress = LibcaesiumWasm.cwrap('w_compress', 'number', ['number', 'number', 'number', 'number']);
        outputVector = js_wrapped_compress(inputPointer, inputArray.length, quality, keepMetadata ? 1 : 0);
      } else {
        const js_wrapped_compress = LibcaesiumWasm.cwrap('w_compress_to_size', 'number', ['number', 'number', 'number', 'number']);
        outputVector = js_wrapped_compress(inputPointer, inputArray.length, maxSize, keepMetadata ? 1 : 0);
      }

      let outputLength = 0;
      let status = 0;
      let errorCode = 0;
      let outputArray = new Uint8Array();
      if (outputVector) {
        status = LibcaesiumWasm.getValue(outputVector, 'i32');
        errorCode = LibcaesiumWasm.getValue(outputVector + 4, 'i32');
        const outputPointer = LibcaesiumWasm.getValue(outputVector + 8, 'i32');
        outputLength = LibcaesiumWasm.getValue(outputVector + 12, 'i32');

        if (status === 1) {
          outputArray = new Uint8Array(LibcaesiumWasm.HEAPU8.buffer, outputPointer, outputLength);
          success = true;
        }
      }
      const result = {
        success: success,
        size: outputLength,
        data: outputArray,
        errorCode: errorCode,
        errorString: '',
        uuid,
      };

      self.postMessage(result);

      const drop_vector_struct = LibcaesiumWasm.cwrap('drop_vector_struct', null, ['number']);
      drop_vector_struct(outputVector);
      LibcaesiumWasm._free(inputPointer);
    })
    .catch((e) => {
      const result = {
        success: false,
        size: 0,
        data: null,
        errorCode: 2,
        errorString: e.toString(),
        uuid,
      };

      self.postMessage(result);
    });
}
