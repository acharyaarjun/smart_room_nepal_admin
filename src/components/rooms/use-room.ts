"use client";
import { useState, FormEvent } from "react";
import { Room, RoomForm } from "@/types/room";
import { updateRoom } from "@/services/roomService";
import { toast } from "react-hot-toast";

export const useRoom = (
  room: Room,
  updateItemInList: (updatedItem: Room, id: number) => void,
  onClose: () => void
) => {
  const [formData, setFormData] = useState<RoomForm>({
    roomStatus: room.roomStatus,
    isFeatured: room.isFeatured,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.roomStatus) {
      setError("Room status is required");
      toast.error("Room status is required", { id: "toast" });
      return;
    }

    setLoading(true);

    try {
      const response = await updateRoom(formData, room.slug);
      toast.success("Room updated successfully", { id: "toast" });
      updateItemInList(response.data, room.id);
      onClose();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Something went wrong";
      toast.error(errorMessage, { id: "toast" });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    error,
    loading,
    handleSubmit,
  };
};
