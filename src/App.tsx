import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Letter from "./components/Letter";

function App() {
  const [wordleWord, setWordleWord] = useState<string>("");

  // Fetch a new wordle at mount
  useEffect(() => {
    async function fetchWord() {
      try {
        const response = await fetch(
          "https://api.datamuse.com/words?sp=?????&max=1000"
        );
        const data = await response.json();
        const randomNumber = Math.floor(Math.random() * 1000);

        setWordleWord(data[randomNumber].word);
      } catch (error) {
        console.error("Error fetching the word:", error);
      }
    }

    fetchWord();
  }, []);

  const [guessWord, setGuessWord] = useState("");

  type ResultsArrayType = {
    [key: string]: number[];
  };

  const [resultsArray, setResultsArray] = useState<ResultsArrayType>({});
  const [numberOfAttempts, setNumberOfAttempts] = useState(0);
  const [isWordGuessedAlready, setIsWordGuessedAlready] =
    useState<boolean>(false);

  const guessedWordsArray: string[] = Object.keys(resultsArray);
  const didUserAttemptToGuess: boolean = guessedWordsArray.length > 0;

  async function handleWordSubmit(e) {
    e.preventDefault();

    const word: string = guessWord.toLowerCase();
    setGuessWord("");

    const isGuessWord5Letters: boolean = word.length === 5;

    if (isWordGuessedAlready) {
      toast.success("Challenge completed!");
      return;
    }

    if (numberOfAttempts === 6) {
      toast.error("You have reached 6 attempts.");
      return;
    }

    if (guessedWordsArray.some((key) => key === word)) {
      toast.error("Word already guessed");
      return;
    }

    if (isGuessWord5Letters) {
      const result: number[] | undefined = await isValidWord(word);

      if (result && result.every((num) => num === 2)) {
        toast.success("You have guessed the word!");
        setIsWordGuessedAlready(true);
      }

      if (result) {
        setResultsArray((prevState) => ({ ...prevState, [word]: result }));
        setNumberOfAttempts((prev) => prev + 1);
      }
    }
  }

  async function isValidWord(word: string) {
    try {
      const response = await fetch(
        `https://api.datamuse.com/words?sp=${word}&max=1`
      );
      const data = await response.json();

      const isWordValid: boolean = data.length && data[0].word === word;

      if (!isWordValid) {
        toast.error("Word does not exist!");
        setGuessWord("");
        return;
      }

      const guessWordArray: string[] = guessWord.toLowerCase().split("");

      const includedInTheWordArray: number[] = guessWordArray.map(
        (letter, index) => {
          const wordleWord_LOWERCASE = wordleWord.toLowerCase();
          const isSameLetter: boolean = wordleWord_LOWERCASE[index] === letter;
          const letterDoesNotExist: boolean = !wordleWord_LOWERCASE.includes(
            letter.toLowerCase()
          );

          if (letterDoesNotExist) {
            return 0;
          }

          if (isSameLetter) {
            return 2;
          } else {
            return 1;
          }
        }
      );

      return includedInTheWordArray;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-[500px] h-[720px] bg-slate-800 flex flex-col justify-center items-center mx-auto">
      <Toaster position="top-right" />
      <form onSubmit={(e) => handleWordSubmit(e)}>
        <input
          type="text"
          maxLength={5}
          minLength={5}
          onChange={(e) => setGuessWord(e.target.value)}
          value={guessWord}
        />
      </form>
      <div className="flex flex-col justify-center items-center w-full h-[70%] p-8">
        <div className="results-container w-[70%] h-full">
          {didUserAttemptToGuess &&
            guessedWordsArray.map((word, index) => (
              <div
                key={index}
                className="word-container flex justify-around items-center mb-4"
              >
                {resultsArray[word].map((num, index) => {
                  let color: string = "bg-slate-600";
                  if (num == 2) {
                    color = "bg-green-700";
                  } else if (num === 1) {
                    color = "bg-yellow-500";
                  }
                  return (
                    <Letter key={index} letter={word[index]} color={color} />
                  );
                })}
              </div>
            ))}
          {numberOfAttempts === 6 && (
            <h1 className="text-white text-4xl">{wordleWord}</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
