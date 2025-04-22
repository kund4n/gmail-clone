import { useState, useRef } from "react";
import "./App.css";

type Badge = {
  title: string;
  id: number;
};

type SearchKeywords = {
  word: string;
  id: number;
};

// type SuggestedWords = {};

const searchKeywords: SearchKeywords[] = [
  { word: "Kundan Da", id: 1 },
  { word: "Rupesh Bhaiya", id: 2 },
  { word: "Sachin Bhaiya", id: 3 },
  { word: "Jeetu Bhaiya", id: 4 },
  { word: "Malay Da", id: 5 },
  { word: "Prajwal Bhau", id: 6 },
  { word: "IPL live score", id: 7 },
  { word: "Cricket score", id: 8 },
  { word: "Nearby restaurants", id: 9 },
  { word: "Best street food in Nagpur", id: 10 },
  { word: "How to link PAN with Aadhaar", id: 11 },
  { word: "Train running {props.options}status", id: 12 },
];

let id = 0;

// Index for arrow keys
let currIndex = -1;
function App() {
  const [inputVal, setInpVal] = useState("");

  // Set hidden or visible Suggestion box
  const [suggestion, setSuggestionState] = useState("hidden");

  // Set state for Suggestion
  const [suggestedWords, setSuggestedWords] = useState([]);

  // Setting badges state
  const [badges, setBadges] = useState<Badge[]>([]);

  // Hide or show search suggestions
  const hideOrShowSuggestion = () => {
    if (!inputVal) {
      setSuggestionState("hidden");
    }
  };

  // State for hover
  const [activeIndex, setActiveIndex] = useState(-1);

  // Add Entries function
  const addEntry = (value) => {
    addBadgeAndClearInput(value);
  };

  // Add badge and clear input function
  const addBadgeAndClearInput = (value) => {
    setBadges([...badges, { title: value, id: id++ }]);
    // console.log(badges);

    // Set input value to blank
    setInpVal("");

    // Hide the suggestion div
    setSuggestionState("hidden");
  };

  // Filter function for search functionality
  const initiateSearch = () => {
    if (inputVal) {
      const filteredSearchWords = searchKeywords.filter((keyWord) =>
        keyWord.word.toLowerCase().includes(inputVal.toLocaleLowerCase())
      );
      if (filteredSearchWords.length) {
        setSuggestedWords([...filteredSearchWords]);
        setSuggestionState("");
      }
      // console.log(suggestedWords);
    }
  };

  // For autofocus on input field
  const inputRef = useRef(null);

  return (
    <>
      <div
        className="flex flex-col items-center"
        onKeyUp={(e) => {
          if (e.code === "Escape") {
            setSuggestionState("hidden");
            currIndex = -1;
          }
        }}
        onKeyDown={(e) => {
          setActiveIndex(-1);
          // console.log(`sugg = ${suggestedWords.length}`);
          // (e) => console.log(e.code);
          // let totalSuggestionsLength = suggestedWords.length;
          if (e.code === "ArrowDown") {
            e.preventDefault();
            if (
              suggestedWords.length !== 0 &&
              currIndex < suggestedWords.length - 1
            ) {
              currIndex++;
              setActiveIndex(currIndex);
            }
            console.log(currIndex);
          } else if (e.code === "ArrowUp") {
            e.preventDefault();
            if (!currIndex) {
              currIndex = 0;
            }
            if (suggestedWords.length !== 0 && currIndex > -1) {
              currIndex--;
              setActiveIndex(currIndex);
            }
            console.log(currIndex);
          } else if (e.code === "Enter" && currIndex !== -1) {
            e.preventDefault();
            // setInpVal(suggestedWords[currIndex]["word"]);
            addEntry(suggestedWords[currIndex]["word"]);
          } else if (e.code === "Enter" && currIndex === -1) {
            e.preventDefault();
            addEntry(inputVal);
          }
        }}
      >
        <div>
          <input
            className="border-[2px] border-solid p-2 my-8 mx-2 min-w-[20rem] text-black relative bg-white"
            value={inputVal}
            onChange={(e) => {
              setInpVal(e.target.value);
            }}
            onKeyUp={() => {
              // Hide suggestion box on empty value
              hideOrShowSuggestion();
              initiateSearch();
            }}
            ref={inputRef}
            // ***
            // onKeyDown={() => (currIndex = -1)}
          />
          <button
            className="bg-[#04c704] p-2 px-6 cursor-pointer"
            onClick={() => {
              addEntry(inputVal);
              currIndex = -1;
            }}
          >
            Enter
          </button>
        </div>
        {badges.map((badge, i) => {
          // console.log(badges);
          return (
            // Div for new entries
            <div className="bg-[#f91075] p-2 px-4 m-2 rounded-full text-white select-none">
              {badge.title}
              {/* <pre>{JSON.stringify(badge)}</pre> */}
              <button
                className="pl-4 cursor-pointer"
                onClick={() => {
                  const newArr = [...badges];
                  newArr.splice(i, 1);
                  setBadges([...newArr]);
                }}
              >
                X
              </button>
            </div>
          );
        })}
        {/* Div for showing search suggestion */}
        <div
          className={`bg-[#c8c8c8] px-4 py-2 z-[100] absolute top-[13%] mx-auto w-[30rem] ${suggestion}`}
        >
          {suggestedWords.map((suggestedWord, i) => {
            return (
              <p
                className={`cursor-pointer ${
                  i === activeIndex ? "selected" : ""
                } px-2`}
                onClick={() => {
                  setInpVal(suggestedWord["word"]);
                  setSuggestionState("hidden");
                  currIndex = -1;
                  inputRef.current.focus();
                }}
                onMouseOver={() => {
                  // console.log();
                  setActiveIndex(i);
                }}
              >
                {suggestedWord["word"]}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
