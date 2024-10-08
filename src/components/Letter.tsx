interface LetterProps {
  letter: string;
  color: string;
  textColor: string;
}

function Letter({ letter, color, textColor }: LetterProps) {
  return (
    <div
      className={`letter silkscreen-bold ${textColor} rounded-lg text-2xl ${color} w-[40px] h-[40px] sm:w-[55px] sm:h-[55px] flex justify-center items-center`}
    >
      {letter}
    </div>
  );
}

export default Letter;
