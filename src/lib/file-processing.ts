import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

// Define the shape of the data returned by PDF.js text content
interface TextItem {
  str: string;
  // Other properties exist but we only need str
}

interface TextContent {
  items: TextItem[];
}

export async function parseFile(buffer: Buffer, fileType: string): Promise<string> {
  try {
    if (fileType === 'application/pdf') {
      // Convert Buffer to Uint8Array for PDF.js
      const uint8Array = new Uint8Array(buffer);

      // Load the document
      const loadingTask = pdfjsLib.getDocument({
         data: uint8Array,
         // PDF.js in Node needs a standard font/env setup sometimes, but 'legacy' build usually works well.
         // We might need to disable worker if it tries to load external worker files.
         disableFontFace: true,
      });

      const doc = await loadingTask.promise;
      let fullText = '';

      // Iterate over pages
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const textContent = await page.getTextContent() as TextContent;

        // Extract strings and join them
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n\n';
      }

      return fullText.trim();

    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType.includes('docx') ||
      fileType.includes('wordprocessing')
    ) {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else if (fileType === 'text/plain' || fileType === 'application/json' || fileType === 'text/markdown') {
        return buffer.toString('utf-8');
    } else {
      // Fallback
      try {
         return buffer.toString('utf-8');
      } catch (e) {
         throw new Error(`Unsupported file type: ${fileType}`);
      }
    }
  } catch (error) {
    console.error('Error parsing file:', error);
    throw new Error('Failed to parse file content.');
  }
}
