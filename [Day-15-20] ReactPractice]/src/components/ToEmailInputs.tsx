import { SavedEmailBadges } from "./GmailPopUp";

export const ToEmailInputs = (props: any) => {
  return (
    <>
      <div
        className={`to-email border-b-2 border-[gray] w-[100%] pb-4 mt-4 ${props.CCAndBCCstate}`}
      >
        <div className="flex justify-between">
          <div className="flex w-[100%]">
            <p className="px-4 w-[4.2rem]">{props.inputType}</p>
            <div className="flex-col w-[100%]">
              {/* dynamically Add options */}
              <SavedEmailBadges
                savedEmails={props.emailBadges}
                deleteItem={(i: number) => {
                  // Function to remove a specific item
                  const tempEmailBadgeArr = [...props.emailBadges];
                  tempEmailBadgeArr.splice(i, 1);
                  props.setEmailBadge(tempEmailBadgeArr);
                }}
              />
              <input
                type="email"
                name="toAdd"
                id="toAdd"
                value={props.inputVal}
                className="w-[100%] text-white"
                onChange={(e) => {
                  props.setInputVal(e.target.value);
                }}
                onKeyUp={() => {
                  props.inputType === "To" ? props.showToEmailPopUp() : "";
                  props.inputType === "Cc" ? props.showCCEmailPopUp() : "";
                  props.inputType === "Bcc" ? props.showBCCEmailPopUp() : "";
                  props.pushToSuggestionArr(props.inputVal, props.email);
                }}
                onKeyDown={(e) => {
                  e.key === "Enter" ? e.preventDefault() : "";
                  console.log(props.emailBadges);
                }}
              />
            </div>
          </div>
          <button
            className={`more-icon px-4 ${props.downArrowBtnState}`}
            onClick={() => {
              props.setDownArrowBtnState("hidden");
              props.setCCstate("");
              props.setBCCstate("");
            }}
          >
            <img src="/arrow_down.svg" alt="Add CC and BCC state" />
          </button>
        </div>
      </div>
    </>
  );
};
