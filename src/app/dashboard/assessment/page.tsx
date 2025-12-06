'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AssessmentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello! I'm here to guide you through your business assessment. We have 23 quick questions. Let's get started! \n\n **What is your Company Name?**"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !file) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    // Optimistic update
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    const currentFile = file;

    setInput('');
    setFile(null);

    let fileContent: string | null = null;
    let fileData = null;

    if (currentFile) {
        if (currentFile.type.startsWith('text/') || currentFile.type === 'application/json') {
             fileContent = await currentFile.text();
        } else {
             fileContent = `[File Uploaded: ${currentFile.name} - Content not extracted in client]`;
        }
        fileData = { name: currentFile.name, type: currentFile.type, fileContent };
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          data: fileData ? { ...fileData } : undefined
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantContent = '';

      // Create placeholder for assistant message
      const assistantId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          assistantContent += chunk;

          setMessages(prev => prev.map(m =>
            m.id === assistantId ? { ...m, content: assistantContent } : m
          ));
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Optional: Add error message to chat
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                m.role === 'user'
                  ? 'bg-brand-yellow text-black' // User: Brand Yellow
                  : 'bg-white border border-gray-100 text-gray-800' // AI: White/Gray
              }`}
            >
              <div className="whitespace-pre-wrap font-inter text-sm leading-relaxed">
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                <span className="text-xs text-gray-400 font-inter">Thinking...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <form onSubmit={sendMessage} className="flex gap-4 items-end">
           {/* File Upload Trigger */}
           <div className="relative">
             <input
               type="file"
               id="file-upload"
               className="hidden"
               onChange={onFileChange}
               accept=".txt,.md,.json,.csv" // Restricting to text for this prototype based on client-side reading
             />
             <label
               htmlFor="file-upload"
               className={`p-3 rounded-full cursor-pointer transition-colors ${file ? 'bg-brand-yellow text-black' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
               title="Upload context file"
             >
                <Paperclip className="w-5 h-5" />
             </label>
             {file && (
                <div className="absolute bottom-full mb-2 left-0 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {file.name}
                </div>
             )}
           </div>

           <div className="flex-1 relative">
             <textarea
               value={input}
               onChange={handleInputChange}
               placeholder="Type your answer..."
               className="w-full p-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 resize-none font-inter"
               rows={1}
               onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                   e.preventDefault();
                   sendMessage(e);
                 }
               }}
             />
             <button
               type="submit"
               disabled={isLoading || (!input.trim() && !file)}
               className="absolute right-2 bottom-2 p-2 bg-brand-yellow text-black rounded-lg hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
               <Send className="w-4 h-4" />
             </button>
           </div>
        </form>
        <p className="text-center text-xs text-gray-400 mt-2 font-inter">
            Press Enter to send
        </p>
      </div>
    </div>
  );
}
