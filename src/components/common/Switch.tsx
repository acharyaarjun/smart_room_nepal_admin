"use client";

const Switch = ({
  status,
  id,
  changeStatus,
}: {
  status: boolean;
  id: number | string;
  changeStatus?: (id: number | string, status: boolean) => void;
}) => {
  return (
    <>
      {/* Switch Container */}
      <div
        className={`flex h-6 w-[50px] items-center ${
          status ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
        } cursor-pointer rounded-full p-[2px]`}
        onClick={() => {
          if (changeStatus) changeStatus(id, status);
        }}
      >
        {/* Switch  */}
        <div
          className={`h-5 w-5 rounded-full bg-white dark:bg-darkbg shadow-md ${
            status && "translate-x-[26px] transform"
          }`}
        ></div>
      </div>
    </>
  );
};

export default Switch;
