'use server'

import { supabase } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs/server';

export interface BlogPostInput {
  title: string;
  slug: string;
  content: string;
  featured_image: string | null;
  is_published: boolean;
}

async function checkAdminAccess() {
  const user = await currentUser();
  const allowedEmail = 'efeefeoglu@gmail.com';
  const hasAccess = user?.emailAddresses.some(e => e.emailAddress === allowedEmail);

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
