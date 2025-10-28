import { RequireAuthProvider } from "@/providers";
import { Reviews } from "@/components/reviews";

export default function page() {
  return (
    <RequireAuthProvider roles={["admin"]}>
      <Reviews />
    </RequireAuthProvider>
  );
}
