export type ClipboardItem = {
  type: 'text' | 'image';
  content: string; // For text, this is the text content. For images, this is a data URL.
  timestamp: number;
};
