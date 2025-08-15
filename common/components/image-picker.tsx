
import { useState, useRef, useCallback, DragEvent, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Clipboard, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  onChange: (file: File) => void;
}

export function ImagePicker({ onChange, className }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const onFileSelect = useCallback((f: File | null) => {
    if (f && f.type.startsWith('image/')) {
      setFile(f);
      const previewUrl = URL.createObjectURL(f);
      onChange(f);
    } else {
      toast.error('Please select a valid image file.');
    }
  }, [onChange]);

  const onPaste = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        const imageType = item.types.find(type => type.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          const file = new File([blob], 'pasted-image.png', { type: imageType });
          onFileSelect(file);
          return;
        }
      }
      toast.warning('No image found in clipboard.');
    } catch (err) {
      console.error('Paste error:', err);
      toast.error('Failed to read from clipboard. Please allow clipboard access.');
    }
  }, [onFileSelect]);

  const onCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    fileInputRef.current?.click();
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <Card
      className={cn("group relative flex items-center justify-center p-0 transition-colors cursor-pointer",
        className,
        isDragging && 'border-blue-600 bg-muted')}
      onClick={onCardClick}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
        accept="image/*"
        className="hidden"
      />

      {imageUrl ? (
        <img src={imageUrl} alt="Image Preview" className="object-contain max-w-full max-h-full" />
      ) : (
        <div className="text-center text-muted-foreground">
          <UploadCloud className="mx-auto h-12 w-12" />
          <p>Click, paste, or drag & drop an image here</p>
        </div>
      )}

      <div className={cn("absolute top-2 right-2 transition-opacity", file ? 'opacity-0 group-hover:opacity-100' : 'opacity-100')}>
        <Button variant="outline" size="icon" onClick={onPaste}>
          <Clipboard className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
