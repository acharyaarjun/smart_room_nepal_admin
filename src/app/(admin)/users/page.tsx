import { RequireAuthProvider } from "@/providers";
import { Users } from "@/components/users";

export default function page() {
  return (
    <RequireAuthProvider roles={["admin"]}>
      <Users />
    </RequireAuthProvider>
  );
}
