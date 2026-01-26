'use server';

import { supabase } from '@/lib/db';
import { currentUser } from '@clerk/nextjs/server';

export interface Notification {
  id: string;
  user_email: string;
  title: string;
  message: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export async function getUserNotifications(): Promise<Notification[]> {
  const user = await currentUser();

  if (!user || !user.emailAddresses.length) {
    return [];
  }

  // Get all emails for the user to be safe, or just the primary?
  // Usually notifications are sent to a specific email, but if the user has multiple linked,
  // we might want to check all. However, simplicity first: check against all emails.
  const emails = user.emailAddresses.map(e => e.emailAddress);

  if (emails.length === 0) return [];

  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .in('user_email', emails)
    .order('created_at', { ascending: false })
    .limit(50); // Limit to last 50 notifications

  if (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }

  return data as Notification[];
}

export async function markNotificationAsRead(id: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  // Verify the notification belongs to the user before updating
  // We can do this by adding a filter in the update query
  const emails = user.emailAddresses.map(e => e.emailAddress);

  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', id)
    .in('user_email', emails);

  if (error) {
    console.error('Error marking notification as read:', error);
    throw new Error('Failed to update notification');
  }
}

export async function markAllNotificationsAsRead() {
    const user = await currentUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    const emails = user.emailAddresses.map(e => e.emailAddress);

    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .in('user_email', emails)
      .eq('is_read', false);

    if (error) {
      console.error('Error marking all notifications as read:', error);
      throw new Error('Failed to update notifications');
    }
}
