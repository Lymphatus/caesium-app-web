# Caesium Web Image Compressor

An image compressor that runs entirely on your browser, completely offline. Powered by [libcaesium-wasm](https://github.com/Lymphatus/libcaesium-wasm).
You can try it at [caesium.app](https://caesium.app).

![Screenshot 2025-05-09 at 11-21-11 Caesium Image Compressor - Online](https://github.com/user-attachments/assets/6f1fecce-d432-46c3-a03f-34fc3016d333)

## Features

- JPG, PNG and WebP supported
- Lossy and lossless compression
- Keeps images metadata
- Before/after comparison
- Runs entirely on your browser, no images are uploaded or processed on any external server. Try loading the app and then turn off your internet connection to see the magic.

## Build

### Setup

Make sure to install the dependencies:

```bash
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

## Run on docker

### Build

You can pull the official docker images

```bash
docker pull lymphatus/caesium-app-web:latest
```

or build it yourself

```bash
docker build -t caesium-web-app .
```

### Run

```bash
docker run -d -p 3000:3000 lymphatus/caesium-app-web:latest
```

Then you can visit [localhost:3000](http://localhost:3000) to start using the app.

## Configuration

You can set the following `ENV` variables to tweak the compressor to your preferences.

- `NUXT_PUBLIC_SEND_USAGE_REPORT`: (boolean | default: `true`) send usage stats for the compressed images to the `NUXT_PUBLIC_API_ENDPOINT`. Set it to `false` if you don't care about it.
- `NUXT_PUBLIC_API_ENDPOINT`: (string | default: `""`) the endpoint where you can send compression stats.
- `NUXT_PUBLIC_COMPRESSOR_MAX_FILES`: (number | default: `5`) how many files are allowed to be added to the list in the same batch.
- `NUXT_PUBLIC_COMPRESSOR_MAX_FILE_SIZE`: (number | default: `20000000`) max limit for each image size, in bytes.
