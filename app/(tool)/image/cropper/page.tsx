
"use client";

import { useState } from 'react';
import { ImagePicker } from '@/components/image-picker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CropperPage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Image Cropper & Compressor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full max-w-lg mx-auto">
            <ImagePicker onChange={handleImageSelect} />
            {selectedImage && (
              <div className="mt-4 text-center text-sm text-muted-foreground">
                <p>Selected file: <strong>{selectedImage.name}</strong></p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
