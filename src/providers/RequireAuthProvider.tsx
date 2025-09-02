"use client";
import { setAuth } from "@/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { Spinner } from "@/components/common";
import { Role, User } from "@/types/user";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";

const RequireAuthProvider = ({
  children,
  roles,
}: {
  children: React.ReactNode;
  roles?: string[];
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useLayoutEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/");
    }

    const parsedUser: User | null = user ? JSON.parse(user) : null;
    if (user) {
      dispatch(setAuth(JSON.parse(user)));

      const userRole = parsedUser?.role as Role;
      if (roles && roles.length > 0 && !roles.includes(userRole.title)) {
        router.push("/unauthorized");
      }
    } else {
      router.push("/");
    }
  }, [dispatch, router, roles]);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return (
      <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-gray-100">
        <Spinner />
      </div>
    );
  }
};

export default RequireAuthProvider;
