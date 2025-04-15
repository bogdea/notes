type LinkButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

const LinkButton = ({ onClick, children }: LinkButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer text-[14px] font-medium transition hover:text-[var(--dark-gray)]"
    >
      {children}
    </button>
  );
};

export default LinkButton;
