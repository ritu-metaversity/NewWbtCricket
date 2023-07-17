// import { ColumnsInterface } from "../accountSummary/StyledTableHeaderCell";

export type columnIds = "image" | "amount" | "time" | "status";

export interface ColumnsInterface<Type> {
  id: Type;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
}
export const columns: ColumnsInterface<columnIds>[] = [
  {
    id: "amount",
    label: "Amount",
    align: "center",
  },

  {
    id: "image",
    label: "Image",
    minWidth: 70,
    align: "center",
  },

  {
    id: "time",
    label: "Date",
    align: "center",
  },

  {
    id: "status",
    label: "Status",
    align: "center",
  },
];
