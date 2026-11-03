import { Suspense } from "react";
import { FullPageLoader, RequireRole } from "@/lib/auth";
import { ProfShell } from "@/components/layout/role-shell";

export default function Layout({ children }: LayoutProps<"/prof">) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <RequireRole role="PROFESSEUR">
        <ProfShell>{children}</ProfShell>
      </RequireRole>
    </Suspense>
  );
}
