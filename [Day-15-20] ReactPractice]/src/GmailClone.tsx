import { useState } from "react";
import "./App.css";
import {
  EmailPopUpSuggestion,
  GmailOptionPopUp,
  // GmailPopUp,
  // SavedEmailBadges,
} from "./components/GmailPopUp";
import { ToEmailInputs } from "./components/ToEmailInputs";

// From Emails
const fromEmail = [
  { email: "kundan@teamcodesign.com", id: 0 },
  { email: "shubhankar9507@insfou.com", id: 1 },
  { email: "bekham3127@spinly.net", id: 2 },
];

// Options for emails
const popUpOptions = [
  { option: "Schedule send", state: "", id: 0 },
  { option: "Add from Contacts", state: "", id: 1 },
  { option: "Confidential mode", state: "", id: 2 },
  { option: "Save draft", state: "disabled-option", id: 3 },
  { option: "Discard", state: "", id: 4 },
  { option: "Settings", state: "", id: 5 },
  { option: "Help and feedback", state: "", id: 6 },
];

// Saved Emails
const savedEmail = [
  { email: "kundan@teamcodesign.com", id: 0, uName: "Kundan Da" },
  { email: "napster846@rediffmail.com", id: 1, uName: "Napster" },
  { email: "gecko3127@spinly.net", id: 2, uName: "Gecko" },
  { email: "han_213@gamil.com", id: 3, uName: "Han" },
  { email: "dilelob265@bauscn.com", id: 4, uName: "Busket" },
  { email: "innocent.unicorn.jfyx@letterprotect.com", id: 5, uName: "Unicorn" },
  { email: "sole.peacock.wyku@letterprotect.com", id: 6, uName: "Peacock" },
];

// Stop from submitting form
const handleSubmit = (e) => e.preventDefault();

export function GmailClone() {
  // Email Suggestion

  const [toEmail, setToEmail] = useState([]);
  const [toCCEmail, setToCCEmail] = useState([]);
  const [toBCCEmail, setToBCCEmail] = useState([]);

  // Setting up default mail id in from field
  const [fromEmailData, setFromEmailData] = useState(fromEmail[0]["email"]);
  const [optionsPopUpState, setOptionsPopUpState] = useState("hidden");

  // Suggestions for From To ToCC ToBCC
  const [fromEmailPopUpState, setFromEmailPopUpState] = useState("hidden");
  const [toEmailPopUpState, setToEmailPopUpState] = useState("hidden");
  const [toCCPopUpState, setToCCPopUpState] = useState("hidden");
  const [toBCCPopUpState, setToBCCPopUpState] = useState("hidden");

  // Input Value for To CC and BCC
  const [toInputVal, setToInputVal] = useState("");
  const [CCInputVal, setCCInputVal] = useState("");
  const [BCCInputVal, setBCCInputVal] = useState("");

  // Badges for To CC abd BCC
  const [toEmailBadge, setToEmailBadge] = useState([]);
  const [CCEmailBadge, setCCEmailBadge] = useState([]);
  const [BCCEmailBadge, setBCCEmailBadge] = useState([]);

  // Right side down-arrow Button on To input
  const [downArrowBtnState, setDownArrowBtnState] = useState("");

  // Hiding CC and BCC
  const [CCstate, setCCState] = useState("hidden");
  const [BCCstate, setBCCState] = useState("hidden");

  // Hide the option and suggestion Popups
  const hideOptionPopup = () => {
    optionsPopUpState === "" ? setOptionsPopUpState("hidden") : "";
  };
  const hideFromEmailPopUp = () => {
    fromEmailPopUpState === "" ? setFromEmailPopUpState("hidden") : "";
  };
  const hideToEmailPopUp = () => {
    toEmailPopUpState === "" ? setToEmailPopUpState("hidden") : "";
  };
  const hideCCPopUp = () => {
    toCCPopUpState === "" ? setToCCPopUpState("hidden") : "";
  };
  const hideBCCPopUp = () => {
    toBCCPopUpState === "" ? setToBCCPopUpState("hidden") : "";
  };

  // Toggle Email suggestion for From input

  const toggleFromEmailPopUp = () => {
    fromEmailPopUpState === "hidden"
      ? setFromEmailPopUpState("")
      : setFromEmailPopUpState("hidden");
  };

  // To show Suggestions of emails
  const showToEmailPopUp = () => {
    setToEmailPopUpState("");
  };
  const showCCEmailPopUp = () => {
    setToCCPopUpState("");
  };
  const showBCCEmailPopUp = () => {
    setToBCCPopUpState("");
  };

  // Hide CC and Bcc Input Field
  const hideCCInput = () => {
    toCCEmail.length === 0 ? setCCState("hidden") : "";
  };
  const hideBCCInput = () => {
    toBCCEmail.length === 0 ? setBCCState("hidden") : "";
  };

  // Hide the popups when the input fields are empty immediately IIFE function
  (function () {
    toInputVal === "" ? hideToEmailPopUp() : "";
    CCInputVal === "" ? hideCCPopUp() : "";
    BCCInputVal === "" ? hideBCCPopUp() : "";
  })();

  // Push the raw input to the required field also filter the saved emails
  const pushToSuggestionArr = (input, ArrName) => {
    const matchedArr = savedEmail.filter((email) => {
      return (
        email["email"].toLocaleLowerCase().includes(input.toLowerCase()) ||
        email["uName"].toLowerCase().includes(input.toLowerCase())
      );
    });
    const modifiedInput = [{ email: `${input}`, id: 0, uName: "" }];
    ArrName([...matchedArr, ...modifiedInput]);
  };

  // Hide CC and BCC when empty
  const hideCCAndBCCFieldsIfEmpty = () => {
    if (CCEmailBadge.length === 0) {
      hideCCInput();
      setDownArrowBtnState("");
    }
    if (BCCEmailBadge.length === 0) {
      hideBCCInput();
      setDownArrowBtnState("");
    }
  };

  return (
    <>
      <div
        className="container bg-black mx-auto max-w-[30rem] h-[100dvh] relative overflow-y-hidden"
        onClick={() => {
          hideOptionPopup();
          hideFromEmailPopUp();
          toInputVal === "" ? hideToEmailPopUp() : "";
          CCInputVal === "" ? hideCCPopUp() : "";
          BCCInputVal === "" ? hideBCCPopUp() : "";
        }}
      >
        <div className="nav-bar p-4">
          <div className="back-btn flex justify-between">
            <img
              src="/arrow_back.svg"
              alt="Back Button"
              className="cursor-pointer"
            />
            <div className="moreNavBtns flex gap-6">
              <img src="/edit.svg" alt="" />
              <img src="/attachment.svg" alt="" />
              <img src="/send.svg" alt="" />
              <img
                src="/more_vert.svg"
                alt=""
                onClick={() => setOptionsPopUpState("")}
              />
            </div>
          </div>{" "}
        </div>
        <form action="" className="mt-14 text-white" onSubmit={handleSubmit}>
          {/* From Email */}
          <div className="form-email border-b-2 border-[gray] w-[100%] pb-4 relative">
            <div className="flex justify-between">
              <div className="flex w-[100%]">
                <p className="px-4 w-[4.2rem]">From</p>
                <div
                  className="flex justify-between w-[75%] cursor-pointer"
                  onClick={() => toggleFromEmailPopUp()}
                >
                  <span className="cursor-pointer">{fromEmailData}</span>
                </div>
                <button
                  className="more-icon px-4"
                  onClick={() => toggleFromEmailPopUp()}
                >
                  <img src="/arrow_down.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
          <EmailPopUpSuggestion
            emails={fromEmail}
            setHidden={fromEmailPopUpState}
            currEmail={setFromEmailData}
          />
          {/* To Email */}

          {/* For To */}
          <ToEmailInputs
            email={setToEmail}
            emailBadges={toEmailBadge}
            setEmailBadge={setToEmailBadge}
            inputType="To"
            inputVal={toInputVal}
            setInputVal={setToInputVal}
            CCAndBCCstate=""
            setCCstate={setCCState}
            setBCCstate={setBCCState}
            downArrowBtnState={downArrowBtnState}
            setDownArrowBtnState={setDownArrowBtnState}
            showToEmailPopUp={showToEmailPopUp}
            pushToSuggestionArr={pushToSuggestionArr}
          />
          <EmailPopUpSuggestion
            emails={toEmail}
            setHidden={toEmailPopUpState}
            setInputVal={setToInputVal}
            zIndex={10}
            //Hide email Suggestion
            hideEmailPopUp={hideToEmailPopUp}
            // To create badges array
            pushToBadgeArray={(badge) => {
              setToEmailBadge([...toEmailBadge, badge]);
            }}
          />

          {/* For CC */}
          <ToEmailInputs
            email={setToCCEmail}
            emailBadges={CCEmailBadge}
            setEmailBadge={setCCEmailBadge}
            inputType="Cc"
            inputVal={CCInputVal}
            setInputVal={setCCInputVal}
            CCAndBCCstate={CCstate}
            downArrowBtnState={"hidden"}
            showCCEmailPopUp={showCCEmailPopUp}
            pushToSuggestionArr={pushToSuggestionArr}
          />
          <EmailPopUpSuggestion
            emails={toCCEmail}
            setHidden={toCCPopUpState}
            setInputVal={setCCInputVal}
            zIndex={9}
            //Hide email Suggestion
            hideEmailPopUp={hideCCPopUp}
            // To create badges array
            pushToBadgeArray={(badge) => {
              setCCEmailBadge([...CCEmailBadge, badge]);
            }}
          />

          {/* For BCC */}
          <ToEmailInputs
            email={setToBCCEmail}
            emailBadges={BCCEmailBadge}
            setEmailBadge={setBCCEmailBadge}
            inputType="Bcc"
            inputVal={BCCInputVal}
            setInputVal={setBCCInputVal}
            CCAndBCCstate={BCCstate}
            downArrowBtnState={"hidden"}
            showBCCEmailPopUp={showBCCEmailPopUp}
            pushToSuggestionArr={pushToSuggestionArr}
          />
          <EmailPopUpSuggestion
            emails={toBCCEmail}
            setHidden={toBCCPopUpState}
            setInputVal={setBCCInputVal}
            zIndex={8}
            //Hide email Suggestion
            hideEmailPopUp={hideBCCPopUp}
            // To create badges array
            pushToBadgeArray={(badge) => {
              setBCCEmailBadge([...BCCEmailBadge, badge]);
            }}
          />
          {/* Subject */}
          <div className="subject border-b-2 border-[gray] w-[100%] pb-4 mt-4">
            <div className="flex justify-between">
              <div className="flex w-[100%] px-4">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  className="w-[100%]"
                  placeholder="Subject"
                  onClick={() => {
                    hideCCAndBCCFieldsIfEmpty();
                  }}
                />
              </div>
            </div>
          </div>
          {/* Compose Email */}
          <div className="compose-email h-[100%] pb-4 mt-4">
            <div className="flex w-[100%] px-4">
              <textarea
                name="composeEmail"
                id="composeEmail"
                className="w-[100%]"
                placeholder="Compose email"
                rows={20}
                onClick={() => {
                  hideCCAndBCCFieldsIfEmpty();
                }}
              />
            </div>
          </div>
        </form>
        <GmailOptionPopUp state={optionsPopUpState} options={popUpOptions} />
      </div>
    </>
  );
}
