import { Suspense } from "react";
import { FullPageLoader, RequireRole } from "@/lib/auth";
import { RoleShell } from "@/components/layout/role-shell";

export default function Layout({ children }: LayoutProps<"/compte">) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <RequireRole role={["CLIENT", "PROFESSEUR", "ADMIN"]}>
        <RoleShell>{children}</RoleShell>
      </RequireRole>
    </Suspense>
  );
}
