import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export async function parseFile(buffer: Buffer, fileType: string): Promise<string> {
  try {
    if (fileType === 'application/pdf') {
      const data = await pdf(buffer);
      return data.text;
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
      // Fallback for types that might be text but mismatched
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
