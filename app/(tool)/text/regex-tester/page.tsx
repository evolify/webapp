
"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const { error, matches } = useMemo(() => {
    if (!pattern) {
      return { error: null, matches: [] };
    }
    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(testString.matchAll(regex));
      return { error: null, matches };
    } catch (e: any) {
      return { error: e.message, matches: [] };
    }
  }, [pattern, flags, testString]);

  const highlightedResult = useMemo(() => {
    if (!testString || matches.length === 0) {
      return <p>{testString}</p>;
    }

    let lastIndex = 0;
    const parts: (string | React.ReactElement)[] = [];

    matches.forEach((match, i) => {
      const startIndex = match.index ?? 0;
      // Add the text before the match
      if (startIndex > lastIndex) {
        parts.push(testString.substring(lastIndex, startIndex));
      }
      // Add the highlighted match
      parts.push(
        <mark key={i} className="bg-yellow-300 text-black rounded">
          {match[0]}
        </mark>
      );
      lastIndex = startIndex + match[0].length;
    });

    // Add the remaining text after the last match
    if (lastIndex < testString.length) {
      parts.push(testString.substring(lastIndex));
    }

    return <div className="whitespace-pre-wrap break-words">{parts}</div>;
  }, [testString, matches]);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Regex Tester</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Input
              placeholder="/pattern/"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-grow font-mono"
            />
            <Input
              placeholder="flags"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-24 font-mono"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid Regular Expression</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Textarea
            placeholder="Enter your test string here..."
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="h-60 font-mono"
          />
          <Card>
            <CardHeader>
              <CardTitle>Result ({matches.length} matches)</CardTitle>
            </CardHeader>
            <CardContent className="h-60 overflow-auto rounded-md border p-4">
              {highlightedResult}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
