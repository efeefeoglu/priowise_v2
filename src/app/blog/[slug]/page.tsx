import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/blog';
import { ArrowLeft } from 'lucide-react';

export const revalidate = 60;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-6 max-w-4xl">
      <Link
        href="/blog"
        className="inline-flex items-center text-gray-600 hover:text-[#f8b62d] mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Blog
      </Link>

      <header className="mb-10 text-center">
        <div className="text-[#f8b62d] font-medium mb-4">
          {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        <h1 className="text-4xl md:text-5xl font-rubik font-bold text-[#2d2d2d] mb-6 leading-tight">
          {post.title}
        </h1>
      </header>

      {post.featured_image && (
        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-sm">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-none prose-headings:font-rubik prose-headings:font-bold prose-headings:text-[#2d2d2d] prose-a:text-[#f8b62d] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
