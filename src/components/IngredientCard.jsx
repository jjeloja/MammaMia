import { useState } from "react";
import { BasicCard } from "./BasicCard";
import MammaMiaLogo from "../assets/MammaMiaLogo.png";

function IngredientCard({ color }) {
  const [faceUp, setFaceUp] = useState(false);
  const ingredientData = BasicCard[color];

  const toggleFace = () => setFaceUp(!faceUp);

  return (
    <div
      onClick={toggleFace}
      className="w-[200px] h-[300px] flex flex-col justify-center items-center border-3 border-solid border-stone-400 rounded-3xl bg-stone-100"
    >
      {faceUp ? (
        <div className="flex flex-col h-4/5 w-4/5">
          <div className="h-1/5 flex justify-between items-center">
            <img
              src={ingredientData.image}
              alt="top-left"
              className="w-[40px]"
            />
            <img
              src={ingredientData.image}
              alt="top-right"
              className="w-[40px]"
            />
          </div>
          <div className="h-3/5 flex justify-center items-center">
            <img
              src={ingredientData.image}
              alt="center"
              className="w-[100px]"
            />
          </div>
          <div className="h-1/5 flex justify-between items-center">
            <img
              src={ingredientData.image}
              alt="bottom-left"
              className="w-[40px]"
            />
            <img
              src={ingredientData.image}
              alt="bottom-right"
              className="w-[40px]"
            />
          </div>
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

export default IngredientCard;
