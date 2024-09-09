import { FormEvent } from "react";

interface InputFieldProps {
  screenVisibility: string;
  handleWordSubmit: (e: FormEvent) => void;
  isSearchingTheWord: boolean;
  setGuessWord: (word: string) => void;
  guessWord: string;
}

function InputField({
  screenVisibility,
  handleWordSubmit,
  isSearchingTheWord,
  setGuessWord,
  guessWord,
}: InputFieldProps) {
  return (
    <form
      className={`${screenVisibility} mb-8`}
      onSubmit={(e) => handleWordSubmit(e)}
    >
      <input
        type="text"
        maxLength={5}
        minLength={5}
        placeholder={isSearchingTheWord ? "SEARCHING" : "GUESS"}
        onChange={(e) => setGuessWord(e.target.value)}
        className="border-none w-[220px] h-[55px] bg-[#302C27] text-white text-xl text-center"
        value={guessWord}
      />
    </form>
  );
}

export default InputField;
