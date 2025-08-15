
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Trash2, ArrowRightLeft } from "lucide-react";
import { copy as _copy } from "@/utils/index";

export default function Base64Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (e) {
      toast.error("Failed to encode.");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (e) {
      toast.error("Invalid Base64 string.");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    _copy(output);
    toast.success("Copied to clipboard!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex-row items-center">
          <CardTitle>Base64 Encoder / Decoder</CardTitle>
          <div className="ml-auto flex gap-2">
            <Button onClick={handleEncode}>Encode</Button>
            <Button onClick={handleDecode}>Decode</Button>
            <Button variant="outline" onClick={handleCopy} disabled={!output}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter string to encode or decode..."
              className="h-60"
            />
            <Textarea
              value={output}
              readOnly
              placeholder="Result..."
              className="h-60"
            />
        </CardContent>
      </Card>
    </div>
  );
}
