import Compressor from '@/components/Compressor';
import { CompressorStoreProvider } from '@/providers/compressor-store-provider';
import FeatureCards from '@/components/FeatureCards';
import HowItWorks from '@/components/HowItWorks';

export default function Home() {
  return (
    <div className="container mx-auto flex w-full flex-col py-8">
      <CompressorStoreProvider>
        <Compressor></Compressor>
      </CompressorStoreProvider>
      <div className="mt-auto flex flex-col gap-4 px-4 pt-12 md:px-0">
        <FeatureCards />
        <HowItWorks />
      </div>
    </div>
  );
}
