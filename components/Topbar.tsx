import Image from "next/image";

const Topbar = () => {
  return (
    <div className="border-b border-[var(--light-gray)]">
      <div className="flex items-center justify-between px-5 py-2">
        <h1 className="text-5xl font-semibold">notes</h1>

        <Image
          src={"/icons/user.svg"}
          alt="user"
          width={20}
          height={20}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Topbar;
