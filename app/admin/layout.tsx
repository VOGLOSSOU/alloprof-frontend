import { Suspense } from "react";
import { FullPageLoader, RequireRole } from "@/lib/auth";
import { AdminShell } from "@/components/layout/admin-shell";

export default function Layout({ children }: LayoutProps<"/admin">) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <RequireRole role="ADMIN">
        <AdminShell>{children}</AdminShell>
      </RequireRole>
    </Suspense>
  );
}
