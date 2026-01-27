'use server'

import { supabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';
import { ADMIN_EMAILS } from '@/lib/constants';

export interface BlogPostInput {
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  is_published: boolean;
  created_at: string;
}

async function checkAdminAccess() {
  const user = await currentUser();
  const hasAccess = user?.emailAddresses.some(e => ADMIN_EMAILS.includes(e.emailAddress));

  if (!hasAccess) {
    throw new Error('Unauthorized');
  }
}

export async function uploadImage(formData: FormData) {
  await checkAdminAccess();

  const file = formData.get('file') as File;
  if (!file) {
    throw new Error('No file uploaded');
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

  // Use admin client (supabase from lib/db) for upload
  const { data, error } = await supabase
    .storage
    .from('blog-images')
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload image');
  }

  const { data: { publicUrl } } = supabase
    .storage
    .from('blog-images')
    .getPublicUrl(fileName);

  return publicUrl;
}

export async function uploadPostImages(formData: FormData) {
  await checkAdminAccess();

  const files = formData.getAll('files') as File[];
  if (!files || files.length === 0) {
    throw new Error('No files uploaded');
  }

  const uploadedImages = [];

  for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

      const { error } = await supabase
        .storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error for file ' + file.name, error);
        throw new Error('Failed to upload image ' + file.name);
      }

      const { data: { publicUrl } } = supabase
        .storage
        .from('blog-images')
        .getPublicUrl(fileName);

      uploadedImages.push({ url: publicUrl, name: file.name });
  }

  return uploadedImages;
}

export async function upsertPost(postData: BlogPostInput, id?: string) {
  await checkAdminAccess();

  const payload = {
    ...postData,
  };

  let error;

  if (id) {
    // Update
    const result = await supabase
      .from('posts')
      .update(payload)
      .eq('id', id);
    error = result.error;
  } else {
    // Create
    const result = await supabase
      .from('posts')
      .insert([payload]);
    error = result.error;
  }

  if (error) {
    console.error('Upsert error:', error);
    throw new Error('Failed to save post: ' + error.message);
  }

  revalidatePath('/blog');
  revalidatePath('/admin');

  redirect('/admin');
}

export async function deletePost(id: string) {
  await checkAdminAccess();

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete post');
  }

  revalidatePath('/blog');
  revalidatePath('/admin');
}

export async function getAdminPosts() {
  await checkAdminAccess();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Fetch error:', error);
    return [];
  }

  return data;
}

export async function getAdminPostById(id: string) {
    await checkAdminAccess();

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }
    return data;
}
