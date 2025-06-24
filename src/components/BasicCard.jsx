import salamiIMG from "../assets/salami.png";
import pineappleIMG from "../assets/pineapple.png";
import mushroomIMG from "../assets/mushroom.png";
import oliveIMG from "../assets/olive.png";
import pepperIMG from "../assets/pepper.png";

export const BasicCard = {
  red: {
    personalIngredient: "salami",
    image: salamiIMG,
    colorCode: "#d92525",
  },

  yellow: {
    personalIngredient: "pineapple",
    image: pineappleIMG,
    colorCode: "#ebf224",
  },

  brown: {
    personalIngredient: "mushroom",
    image: mushroomIMG,
    colorCode: "#63311c",
  },

  purple: {
    personalIngredient: "olive",
    image: oliveIMG,
    colorCode: "#AD63F2",
  },

  green: {
    personalIngredient: "pepper",
    image: pepperIMG,
    colorCode: "#63F265",
  },
};

// 'w-[200px] h-[300px] flex flex-col justify-center items-center border-3 border-solid border-stone-400 rounded-3xl bg-stone-100'
export const standardCardStyle = {
  width: "200px",
  height: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "3px solid rgb(224, 208, 192)",
  borderRadius: "20px",
  backgroundColor: "rgb(247, 244, 241)",
};

// flex flex-col h-4/5 w-4/5
export const cardContentStyle = {
  display: "flex",
  flexDirection: "column",
  height: "80%",
  width: "80%",
};

// h-1/5 flex jusify-between
export const rowStyle = {
  height: "20%",
  display: "flex",
  justifyContent: "space-between",
};
