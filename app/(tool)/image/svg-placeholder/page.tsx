"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Copy, Download } from 'lucide-react';
import { copy as _copy } from '@/utils';

export default function SvgPlaceholderPage() {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(150);
  const [bgColor, setBgColor] = useState("#cccccc");
  const [textColor, setTextColor] = useState("#333333");
  const [text, setText] = useState("300x150");

  useEffect(() => {
    setText(`${width}x${height}`);
  }, [width, height]);

  const svgCode = useMemo(() => {
    return (
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
` +
      `  <rect width="100%" height="100%" fill="${bgColor}" />
` +
      `  <text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="${textColor}" dominant-baseline="middle" text-anchor="middle">
` +
      `    ${text}
` +
      `  </text>
` +
      `</svg>`
    );
  }, [width, height, bgColor, textColor, text]);

  const svgDataUrl = useMemo(() => {
    return `data:image/svg+xml;base64,${btoa(svgCode)}`;
  }, [svgCode]);

  const handleCopy = () => {
    _copy(svgCode);
    toast.success("SVG code copied to clipboard!");
  };

  const handleDownload = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `placeholder-${width}x${height}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SVG Placeholder Generator</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 flex flex-col gap-4">
          <div>
            <Label htmlFor="width">Width (px)</Label>
            <Input id="width" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="height">Height (px)</Label>
            <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="bgColor">Background Color</Label>
            <div className="flex gap-2">
                <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="p-1 h-10"/>
                <Input value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="textColor">Text Color</Label>
            <div className="flex gap-2">
                <Input id="textColor" type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="p-1 h-10"/>
                <Input value={textColor} onChange={(e) => setTextColor(e.target.value)} />
            </div>
          </div>
          <div>
            <Label htmlFor="text">Text</Label>
            <Input id="text" type="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col items-center justify-center gap-4 p-4 border rounded-md">
            <img src={svgDataUrl} alt="SVG Placeholder Preview" className="max-w-full"/>
            <div className="flex gap-4 mt-4">
                <Button onClick={handleCopy}><Copy className="mr-2 h-4 w-4" /> Copy Code</Button>
                <Button onClick={handleDownload} variant="outline"><Download className="mr-2 h-4 w-4" /> Download .svg</Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
