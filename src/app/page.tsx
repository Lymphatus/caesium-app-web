import Compressor from '@/components/Compressor';
import { CompressorStoreProvider } from '@/providers/compressor-store-provider';

export default function Home() {
  return (
    <div className="container mx-auto w-full py-8">
      <CompressorStoreProvider>
        <Compressor></Compressor>
      </CompressorStoreProvider>
    </div>
  );
}
