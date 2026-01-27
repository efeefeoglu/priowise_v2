import { fetchOnboardingStatus } from "@/app/actions/onboarding";
import DashboardClientLayout from "@/components/dashboard/DashboardClientLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = await fetchOnboardingStatus();

  return (
    <DashboardClientLayout onboardingStatus={status}>
      {children}
    </DashboardClientLayout>
  );
}
