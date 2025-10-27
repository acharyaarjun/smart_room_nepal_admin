import { RequireAuthProvider } from "@/providers";
import { Memberships } from "@/components/memberships";

export default function page() {
  return (
    <RequireAuthProvider roles={["admin"]}>
      <Memberships />
    </RequireAuthProvider>
  );
}
