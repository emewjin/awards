const calcRem = (pxSize) => `${pxSize / 16}rem`;

const flexSet = (just = "center", align = "center") => {
  return `display: flex;
  justify-content: ${just};
  align-items: ${align};`;
};

const flexColumnSet = (just = "center", align = "center") => {
  return `display: flex;
  flex-direction: column;
  justify-content: ${just};
  align-items: ${align};`;
};

const posCenterX = (type = "absolute") => {
  return `
  position: ${type};
  left:50%;
  transform:translateX(-50%);
  `;
};

const posCenterY = (type = "absolute") => {
  return `
  position: ${type};
  top: 50%;
  transform: translateY(-50%);
  `;
};

const posCenter = (type = "absolute") => {
  return `
  position: ${type};
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  `;
};

const colors = {
  red: "#f26462",
  white: "#FFF",
  blue: "#3a6ff2",
  black: "rgb(61, 61, 61)",
  primaryGray: "#3f4150",
  secondaryGray: "#8c8d96",
  tertiaryGray: "#b2b3b9",
  border: "#EFEFEF",
  selected: "#f2f2f2",
  bgGray: "#f6f5f5",
};

const theme = {
  colors,
  calcRem,
  flexSet,
  flexColumnSet,
  posCenterX,
  posCenterY,
  posCenter,
};

export default theme;
