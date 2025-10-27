"use client";
import { IoClose } from "react-icons/io5";
import { Room } from "@/types/room";
import { useRoom } from "@/components/rooms";
import { FormSelectElement } from "@/components/common";
import RoomStatus from "@/enums/roomStatus";

interface UpdateRoomModalProps {
  item: Room;
  isOpen: boolean;
  onClose: () => void;
  updateItemInList: (updatedItem: Room, id: number) => void;
}

const UpdateRoomModal = ({
  item,
  isOpen,
  onClose,
  updateItemInList,
}: UpdateRoomModalProps) => {
  const { formData, setFormData, error, loading, handleSubmit } = useRoom(
    item,
    updateItemInList,
    onClose
  );

  const roomStatusOptions = Object.values(RoomStatus).map((status) => ({
    value: status,
    label: status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-3xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Update Room
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Room Name (Readonly) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Room Name
              </label>
              <input
                type="text"
                value={item.name}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-md cursor-not-allowed"
              />
            </div>

            {/* Room Status */}
            <FormSelectElement
              title="Room Status"
              name="roomStatus"
              value={formData.roomStatus}
              onChange={(e) =>
                setFormData({ ...formData, roomStatus: e.target.value })
              }
              onBlur={() => {}}
              options={roomStatusOptions}
              error={error}
              isRequired
            />

            {/* Is Featured */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mark as Featured
                </span>
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">
                Featured rooms will be highlighted on the website
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? "Updating..." : "Update Room"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoomModal;
