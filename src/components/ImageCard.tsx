import { Button, Card } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import { CImage } from '@/types/cimage';
import prettyBytes from 'next/dist/lib/pretty-bytes';

export default function ImageCard({ cImage }: { cImage: CImage }) {
  return (
    <Card className="w-full items-stretch md:flex-row">
      <div
        className="relative h-30 w-full shrink-0 overflow-hidden rounded-2xl bg-cover bg-center sm:h-30 sm:w-30"
        style={{
          backgroundImage: `url(${cImage.url})`,
        }}
      ></div>
      <div className="flex min-w-0 flex-col justify-between gap-2 md:gap-0">
        <Card.Header className="gap-1 text-left">
          <Card.Title className="flex w-full min-w-0 items-center gap-1">
            <span className="min-w-0 grow truncate">{cImage.id}</span>
            <Button isIconOnly className="shrink-0" size="sm" variant="danger-soft">
              <Trash2></Trash2>
            </Button>
          </Card.Title>
          <Card.Description>{prettyBytes(cImage.file.size)}</Card.Description>
        </Card.Header>
        <Card.Footer className="flex w-full flex-col justify-end gap-1 sm:flex-row">
          <Button className="w-full sm:w-auto"></Button>
        </Card.Footer>
      </div>
    </Card>
  );
}
