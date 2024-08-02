import LibcaesiumWasm from '@/assets/wasm/libcaesium-wasm'
import { COMPRESSION_MODE } from '~/utils/utils.js'

LibcaesiumWasm.onRuntimeInitialized = () => {
    postMessage('PONG')
}
onmessage = (e) => {
    if (e.data === 'PING') {
        return
    }
    try {
        const file = e.data[0]
        const quality = e.data[1]
        const keepMetadata = e.data[2]
        const maxSize = e.data[3]
        const compressionMode = e.data[4]
        performCompress(file, quality, keepMetadata, maxSize, compressionMode)
    } catch (e) {
        postMessage([false, 0, null, 1, e.toString()])
    }

}

function performCompress(file, quality, keepMetadata, maxSize, compressionMode) {
    file.arrayBuffer().then((ab) => {
        let success = false
        const inputArray = new Uint8Array(ab)

        if (compressionMode === COMPRESSION_MODE.SIZE && inputArray.length < maxSize) {
            postMessage([true, inputArray.length, inputArray, 0])
            return
        }

        const inputPointer = LibcaesiumWasm._malloc(inputArray.length)
        LibcaesiumWasm.HEAP8.set(inputArray, inputPointer)

        let outputVector = null
        if (compressionMode === COMPRESSION_MODE.QUALITY) {
            const js_wrapped_compress = LibcaesiumWasm.cwrap('w_compress', 'number', [
                'number',
                'number',
                'number',
                'number'
            ])
            outputVector = js_wrapped_compress(
                inputPointer,
                inputArray.length,
                quality,
                keepMetadata ? 1 : 0
            )
        } else {
            const js_wrapped_compress = LibcaesiumWasm.cwrap('w_compress_to_size', 'number', [
                'number',
                'number',
                'number',
                'number'
            ])
            outputVector = js_wrapped_compress(
                inputPointer,
                inputArray.length,
                maxSize,
                keepMetadata ? 1 : 0
            )
        }

        let outputLength = 0
        let status = 0
        let errorCode = 0
        let outputArray = new Uint8Array()
        if (outputVector) {
            status = LibcaesiumWasm.getValue(outputVector, 'i32')
            errorCode = LibcaesiumWasm.getValue(outputVector + 4, 'i32')
            const outputPointer = LibcaesiumWasm.getValue(outputVector + 8, 'i32')
            outputLength = LibcaesiumWasm.getValue(outputVector + 12, 'i32')

            if (status === 1) {
                outputArray = new Uint8Array(LibcaesiumWasm.HEAPU8.buffer, outputPointer, outputLength)
                success = true
            }
        }
        postMessage([success, outputLength, outputArray, errorCode, ''])

        const drop_vector_struct = LibcaesiumWasm.cwrap('drop_vector_struct', null, ['number'])
        drop_vector_struct(outputVector)
        LibcaesiumWasm._free(inputPointer)
        //TODO Causes some errors
        //LibcaesiumWasm._free(outputPointer)
    }).catch((e) => {
        postMessage([false, 0, null, 2, e.toString()])
    })
}
