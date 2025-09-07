import { RequireAuthProvider } from "@/providers";
import { MembershipTypes } from "@/components/membership-types";

export default function page() {
  return (
    <RequireAuthProvider roles={["admin"]}>
      <MembershipTypes />
    </RequireAuthProvider>
  );
}
