import Link from 'next/link';
import Image from 'next/image';
import { getPosts } from '@/lib/blog';
import { ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-rubik font-bold text-[#2d2d2d] mb-4">
          Insights Blog
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Latest updates, thoughts, and insights from the Priowise team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col"
          >
            {post.featured_image && (
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.featured_image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-6 flex flex-col flex-grow">
              <div className="text-sm text-[#f8b62d] font-medium mb-2">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <h2 className="text-xl font-bold text-[#2d2d2d] mb-3 group-hover:text-[#f8b62d] transition-colors line-clamp-2">
                {post.title}
              </h2>
              <div className="mt-auto pt-4 flex items-center text-sm font-medium text-gray-600 group-hover:text-[#f8b62d]">
                Read Article <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
          <p className="text-gray-500 text-lg">No posts found yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
