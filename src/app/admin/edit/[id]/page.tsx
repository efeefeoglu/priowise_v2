import PostForm from '@/components/admin/PostForm';
import { getAdminPostById } from '@/app/actions/blog';
import { notFound } from 'next/navigation';

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getAdminPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Edit Post</h2>
      <PostForm initialData={post} />
    </div>
  );
}
