import { css } from "styled-components";

const breakpoint = {
  big: 1380,
  tablet: 896,
  mobile: 500,
};

export default Object.keys(breakpoint).reduce((acc, device) => {
  acc[device] = (...attribute) => css`
    @media screen and (max-width: ${breakpoint[device]}px) {
      ${css(...attribute)};
    }
  `;
  return acc;
}, {});
