import { RequireAuthProvider } from "@/providers";
import { Districts } from "@/components/districts";

export default function page() {
  return (
    <RequireAuthProvider roles={["admin"]}>
      <Districts />
    </RequireAuthProvider>
  );
}
