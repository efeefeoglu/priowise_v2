'use client'

import { useState, useTransition } from 'react';
import { BlogPost } from '@/lib/blog';
import { uploadImage, upsertPost, BlogPostInput } from '@/app/actions/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';

interface PostFormProps {
  initialData?: BlogPost;
}

export default function PostForm({ initialData }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featured_image || '');
  const [isPublished, setIsPublished] = useState(initialData?.is_published || false);
  const [file, setFile] = useState<File | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!initialData && !slug) {
       // simple slugify
       setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
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
            <label className="text-sm font-medium">Content (HTML)</label>
            <textarea
              className="w-full min-h-[400px] p-3 border rounded-md font-mono text-sm border-input bg-background"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<p>Write your content here...</p>"
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
                className="prose prose-lg max-w-none prose-headings:font-rubik prose-headings:font-bold prose-headings:text-[#2d2d2d] prose-a:text-[#f8b62d] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
                dangerouslySetInnerHTML={{ __html: content || '<p>Content preview will appear here...</p>' }}
              />
            </article>
          </div>
        </div>
      </div>
    </form>
  );
}
