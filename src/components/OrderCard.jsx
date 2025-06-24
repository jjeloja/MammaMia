import { useState } from "react";
import { BasicCard } from "./BasicCard";
import ginghamPattern from "../assets/ginghamPattern.jpg";
import mysteryIMG from "../assets/mystery.png";
import FifteenplusIMG from "../assets/15plus.png";
import pizzaIMG from "../assets/pizza.png";

function OrderCard({ color, type, extra = null }) {
  const [faceUp, setFaceUp] = useState(false);
  const ingredientData = BasicCard[color];
  const extraIngredientData = extra ? BasicCard[extra] : null;

  const toggleFace = () => setFaceUp(!faceUp);

  const mysteryIngredient = {
    personalIngredient: "mystery",
    image: mysteryIMG,
  };

  const allRecipes = {
    normale: () => [
      { name: ingredientData, type: "main" },
      ...Array(4).fill({ name: extraIngredientData, type: "extra" }),
    ],
    bombastica: () =>
      Array(15).fill({ name: mysteryIngredient, type: "mystery" }),
    monotoni: () => [
      { name: ingredientData, type: "main" },
      ...Array(6).fill({ name: mysteryIngredient, type: "mystery" }),
    ],
    minimale: () => [
      { name: ingredientData, type: "main" },
      ...Array(3).fill({ name: mysteryIngredient, type: "mystery" }),
    ],
  };

  const thisRecipe = allRecipes[type] ? allRecipes[type]() : [];

  const Pizza = () => {
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <img src={pizzaIMG} className="absolute top-0 left-0" />
        <img src={thisRecipe[0].name.image} className="h-2/11 w-auto absolute"/>

        <div className=' w-full h-full absolute'>
          {thisRecipe.slice(1).map((ingredient, index) => {
            return (
                <img src={ingredient.type === "mystery" ? mysteryIMG : ingredient.name.image}
                className='absolute w-2/11 h-auto -translate-1/2' 
                style={{
                  left: `${50 + Math.cos(index * (Math.PI * 2) / (thisRecipe.length - 1)) * 27}%`,
                  top: `${50 + Math.sin(index * (Math.PI * 2) / (thisRecipe.length - 1)) * 27}%`,
                }}/>
            );
          
          })}
        </div>
      </div>
    );
  };

  const Corner = ({ vertical, horizontal }) => {
    return ( type === "bombastica" ? 
      <img
          src={FifteenplusIMG}
          className='absolute bg-stone-100 flex items-center justify-center h-[40px] w-[40px] rounded-3xl border-2 border-solid border-stone-400'
          style={{
            [vertical]: '5px',
            [horizontal]: "5px",
            transform: vertical === "bottom" ? "scaleX(-1) scaleY(-1)" : undefined,}}
      /> : 
      <>
        {thisRecipe.map((ingredient, index) => {
            return (
              <div
                key={index}
                className="absolute bg-stone-100 flex items-center justify-center h-[25px] w-[25px] rounded-3xl border-2 border-solid border-stone-400"
                style={{
                  [vertical]: ingredient.type === "main" ? "5px" : `${12 * (index - 1) + 5}px`,
                  [horizontal]: ingredient.type === "main" ? "31px" : "5px",
                  transform: vertical === "bottom" ? "scaleX(-1) scaleY(-1)" : undefined,
                }}
              >
                <img src={ingredient.name.image} className="h-[17px]" />
              </div>
          );
        })}
      </>
    );
  };

  return (
    <div
      onClick={toggleFace}
      className="w-[200px] h-[300px] flex flex-col justify-center items-center border-3 border-solid border-stone-400 rounded-3xl bg-stone-100 bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${ginghamPattern}), linear-gradient(${ingredientData.colorCode}, ${ingredientData.colorCode})`,
        backgroundBlendMode: "hard-light, normal",
        backgroundSize: "80% 80%",
      }}
    >
      {faceUp && (
        <div className='flex flex-col h-4/5 w-4/5'>
          <div className='h-1/4 flex jusify-between'>
            <div className='relative w-full'>
              <Corner vertical="top" horizontal="left" />
              <Corner vertical="top" horizontal="right" />
            </div>
          </div>

          <div className="h-1/2 flex justify-center items-center">
            <div className="w-[120px] h-[120px] relative">
              <Pizza />
            </div>
          </div>

          <div className="h-1/4 flex jusify-between">
            <div className="relative w-full">
              <Corner vertical="bottom" horizontal="left" />
              <Corner vertical="bottom" horizontal="right" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderCard;
