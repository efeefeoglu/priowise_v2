'use server';

import { auth } from '@clerk/nextjs/server';
import { getOnboardingStatus, updateOnboardingStep } from '@/lib/onboarding-service';
import { revalidatePath } from 'next/cache';

export async function fetchOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  return await getOnboardingStatus(userId);
}

export async function markRoadmapHasItems() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  await updateOnboardingStep(userId, { has_roadmap_items: true });
  revalidatePath('/dashboard');
}

export async function markScoringRun() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('Unauthorized');
  }

  await updateOnboardingStep(userId, { has_run_scoring: true });
  revalidatePath('/dashboard');
}
