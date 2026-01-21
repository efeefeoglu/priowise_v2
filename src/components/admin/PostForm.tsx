'use client'

import { useState, useTransition, useRef, useEffect } from 'react';
import { BlogPost } from '@/lib/blog';
import { uploadImage, upsertPost, uploadPostImages, BlogPostInput } from '@/app/actions/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Paperclip, X } from 'lucide-react';

interface PostFormProps {
  initialData?: BlogPost;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function PostForm({ initialData }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || '');
  const [isPublished, setIsPublished] = useState(initialData?.is_published || false);
  const [file, setFile] = useState<File | null>(null);

  // AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatFiles, setChatFiles] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!initialData && !slug) {
       // simple slugify
       setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if ((!chatInput.trim() && chatFiles.length === 0) || isAiLoading) return;

    const userMsg = chatInput;
    const currentFiles = [...chatFiles];

    // Display message with attachment info
    const fileNames = currentFiles.map(f => f.name).join(', ');
    const displayMsg = userMsg + (currentFiles.length > 0 ? ` [Uploading: ${fileNames}]` : '');

    setMessages(prev => [...prev, { role: 'user', content: displayMsg }]);
    setChatInput('');
    setIsAiLoading(true);

    try {
      let imageUrls: { url: string; name: string }[] = [];

      if (currentFiles.length > 0) {
        const formData = new FormData();
        currentFiles.forEach(file => formData.append('files', file));
        imageUrls = await uploadPostImages(formData);
      }

      const res = await fetch('/api/blog/ai-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          currentHtml: content,
          images: imageUrls
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch');
      }

      if (data.html) {
        setContent(data.html);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.message || 'Content updated successfully.' }]);
      setChatFiles([]); // Clear files only after success

    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        let imageUrl = featuredImage;

        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          imageUrl = await uploadImage(formData);
        }

        const postData: BlogPostInput = {
          title,
          slug,
          content,
          featured_image: imageUrl || null,
          is_published: isPublished
        };

        await upsertPost(postData, initialData?.id);
      } catch (error) {
        if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
            // Ignore redirect error
            return;
        }
        alert('Error saving post: ' + error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={handleTitleChange}
              required
              placeholder="Enter post title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              placeholder="url-friendly-slug"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Featured Image</label>
            <div className="flex flex-col gap-4">
              {featuredImage && (
                <div className="relative w-48 h-32 border rounded overflow-hidden">
                   <Image src={featuredImage} alt="Preview" fill className="object-cover" />
                </div>
              )}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if(e.target.files?.[0]) {
                        setFile(e.target.files[0]);
                        // optional: create local preview url
                        setFeaturedImage(URL.createObjectURL(e.target.files[0]));
                    }
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content (AI Assistant)</label>

            {/* AI Chat Interface */}
            <div className="border rounded-md h-[500px] flex flex-col bg-gray-50 overflow-hidden">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-400 mt-10">
                            <p>Enter your content draft or instructions below.</p>
                            <p className="text-xs">Example: "Paste your article here..." or "Change the list to numbered"</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800'}`}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isAiLoading && (
                        <div className="flex justify-start">
                            <div className="bg-gray-200 rounded-lg p-3 text-sm text-gray-600 animate-pulse">
                                AI is thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t">
                    <div className="flex flex-col gap-2">
                        <textarea
                            className="w-full border rounded-md p-2 min-h-[80px] text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Paste content to convert, or ask for adjustments..."
                        />
                        {/* Selected Files Preview */}
                        {chatFiles.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {chatFiles.map((f, i) => (
                                    <div key={i} className="flex items-center gap-1 bg-gray-100 text-xs px-2 py-1 rounded">
                                        <span className="truncate max-w-[100px]">{f.name}</span>
                                        <button type="button" onClick={() => setChatFiles(prev => prev.filter((_, idx) => idx !== i))}>
                                            <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-400">Shift+Enter for new line</span>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setChatFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
                                        }
                                        // Reset input so same file can be selected again if needed
                                        e.target.value = '';
                                    }}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => fileInputRef.current?.click()}
                                    title="Attach images"
                                    className="h-8 w-8 p-0"
                                >
                                    <Paperclip className="w-4 h-4" />
                                </Button>
                            </div>
                            <Button
                                type="button"
                                onClick={() => handleSendMessage()}
                                disabled={isAiLoading || (!chatInput.trim() && chatFiles.length === 0)}
                                size="sm"
                            >
                                {isAiLoading ? 'Processing...' : 'Send'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden textarea to ensure content is available if needed, though state is key */}
            <textarea
              className="hidden"
              name="content"
              value={content}
              readOnly
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isPublished" className="text-sm font-medium">Published</label>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" asChild>
                <Link href="/admin">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving...' : (initialData ? 'Update Post' : 'Create Post')}
            </Button>
          </div>
        </div>

        {/* Preview Pane */}
        <div className="hidden lg:block">
          <div className="sticky top-6 border-l pl-8">
            <h3 className="text-sm font-medium text-gray-400 mb-6 uppercase tracking-wider">Live Preview</h3>

            <article>
               <h1 className="text-4xl md:text-5xl font-rubik font-bold text-[#2d2d2d] mb-6 leading-tight">
                {title || 'Post Title'}
              </h1>
              <div
                className="prose prose-lg max-w-none prose-headings:font-rubik prose-headings:font-bold prose-headings:text-[#2d2d2d] prose-h3:text-[1.5rem] prose-a:text-[#f8b62d] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: content || '<p>Content preview will appear here...</p>' }}
              />
            </article>
          </div>
        </div>
      </div>
    </form>
  );
}
