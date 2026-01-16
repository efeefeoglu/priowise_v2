import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Create New Post</h2>
      <PostForm />
    </div>
  );
}
