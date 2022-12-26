import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { Column } from "../../Pages/Ledger/Ledger";
import {
  TableCellText,
  TableHeadText,
  TableResultContainer,
  TitleStyled,
} from "./styledComponents";
import { blue } from "@mui/material/colors";
import { ExpandCircleDown } from "@mui/icons-material";

interface StickyHeadTableProps {
  title?: string;
  rows: readonly any[];
  columns: readonly Column[];
  result?: string | React.ReactElement;
  accordion?: boolean;
  noOfRecords?:number;
  
}
const StickyHeadTable: React.FC<StickyHeadTableProps> = ({
  title,
  rows,
  columns,
  result,
  accordion,
  noOfRecords,
  
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(noOfRecords ? noOfRecords : 10);

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
          <AccordionSummary expandIcon={<ExpandCircleDown />}>
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export function Tables({
  columns,
  rows,
  value,
  page,
  rowsPerPage,
}: {
  columns: readonly Column[];
  rows: any;
  value?: any;
  page: number;
  rowsPerPage: number;
}) {
  return (
    <Table
      stickyHeader
      aria-label="sticky table"
      sx={{
        width: "100%",
        border: "1px solid white",
        borderCollapse: 'collapse'
      }}
    >
      <TableHead>
        <TableRow
          sx={{
           
            width: "100%",
          }}
        >
          {columns.map((column) => (
            <TableCell
              sx={{
                bgcolor: blue[50],
                color: "primary.main",
                border: "1px solid #d9d9d9",
              }}
              key={column.id} // align={column.align}
              align="center"
              style={{
                minWidth: column.minWidth,
              }}
            >
              <TableHeadText>{column.label}</TableHeadText>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row: any,index:number) => {
            return (
              <TableRow
                // hover
                style={{
                  borderLeft:row.border
                }}
                sx={{
                  bgcolor:row.color,
                  width: "100%",
                }}
                role="checkbox"
                tabIndex={-1}
                key={index}
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{
                        // border: "0.01px solid #d9d9d9",
                        p: 1,
                        fontSize: "0.9rem",
                        color: column.colorCoded
                          ? value < 0
                            ? "red"
                            : "green"
                          : "",
                      }}
                    >
                      <TableCellText>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCellText>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
export default StickyHeadTable;