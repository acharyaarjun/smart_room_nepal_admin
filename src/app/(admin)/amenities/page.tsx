import { RequireAuthProvider } from "@/providers";
import { Amenity } from "@/components/amenity";

export default function page() {
  return (
    <RequireAuthProvider roles={["admin"]}>
      <Amenity />
    </RequireAuthProvider>
  );
}
