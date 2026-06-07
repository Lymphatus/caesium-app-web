import JSZip from 'jszip';

export interface ZipWorkerRequest {
  files: { name: string; data: Uint8Array }[];
}

export interface ZipWorkerResponse {
  success: boolean;
  blob: Blob | null;
  error?: string;
}

// Minimal typing of the dedicated worker scope. We intentionally avoid the
// `webworker` lib here because the shared tsconfig uses the `dom` lib, and the
// two declare conflicting globals (`self`, `postMessage`, ...).
interface ZipWorkerScope {
  onmessage: ((e: MessageEvent<ZipWorkerRequest>) => void) | null;
  postMessage(message: ZipWorkerResponse): void;
}

const ctx = self as unknown as ZipWorkerScope;

ctx.onmessage = async (e) => {
  try {
    const zip = new JSZip();
    for (const f of e.data.files) {
      zip.file(f.name, f.data);
    }

    // The DEFLATE pass is the heavy part — running it here keeps the UI thread free.
    const blob = await zip.generateAsync({ type: 'blob' });
    ctx.postMessage({ success: true, blob });
  } catch (err) {
    ctx.postMessage({ success: false, blob: null, error: err instanceof Error ? err.message : String(err) });
  }
};
