import { RequireAuthProvider } from "@/providers";
import { Rooms } from "@/components/rooms";

export default function page() {
  return (
    <RequireAuthProvider roles={["admin"]}>
      <Rooms />
    </RequireAuthProvider>
  );
}
