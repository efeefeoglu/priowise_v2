'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Loader2, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { questions } from '@/lib/questions';

export const dynamic = 'force-dynamic';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

type UploadStatus = 'idle' | 'uploading' | 'extracting' | 'success' | 'error';

export default function AssessmentPage() {
  const { user, isLoaded } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [extractedContext, setExtractedContext] = useState<Record<string, string>>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isInitializing]);

  const refreshAssessmentState = async () => {
    try {
      const response = await fetch('/api/assessment');
      if (response.ok) {
        const data = await response.json();
        if (data.currentQuestionIndex !== undefined) {
          setCurrentQIndex(data.currentQuestionIndex);
        }
      }
    } catch (error) {
      console.error('Failed to refresh assessment state:', error);
    }
  };

  useEffect(() => {
    async function initializeChat() {
      if (!isLoaded || !user) return;

      try {
        const response = await fetch('/api/assessment');
        if (!response.ok) {
            throw new Error('Failed to fetch assessment state');
        }
        const data = await response.json();
        const initialIndex = data.currentQuestionIndex || 0;
        setCurrentQIndex(initialIndex);

        const firstName = user.firstName || 'there';

        if (initialIndex === 0) {
            // New User
            setMessages([{
                id: 'welcome',
                role: 'assistant',
                content: `Hello ${firstName}! I'm here to guide you through your business assessment. We have ${questions.length} quick questions. Let's get started! \n\n **${questions[0].text}**`
            }]);
        } else if (initialIndex < questions.length) {
            // Returning User - In Progress
            const currentQ = questions[initialIndex];
            setMessages([{
                id: 'welcome-back',
                role: 'assistant',
                content: `Welcome back ${firstName}! Let's pick up where we left off. \n\n **${currentQ.text}**`
            }]);
        } else {
             // Completed
             setMessages([{
                id: 'completed',
                role: 'assistant',
                content: `Welcome back ${firstName}! You have already completed the assessment. Feel free to review your answers or start a new one if available.`
             }]);
        }

      } catch (error) {
        console.error("Failed to initialize chat:", error);
        // Fallback
        setMessages([{
            id: 'error-fallback',
            role: 'assistant',
            content: "Hello! I'm having trouble retrieving your history. Let's try to start anyway. **What is your Company Name?**"
        }]);
      } finally {
        setIsInitializing(false);
      }
    }

    initializeChat();
  }, [isLoaded, user]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('idle');
      setUploadMessage('');
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setUploadStatus('idle');
    setUploadMessage('');
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');
    setUploadMessage('Uploading file...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        setUploadStatus('extracting');
        setUploadMessage('Analyzing document...');

        const response = await fetch('/api/assessment/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();

        // Merge with existing context
        setExtractedContext(prev => ({ ...prev, ...data }));

        setUploadStatus('success');
        const count = Object.keys(data).length;
        setUploadMessage(`Successfully analyzed "${selectedFile.name}". Found answers for ${count} questions.`);

        // Clear file after short delay so user sees success
        setTimeout(() => {
             setSelectedFile(null);
             setUploadStatus('idle');
             setUploadMessage('');
        }, 3000);

    } catch (error) {
        console.error('Upload error:', error);
        setUploadStatus('error');
        setUploadMessage('Failed to process file. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleOptionClick = (option: string) => {
    setInput(prev => {
        const trimmed = prev.trim();
        if (!trimmed) return option;

        // Prevent duplicates
        const existing = trimmed.split(',').map(s => s.trim());
        if (existing.includes(option)) {
            return trimmed;
        }

        return `${trimmed}, ${option}`;
    });
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    // Optimistic update
    setMessages(prev => [...prev, userMessage]);

    // Prepare Data Payload
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          data: {
             // We no longer send file data here, only the accumulated context
             extractedContext: extractedContext
          }
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

          // Simple stream update (no hidden blocks expected from chat anymore for context)
          setMessages(prev => prev.map(m =>
            m.id === assistantId ? { ...m, content: assistantContent } : m
          ));
        }
      }

      // Refresh state to update currentQuestionIndex for next turn
      await refreshAssessmentState();

    } catch (error) {
      console.error('Error sending message:', error);
      // Optional: Add error message to chat
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to get current question options
  const currentQuestion = questions[currentQIndex];
  const showOptions = !isLoading && currentQuestion?.options && currentQuestion?.allowMultiSelect;

  // Calculate progress
  const progress = Math.min(Math.round((currentQIndex / questions.length) * 100), 100);

  if (!isLoaded || isInitializing) {
     return (
        <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto items-center justify-center space-y-4">
             <Loader2 className="w-8 h-8 animate-spin text-brand-yellow" />
             <p className="text-gray-500 font-inter">Loading assessment...</p>
        </div>
     );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-inter font-medium text-gray-500">Progress</span>
          <span className="text-xs font-inter font-medium text-brand-yellow-darker">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-brand-yellow h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

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

        {/* File Upload / Status Area */}
        {selectedFile && (
           <div className="mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 overflow-hidden">
                 <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-gray-400" />
                 </div>
                 <div className="flex flex-col min-w-0">
                    <span className="text-sm font-medium text-gray-900 truncate block">{selectedFile.name}</span>
                    <span className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(0)} KB</span>
                 </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                 {uploadStatus === 'idle' && (
                    <button
                       onClick={handleFileUpload}
                       className="px-3 py-1.5 bg-brand-yellow text-black text-xs font-medium rounded-lg hover:brightness-105 transition-all"
                    >
                       Upload
                    </button>
                 )}
                 {uploadStatus === 'uploading' && (
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                       <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                    </span>
                 )}
                 {uploadStatus === 'extracting' && (
                    <span className="text-xs text-brand-yellow-darker flex items-center gap-1">
                       <Loader2 className="w-3 h-3 animate-spin" /> Analyzing...
                    </span>
                 )}
                 {uploadStatus === 'success' && (
                    <span className="text-xs text-green-600 flex items-center gap-1 font-medium">
                       <CheckCircle className="w-3 h-3" /> Done
                    </span>
                 )}
                 {uploadStatus === 'error' && (
                    <span className="text-xs text-red-500 flex items-center gap-1 font-medium">
                       <AlertCircle className="w-3 h-3" /> Error
                    </span>
                 )}

                 <button
                   onClick={handleClearFile}
                   className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
                   disabled={uploadStatus === 'uploading' || uploadStatus === 'extracting'}
                 >
                    <X className="w-4 h-4" />
                 </button>
              </div>
           </div>
        )}

        {/* Persistent Success Message if file was cleared automatically but we want to show it?
            Currently logic clears it. Let's keep the toast logic inside the file area or add a separate toast area.
            For now, user sees "Done" then it disappears.
            If we want a persistent note that context is loaded, we could add a small badge.
        */}
        {Object.keys(extractedContext).length > 0 && !selectedFile && (
             <div className="mb-2 px-2 flex items-center gap-2">
                 <span className="text-xs text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {Object.keys(extractedContext).length} answers loaded from context
                 </span>
             </div>
        )}

        {/* Options Suggestions */}
        {showOptions && (
            <div className="mb-4 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-2">
                {currentQuestion.options!.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-xs font-inter text-gray-700 hover:bg-brand-yellow hover:border-brand-yellow hover:text-black transition-colors"
                    >
                        {opt}
                    </button>
                ))}
            </div>
        )}

        <form onSubmit={sendMessage} className="flex gap-4 items-end">
           {/* File Upload Trigger */}
           <div className="relative">
             <input
               type="file"
               id="file-upload"
               className="hidden"
               onChange={onFileChange}
               accept=".pdf,.docx,.txt,.md,.json,.csv" // Expanded extensions
             />
             <label
               htmlFor="file-upload"
               className={`p-3 rounded-full cursor-pointer transition-colors ${selectedFile ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
               title="Upload context file"
             >
                <Paperclip className="w-5 h-5" />
             </label>
           </div>

           <div className="flex-1 relative">
             <textarea
               value={input}
               onChange={handleInputChange}
               placeholder={showOptions ? "Select options above or type..." : "Type your answer..."}
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
               disabled={isLoading || !input.trim()}
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
