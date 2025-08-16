import { useState } from "react";
import { BasicCard } from "./BasicCard";
import MammaMiaLogo from "../assets/MammaMiaLogo.png";
import ovenIMG from "../assets/oven.png";

function OvenCard({isFaceUp = false, canFlip = false}) {
  const [faceUp, setFaceUp] = useState(isFaceUp);

  const toggleFace = () => {
    if (canFlip) setFaceUp(!faceUp)
  };

  return (
    <div
      onClick={toggleFace}
      className="w-[200px] h-[300px] flex flex-col justify-center items-center border-3 border-solid border-stone-400 rounded-3xl bg-stone-100"
    >
      {faceUp ? (
        <div className="flex flex-col h-4/5 w-4/5">
          <img src={ovenIMG} />
        </div>
      ) : (
        <div className="flex flex-col h-4/5 w-4/5 justify-center gap-6">
          <img src={MammaMiaLogo} />
          <img src={MammaMiaLogo} className="-scale-100" />
        </div>
      )}
    </div>
  );
}

export default OvenCard;
