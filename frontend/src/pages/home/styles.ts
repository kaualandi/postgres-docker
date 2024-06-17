import { styled } from "../../../stitches.config";

export const Container = styled("div", {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "30px",

  ".buttons": {
    display: "flex",
    justifyContent: "flex-end",
    gap: "20px",
    margin: "20px 0 50px 0",
  },

  ".chip": {
    margin: "15px 5px 0 0",
  },
});
