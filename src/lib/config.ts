// Runtime-tunable app limits. Override via the matching NEXT_PUBLIC_* env vars
// (see .env.example); the values below are the defaults when unset.

// Maximum number of files accepted in a single batch.
export const FILES_LIMIT: number = Number(process.env.NEXT_PUBLIC_FILES_LIMIT) || 10;

// Maximum size (in bytes) allowed per file.
export const MAX_FILE_SIZE: number = Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 20_000_000;
