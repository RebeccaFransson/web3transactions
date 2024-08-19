export const Toggle = ({
  values,
  activeIndex,
  onClick,
}: {
  values: string[];
  activeIndex: number;
  onClick: (index: number) => void;
}) => {
  return (
    <div className="flex gap-2 bg-gray-100 rounded">
      {values.map((value, index) => (
        <button
          key={value}
          className={`${
            index === activeIndex
              ? " border-pink-200  bg-pink-100 text-pink-400"
              : " border-transparent text-gray-400"
          } border rounded py-1 px-2`}
          onClick={() => onClick(index)}
        >
          <span className="text-sm sm:text-base font-bold ">{value}</span>
        </button>
      ))}
    </div>
  );
};
