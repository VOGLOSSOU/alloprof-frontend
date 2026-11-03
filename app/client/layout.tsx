import { Suspense } from "react";
import { FullPageLoader, RequireRole } from "@/lib/auth";
import { ClientShell } from "@/components/layout/role-shell";

export default function Layout({ children }: LayoutProps<"/client">) {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <RequireRole role="CLIENT">
        <ClientShell>{children}</ClientShell>
      </RequireRole>
    </Suspense>
  );
}
