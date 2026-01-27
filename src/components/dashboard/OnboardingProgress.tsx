'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';
import { OnboardingStatus } from '@/lib/onboarding-service';
import { usePathname } from 'next/navigation';

interface Step {
  id: string;
  label: string;
  href: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isDisabled: boolean;
}

interface OnboardingProgressProps {
  status: OnboardingStatus | null;
}

export default function OnboardingProgress({ status }: OnboardingProgressProps) {
  const pathname = usePathname();

  // Define steps
  // Logic:
  // Welcome: Always Completed (since they are in dashboard)
  // Assessment: Completed if status.hasCompletedAssessment
  // Roadmap: Completed if status.hasRoadmapItems
  // Scoring: Completed if status.hasRunScoring
  // Summary: Completed if they viewed it? Or just the end goal. Let's make it the final step.

  if (!status) return null;

  const steps: Step[] = [
    {
      id: 'welcome',
      label: 'Welcome',
      href: '/dashboard',
      isCompleted: true, // Always done if they are here
      isCurrent: false,
      isDisabled: false
    },
    {
      id: 'assessment',
      label: 'First Assessment',
      href: '/dashboard/assessment',
      isCompleted: status.hasCompletedAssessment,
      isCurrent: !status.hasCompletedAssessment,
      isDisabled: false
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      href: '/dashboard/roadmap',
      isCompleted: status.hasRoadmapItems,
      isCurrent: status.hasCompletedAssessment && !status.hasRoadmapItems,
      isDisabled: !status.hasCompletedAssessment
    },
    {
      id: 'scoring',
      label: 'Scoring',
      href: '/dashboard/roadmap', // Same page as Roadmap but different action
      isCompleted: status.hasRunScoring,
      isCurrent: status.hasCompletedAssessment && status.hasRoadmapItems && !status.hasRunScoring,
      isDisabled: !status.hasRoadmapItems
    },
    {
      id: 'summary',
      label: 'Summary',
      href: '/dashboard/summary',
      isCompleted: false, // It's the destination
      isCurrent: status.hasRunScoring,
      isDisabled: !status.hasRunScoring
    }
  ];

  // Refine isCurrent logic:
  // Usually only one item is "Current".
  // If user has completed everything, Summary is Current (or Completed?).
  // Let's say Summary is the final view.

  // Override isCurrent based on first incomplete step
  let foundCurrent = false;
  const computedSteps = steps.map((step, idx) => {
     // Welcome is always completed.
     if (step.id === 'welcome') return { ...step, isCurrent: false };

     // For others, if previous is completed and this is not, it's current.
     const prevStep = steps[idx - 1];
     if (prevStep.isCompleted && !step.isCompleted && !foundCurrent) {
         foundCurrent = true;
         return { ...step, isCurrent: true };
     }

     // If all previous are completed (including this one), it's not current (it's completed).
     // Unless it's the last step (Summary), which stays current if everything before is done.
     if (step.id === 'summary' && prevStep.isCompleted) {
         return { ...step, isCurrent: true, isDisabled: false };
     }

     return { ...step, isCurrent: false };
  });

  return (
    <div className="border-b border-gray-100 px-6 py-4">
      <div className="flex items-center min-w-max space-x-2">
        {computedSteps.map((step, idx) => (
          <React.Fragment key={step.id}>
            {/* Divider */}
            {idx > 0 && (
              <ChevronRight className={`w-4 h-4 mx-2 ${step.isDisabled ? 'text-gray-200' : 'text-gray-400'}`} />
            )}

            {/* Step Item */}
            <Link
               href={step.isDisabled ? '#' : step.href}
               className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-full transition-all text-sm font-medium
                  ${step.isCompleted
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : step.isCurrent
                          ? 'bg-brand-yellow text-black shadow-sm ring-1 ring-black/5'
                          : 'bg-gray-50 text-gray-400 cursor-not-allowed'}
               `}
               aria-disabled={step.isDisabled}
               onClick={(e) => step.isDisabled && e.preventDefault()}
            >
               {step.isCompleted ? (
                   <Check className="w-4 h-4" />
               ) : (
                   <span className={`flex items-center justify-center w-4 h-4 rounded-full text-[10px] ${step.isCurrent ? 'bg-black/10' : 'bg-gray-200 text-gray-500'}`}>
                       {idx + 1}
                   </span>
               )}
               {step.label}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
