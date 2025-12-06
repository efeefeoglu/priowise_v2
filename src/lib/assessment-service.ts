import { supabase } from './db';

export interface AssessmentState {
  userId: string;
  answers: Record<string, string>;
  currentQuestionIndex: number;
  status: 'in_progress' | 'completed';
  language: string;
}

export async function getAssessment(userId: string): Promise<AssessmentState> {
  const { data, error } = await supabase
    .from('user_assessments')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code === 'PGRST116') {
    // Not found, create new
    return createAssessment(userId);
  }

  if (error) {
    console.error('Error fetching assessment:', error);
    throw error;
  }

  return {
    userId: data.user_id,
    answers: data.answers || {},
    currentQuestionIndex: data.current_question_index,
    status: data.status,
    language: data.language
  };
}

export async function createAssessment(userId: string): Promise<AssessmentState> {
  const newState = {
    user_id: userId,
    answers: {},
    current_question_index: 0,
    status: 'in_progress',
    language: 'en'
  };

  const { error } = await supabase
    .from('user_assessments')
    .insert(newState);

  if (error) {
    console.error('Error creating assessment:', error);
    throw error;
  }

  return {
    userId,
    answers: {},
    currentQuestionIndex: 0,
    status: 'in_progress',
    language: 'en'
  };
}

export async function updateAssessment(userId: string, updates: Partial<AssessmentState>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dbUpdates: Record<string, any> = {};
  if (updates.answers) dbUpdates.answers = updates.answers;
  if (updates.currentQuestionIndex !== undefined) dbUpdates.current_question_index = updates.currentQuestionIndex;
  if (updates.status) dbUpdates.status = updates.status;
  if (updates.language) dbUpdates.language = updates.language;

  dbUpdates.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('user_assessments')
    .update(dbUpdates)
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating assessment:', error);
    throw error;
  }
}
