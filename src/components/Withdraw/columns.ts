import { ColumnsInterface } from "../Deposit/columns";

export type columnIds =
  | "accountNumber"
  | "accountHolderName"
  | "amount"
  | "bankName"
  | "ifsc"
  | "time"
  | "accountType"
  | "remark"
  | "status";

export const columns: ColumnsInterface<columnIds>[] = [
  {
    id: "accountNumber",
    label: "Account Number",
    align: "center",

  },
  {
    id: "accountHolderName",
    label: "Account Name",
    align: "center",

  },

  {
    id: "amount",
    label: "Amount",
    align: "center",
  },

  {
    id: "bankName",
    label: "Bank Name / Address",
    minWidth: 70,
    align: "center",
  },
  {
    id: "ifsc",
    label: "IFSC Code",
    align: "center",

  },
  {
    id: "accountType",
    label: "Account Type / Currency",
    align: "center",

  },
  {
    id: "time",
    label: "Date",
    align: "center",

  },
  {
    id: "remark",
    label: "Remark",
    align: "center",

  },
  {
    id: "status",
    label: "Status",
    align: "center",

  },
];
