import { supabase } from './db';
import { getAssessment } from './assessment-service';

export interface OnboardingStatus {
  hasCompletedAssessment: boolean;
  hasRoadmapItems: boolean;
  hasRunScoring: boolean;
  hasViewedSummary: boolean;
}

export async function getOnboardingStatus(userId: string): Promise<OnboardingStatus> {
  // 1. Check Assessment Status
  let hasCompletedAssessment = false;
  try {
    const assessment = await getAssessment(userId);
    hasCompletedAssessment = assessment.status === 'completed';
  } catch (error) {
    console.error('Error checking assessment status:', error);
  }

  // 2. Check Onboarding Table (Roadmap & Scoring)
  let hasRoadmapItems = false;
  let hasRunScoring = false;

  const { data, error } = await supabase
    .from('user_onboarding')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (data) {
    hasRoadmapItems = data.has_roadmap_items || false;
    hasRunScoring = data.has_run_scoring || false;
  } else if (error && error.code !== 'PGRST116') {
    // Ignore "Row not found" error (PGRST116), log others
    console.error('Error checking onboarding status:', error);
  }

  // "Summary" is considered "viewed" or "active" if Scoring is run.
  // For the purpose of the progress bar, we might just check if Scoring is done to unlock Summary.
  // If we want to track if they ACTUALLY visited summary, we'd need another flag.
  // For now, let's assume if Scoring is run, they are ready for Summary.
  // The user requirement: "Roadmap -> Scoring -> Summary".
  // I'll return the raw flags.

  return {
    hasCompletedAssessment,
    hasRoadmapItems,
    hasRunScoring,
    hasViewedSummary: hasRunScoring // Simplified: if scoring run, summary is the next step/available.
  };
}

export async function updateOnboardingStep(userId: string, updates: { has_roadmap_items?: boolean; has_run_scoring?: boolean }) {
  // Check if record exists first
  const { data: existing } = await supabase
    .from('user_onboarding')
    .select('user_id')
    .eq('user_id', userId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('user_onboarding')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('user_onboarding')
      .insert({
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString() // Ensure created_at is handled by default or add it if needed
      });

    if (error) throw error;
  }
}
