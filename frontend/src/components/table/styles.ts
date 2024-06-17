import { Table } from "@nextui-org/react";
import { styled } from "../../../stitches.config";

export const Container = styled("div", {
  ".header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "10px",

    h2: {
      fontSize: "18px",
    },
  },
});

export const Tabela = styled(Table, {});
