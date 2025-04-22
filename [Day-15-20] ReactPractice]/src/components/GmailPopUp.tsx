export const GmailOptionPopUp = (props) => {
  // Stating the options
  const options = props.options;
  let hover = "hover-effect";

  return (
    <>
      <div
        className={`popup-operations bg-[#575656] text-white py-4 w-[fit-content] absolute top-[0.2%] left-[65%] ${props.state} `}
      >
        <ul className="popup-options flex-col flex ">
          {options.map((option: object, i: number) => {
            if (option["state"] === "disabled-option") {
              hover = "";
            } else {
              hover = "hover-effect";
            }
            return (
              <li className={`${option["state"]} px-4 py-2 ${hover}`} key={i}>
                {option["option"]}
              </li>
            );
          })}
        </ul>
      </div>
      ;
    </>
  );
};

export const EmailPopUpSuggestion = (props) => {
  // Listing the Emails
  const emails = props.emails;
  return (
    <>
      <div
        className={`popup-operations bg-[#575656] text-white w-[100%] absolute ${props.setHidden} min-h-[100%] z-${props.zIndex}`}
      >
        <ul>
          {emails.map((email: object, i: number) => {
            return (
              <li
                className="p-2 cursor-pointer hover-effect"
                onClick={() => {
                  const regex =
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                  if (regex.test(email["email"])) {
                    props.currEmail ? props.currEmail(email["email"]) : "";
                    props.pushToBadgeArray ? props.pushToBadgeArray(email) : "";
                    props.setInputVal("");
                    props.hideEmailPopUp();
                  } else {
                    alert("Please enter a valid email address");
                  }
                }}
                key={i}
              >
                <p className="font-extrabold text-lg">{email["uName"]}</p>
                {email["email"]}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export const SavedEmailBadges = (props) => {
  const toEmail = props.savedEmails;

  return (
    <>
      {toEmail.map((email: [], i: number) => {
        const emailOrNamePicker = () => {
          if (email["uName"]) {
            return email["uName"];
          } else {
            return email["email"];
          }
        };
        return (
          <div
            className="border-[2px] px-2 rounded-full mb-2 cursor-pointer w-[fit-content] flex"
            key={i}
          >
            <span>{emailOrNamePicker()}</span>
            <img
              src="/close.svg"
              alt=""
              className="inline w-4 ml-2"
              onClick={() => {
                props.deleteItem(i);
              }}
            />
          </div>
        );
      })}
    </>
  );
};
