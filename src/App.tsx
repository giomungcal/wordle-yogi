import { FormEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Letter from "./components/Letter";

function App() {
  type GameWords = {
    word: string;
    game:
      | "elden ring"
      | "final fantasy 14"
      | "bloodborne"
      | "stardew valley"
      | "monster hunter"
      | "harvest moon";
  };

  const gameWords: GameWords[] = [
    { word: "runes", game: "elden ring" },
    { word: "flask", game: "elden ring" },
    { word: "sword", game: "elden ring" },
    { word: "giant", game: "elden ring" },
    { word: "horse", game: "elden ring" },
    { word: "storm", game: "elden ring" },
    { word: "beast", game: "elden ring" },
    { word: "blade", game: "elden ring" },
    { word: "grave", game: "elden ring" },
    { word: "chaos", game: "elden ring" },
    { word: "ruins", game: "elden ring" },
    { word: "slash", game: "elden ring" },
    { word: "drake", game: "elden ring" },
    { word: "mages", game: "elden ring" },
    { word: "ashes", game: "elden ring" },
    { word: "stars", game: "elden ring" },
    { word: "lords", game: "elden ring" },
    { word: "torch", game: "elden ring" },
    { word: "magic", game: "elden ring" },
    { word: "armor", game: "elden ring" },
    { word: "rings", game: "elden ring" },
    { word: "tower", game: "elden ring" },
    { word: "curse", game: "elden ring" },
    { word: "blood", game: "elden ring" },
    { word: "flame", game: "elden ring" },

    { word: "fates", game: "final fantasy 14" },
    { word: "moons", game: "final fantasy 14" },
    { word: "bards", game: "final fantasy 14" },
    { word: "relic", game: "final fantasy 14" },
    { word: "omega", game: "final fantasy 14" },
    { word: "hydra", game: "final fantasy 14" },
    { word: "kings", game: "final fantasy 14" },
    { word: "light", game: "final fantasy 14" },
    { word: "order", game: "final fantasy 14" },
    { word: "glory", game: "final fantasy 14" },
    { word: "blaze", game: "final fantasy 14" },
    { word: "vivid", game: "final fantasy 14" },
    { word: "ether", game: "final fantasy 14" },
    { word: "winds", game: "final fantasy 14" },
    { word: "earth", game: "final fantasy 14" },
    { word: "quake", game: "final fantasy 14" },
    { word: "ember", game: "final fantasy 14" },
    { word: "beast", game: "final fantasy 14" },
    { word: "flame", game: "final fantasy 14" },
    { word: "chaos", game: "final fantasy 14" },

    { word: "beast", game: "bloodborne" },
    { word: "blood", game: "bloodborne" },
    { word: "blade", game: "bloodborne" },
    { word: "grave", game: "bloodborne" },
    { word: "chaos", game: "bloodborne" },
    { word: "torch", game: "bloodborne" },
    { word: "slash", game: "bloodborne" },
    { word: "witch", game: "bloodborne" },
    { word: "mages", game: "bloodborne" },
    { word: "ashes", game: "bloodborne" },
    { word: "feral", game: "bloodborne" },
    { word: "night", game: "bloodborne" },
    { word: "dream", game: "bloodborne" },
    { word: "sword", game: "bloodborne" },
    { word: "flame", game: "bloodborne" },

    { word: "crops", game: "stardew valley" },
    { word: "honey", game: "stardew valley" },
    { word: "ranch", game: "stardew valley" },
    { word: "apple", game: "stardew valley" },
    { word: "melon", game: "stardew valley" },
    { word: "plums", game: "stardew valley" },
    { word: "tools", game: "stardew valley" },
    { word: "seeds", game: "stardew valley" },
    { word: "mines", game: "stardew valley" },
    { word: "beach", game: "stardew valley" },
    { word: "trees", game: "stardew valley" },
    { word: "barns", game: "stardew valley" },
    { word: "river", game: "stardew valley" },
    { word: "peach", game: "stardew valley" },
    { word: "maple", game: "stardew valley" },
    { word: "grass", game: "stardew valley" },
    { word: "berry", game: "stardew valley" },
    { word: "wheat", game: "stardew valley" },
    { word: "slime", game: "stardew valley" },
    { word: "fruit", game: "stardew valley" },
    { word: "goats", game: "stardew valley" },
    { word: "fence", game: "stardew valley" },
    { word: "roses", game: "stardew valley" },
    { word: "beans", game: "stardew valley" },
    { word: "grain", game: "stardew valley" },
    { word: "sheep", game: "stardew valley" },

    { word: "fangs", game: "monster hunter" },
    { word: "sword", game: "monster hunter" },
    { word: "scale", game: "monster hunter" },
    { word: "claws", game: "monster hunter" },
    { word: "talon", game: "monster hunter" },
    { word: "armor", game: "monster hunter" },
    { word: "flare", game: "monster hunter" },
    { word: "quest", game: "monster hunter" },
    { word: "horns", game: "monster hunter" },
    { word: "skins", game: "monster hunter" },
    { word: "traps", game: "monster hunter" },
    { word: "bombs", game: "monster hunter" },
    { word: "carve", game: "monster hunter" },
    { word: "faint", game: "monster hunter" },
    { word: "mount", game: "monster hunter" },
    { word: "flash", game: "monster hunter" },
    { word: "slash", game: "monster hunter" },
    { word: "flame", game: "monster hunter" },
    { word: "melee", game: "monster hunter" },

    { word: "crops", game: "harvest moon" },
    { word: "dairy", game: "harvest moon" },
    { word: "field", game: "harvest moon" },
    { word: "wheat", game: "harvest moon" },
    { word: "fence", game: "harvest moon" },
    { word: "barns", game: "harvest moon" },
    { word: "horse", game: "harvest moon" },
    { word: "sheep", game: "harvest moon" },
    { word: "fruit", game: "harvest moon" },
    { word: "grass", game: "harvest moon" },
    { word: "ranch", game: "harvest moon" },
    { word: "peach", game: "harvest moon" },
    { word: "plums", game: "harvest moon" },
    { word: "beans", game: "harvest moon" },
    { word: "maple", game: "harvest moon" },
    { word: "berry", game: "harvest moon" },
    { word: "river", game: "harvest moon" },
    { word: "trees", game: "harvest moon" },
    { word: "grape", game: "harvest moon" },
    { word: "honey", game: "harvest moon" },
    { word: "roses", game: "harvest moon" },
    { word: "mines", game: "harvest moon" },
    { word: "apple", game: "harvest moon" },
    { word: "tools", game: "harvest moon" },
    { word: "grain", game: "harvest moon" },
    { word: "bloom", game: "harvest moon" },
    { word: "chick", game: "harvest moon" },
    { word: "daisy", game: "harvest moon" },
    { word: "melon", game: "harvest moon" },
    { word: "seeds", game: "harvest moon" },
  ];

  type WordleWord = {
    word: string;
    game: string;
  };

  const [wordleWord, setWordleWord] = useState<WordleWord>({
    word: "",
    game: "",
  });

  // Fetch a new wordle at mount - NOT USING THIS SINCE I CREATE MY OWN DATABASE OF WORDS
  // useEffect(() => {
  //   async function fetchWord() {
  //     try {
  //       const response = await fetch(
  //         "https://api.datamuse.com/words?sp=?????&max=1000"
  //       );
  //       const data = await response.json();
  //       const randomNumber = Math.floor(Math.random() * 1000);

  //       setWordleWord(data[randomNumber].word);
  //     } catch (error) {
  //       console.error("Error fetching the word:", error);
  //     }
  //   }

  //   fetchWord();
  // }, []);

  const mountCountRef = useRef(0);

  useEffect(() => {
    if (mountCountRef.current === 1) {
      const randomNumber: number = Math.floor(Math.random() * gameWords.length);
      setWordleWord(gameWords[randomNumber]);
      return;
    }
    mountCountRef.current += 1;
  }, []);

  const [guessWord, setGuessWord] = useState("");

  type ResultsArrayType = {
    [key: string]: number[];
  };

  const [resultsArray, setResultsArray] = useState<ResultsArrayType>({});

  const [numberOfAttempts, setNumberOfAttempts] = useState<number>(0);
  const [isGameComplete, setIsGameComplete] = useState<boolean>(false);

  const guessedWordsArray: string[] = Object.keys(resultsArray);
  const didUserAttemptToGuess: boolean = guessedWordsArray.length > 0;

  async function handleWordSubmit(e: FormEvent) {
    e.preventDefault();

    const word: string = guessWord.toLowerCase();
    setGuessWord("");

    const isGuessWord5Letters: boolean = word.length === 5;

    // Note: Not needed anymore since input is hidden once complete
    // if (isGameComplete) {
    //   toast.success("CLICK RESTART :>");
    //   return;
    // }

    if (guessedWordsArray.some((key) => key === word)) {
      toast.error("Word already guessed");
      return;
    }

    if (isGuessWord5Letters) {
      const result: number[] | undefined = await isValidWord(word);

      if (result && result.every((num) => num === 2)) {
        toast.success("You have guessed the word!");
        setIsGameComplete(true);
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
          const wordleWord_LOWERCASE = wordleWord["word"].toLowerCase();
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

  function handleResetGame() {
    const randomNumber: number = Math.floor(Math.random() * 150);
    setWordleWord(gameWords[randomNumber]);
    setResultsArray({});
    setIsGameComplete(false);
    setNumberOfAttempts(0);
    setGuessWord("");
  }

  return (
    <div className="h-screen flex justify-center items-center m-6">
      <div className="silkscreen-regular w-[440px] h-[590px] sm:h-[720px] bg-[#5CE849] rounded-3xl">
        <Toaster position="top-right" />
        <div className="w-full flex justify-end">
          <div
            onClick={handleResetGame}
            className="bg-[#FFF838] cursor-pointer rounded-md mt-8 mr-8 p-2 shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="20"
              viewBox="0 0 32 32"
            >
              <path
                d="M22 3A1 1 0 1022 5 1 1 0 1022 3zM19 3A1 1 0 1019 5 1 1 0 1019 3zM16 3A1 1 0 1016 5 1 1 0 1016 3zM13 3A1 1 0 1013 5 1 1 0 1013 3zM10 3A1 1 0 1010 5 1 1 0 1010 3zM25 6A1 1 0 1025 8 1 1 0 1025 6zM7 6A1 1 0 107 8 1 1 0 107 6zM4 9A1 1 0 104 11 1 1 0 104 9zM4 15A1 1 0 104 17 1 1 0 104 15zM25 21A1 1 0 1025 23 1 1 0 1025 21zM28 9A1 1 0 1028 11 1 1 0 1028 9zM4 12A1 1 0 104 14 1 1 0 104 12zM28 12A1 1 0 1028 14 1 1 0 1028 12zM28 15A1 1 0 1028 17 1 1 0 1028 15zM28 18A1 1 0 1028 20 1 1 0 1028 18zM10 24A1 1 0 1010 26 1 1 0 1010 24zM13 21A1 1 0 1013 23 1 1 0 1013 21zM16 18A1 1 0 1016 20 1 1 0 1016 18zM13 27A1 1 0 1013 29 1 1 0 1013 27zM16 30A1 1 0 1016 32 1 1 0 1016 30zM22 24A1 1 0 1022 26 1 1 0 1022 24zM19 24A1 1 0 1019 26 1 1 0 1019 24zM16 24A1 1 0 1016 26 1 1 0 1016 24zM13 24A1 1 0 1013 26 1 1 0 1013 24z"
                fill="black"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mb-2">
          <h2 className="text-black text-sm">the word is about</h2>
          <h1 className="silkscreen-regular text-black text-xl sm:text-3xl  mt-[-6px] ">
            {wordleWord.game.toUpperCase()}
          </h1>
          <h3
            style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            className="text-[#FFF838] drop-shadow-2xl mt-[-6px]"
          >
            wordle by yogi
          </h3>
        </div>

        <div className="flex flex-col justify-center items-center w-full h-[75%]">
          <div className="h-[70%] flex flex-col justify-start items-center">
            {didUserAttemptToGuess &&
              guessedWordsArray.map((word, index) => (
                <div
                  key={index}
                  className="word-container flex justify-center space-x-2 items-center mb-2 w-full"
                >
                  {resultsArray[word].map((num, index) => {
                    let color: string = "bg-[#383333]";
                    let textColor: string = "text-white";
                    if (num == 2) {
                      color = "bg-[#4ACC2A]";
                      textColor = "text-[#313030]";
                    } else if (num === 1) {
                      color = "bg-[#FFF838]";
                      textColor = "text-[#313030]";
                    }
                    return (
                      <Letter
                        key={index}
                        letter={word[index].toUpperCase()}
                        color={color}
                        textColor={textColor}
                      />
                    );
                  })}
                </div>
              ))}
          </div>
          <div className="sm:mt-8">
            {isGameComplete || numberOfAttempts === 6 ? (
              <>
                <div
                  onClick={handleResetGame}
                  className="cursor-pointer text-[#FFF70F] bg-slate-900 shadow-2xl p-4 text-xl self-center flex flex-col justify-center items-center"
                >
                  <h3>WORD: {wordleWord.word}</h3>
                  <p className="text-xs text-[#4ACC2A]">restart</p>
                </div>
              </>
            ) : (
              <form onSubmit={(e) => handleWordSubmit(e)}>
                <input
                  type="text"
                  maxLength={5}
                  minLength={5}
                  placeholder="guess"
                  onChange={(e) => setGuessWord(e.target.value)}
                  className="border-none w-[220px] h-[55px] bg-[#302C27] text-white text-xl text-center"
                  value={guessWord}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
