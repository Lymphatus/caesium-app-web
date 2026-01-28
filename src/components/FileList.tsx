'use client';

import { useCompressorStore } from '@/providers/compressor-store-provider';
import ImageCard from '@/components/ImageCard';

export default function FileList() {
  const { files } = useCompressorStore((store) => store);

  return (
    <div className="mb-2 flex flex-col flex-wrap md:flex-row">
      {files?.map((file) => (
        <div key={file.id} className="w-full p-2 md:w-1/2">
          <ImageCard cImage={file}></ImageCard>
        </div>
      ))}
    </div>
  );
}
