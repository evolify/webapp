
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";
import { copy as _copy } from "@/utils/index";

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      if (!input.trim()) {
        setOutput("");
        setError("");
        return;
      }
      const formatted = JSON.stringify(JSON.parse(input), null, 2);
      setOutput(formatted);
      setError("");
    } catch (e: any) {
      setOutput("");
      setError("Invalid JSON: " + e.message);
      toast.error("Invalid JSON format.");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    _copy(output);
    toast.success("Formatted JSON copied to clipboard!");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>JSON Formatter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your JSON here..."
                className="h-96"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted JSON will appear here..."
                className={`h-96 ${error ? 'border-red-500' : ''}`}
              />
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <div className="mt-4 flex gap-2">
            <Button onClick={handleFormat}>Format</Button>
            <Button variant="outline" onClick={handleCopy} disabled={!output}>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button variant="ghost" onClick={handleClear}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
