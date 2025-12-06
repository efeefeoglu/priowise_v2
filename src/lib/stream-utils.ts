// Helper to make iterator readable stream
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function iteratorToStream(iterator: any) {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();
      if (done) {
        controller.close();
      } else {
        // value is AIMessageChunk
        // We need to send text.
        // Assuming value.content is string or array.
        let text = "";
        if (typeof value.content === 'string') {
            text = value.content;
        } else if (Array.isArray(value.content)) {
            // handle multi-modal if needed, but for gpt-4o-mini text it's usually string
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            text = value.content.map((c: any) => c.text || "").join("");
        }
        controller.enqueue(new TextEncoder().encode(text));
      }
    },
  });
}
