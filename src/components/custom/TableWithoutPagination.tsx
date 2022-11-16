import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Column } from "../../Pages/Ledger/Ledger";
import {
  TableCellText,
  TableHeadText,
  TableResultContainer,
  TitleStyled,
} from "./styledComponents";
import { blue } from "@mui/material/colors";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { Tables } from "./Table";
import { ExpandCircleDown } from "@mui/icons-material";

interface StickyHeadTableProps {
  title?: string;
  rows: readonly any[];
  accordion?: boolean;
  columns: readonly Column[];
  result?: string | React.ReactElement;
}
const StickyTable: React.FC<StickyHeadTableProps> = ({
  title,
  rows,
  accordion,
  columns,
  result,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {accordion ? (
        <Accordion>
          <AccordionSummary
            sx={{ bgcolor: "gray" }}
            expandIcon={<ExpandCircleDown />}
          >
            <TitleStyled>{title}</TitleStyled>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer sx={{ maxHeight: "70vh", width: "100%" }}>
              <Tables
                columns={columns}
                rows={rows}
                page={page}
                rowsPerPage={rowsPerPage}
                // value={value}
              />
              {result && (
                <TableResultContainer textAlign={"center"}>
                  {result}
                </TableResultContainer>
              )}
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ) : (
        <>
          <TitleStyled>{title}</TitleStyled>
          <TableContainer sx={{ maxHeight: "70vh", width: "100%" }}>
            <Tables
              columns={columns}
              rows={rows}
              page={page}
              rowsPerPage={rowsPerPage}
              // value={value}
            />
            {result && (
              <TableResultContainer textAlign={"center"}>
                {result}
              </TableResultContainer>
            )}
          </TableContainer>
        </>
      )}
    </Paper>
  );
};

export default StickyTable;
