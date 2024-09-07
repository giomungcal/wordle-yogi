function Letter({ letter, color }) {
  return (
    <div
      className={`letter text-white text-2xl ${color} w-[50px] h-[50px] flex justify-center items-center`}
    >
      {letter}
    </div>
  );
}

export default Letter;
