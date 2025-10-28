import { RequireAuthProvider } from "@/providers";
import { RoomRequests } from "@/components/room-requests";

export default function page() {
  return (
    <RequireAuthProvider roles={["admin"]}>
      <RoomRequests />
    </RequireAuthProvider>
  );
}
