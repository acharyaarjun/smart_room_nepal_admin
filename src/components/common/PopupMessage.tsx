"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { removeMessage } from "@/redux/features/popupMessageSlice";

interface PopupMessageProps {
  messageShowOn: string | null;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ messageShowOn }) => {
  const dispatch = useDispatch();
  const { message, type, showOn } = useSelector(
    (state: RootState) => state.popupMessage
  );

  const [localMessage, setLocalMessage] = useState<string | null>(null);
  const [localType, setLocalType] = useState<
    "success" | "error" | "info" | "warning" | null
  >(null);

  useEffect(() => {
    if (message && showOn === messageShowOn) {
      setLocalMessage(message);
      setLocalType(type);

      // Set timeout to clear the local message state after 5 seconds
      const timer = setTimeout(() => {
        dispatch(removeMessage());
        setLocalMessage(null);
        setLocalType(null);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setLocalMessage(null);
      setLocalType(null);
    }
  }, [message, type, showOn, messageShowOn, dispatch]);

  // If localMessage is null, do not render anything
  if (!localMessage) return null;

  // Render the popup message with appropriate styles based on type
  return (
    <div
      className={`z-50 mb-4 w-full rounded px-4 py-[15px] text-sm text-white ${getTypeClass(
        localType
      )}`}
    >
      {localMessage}
    </div>
  );
};

// Utility function to get CSS class based on message type
const getTypeClass = (
  type: "success" | "error" | "info" | "warning" | null
): string => {
  switch (type) {
    case "success":
      return "bg-[#58b15c]/90";
    case "error":
      return "bg-[#f04f43]/90";
    case "info":
      return "bg-[#3899f0]/90";
    case "warning":
      return "bg-[#f9c758]/90";
    default:
      return "";
  }
};

export default PopupMessage;
