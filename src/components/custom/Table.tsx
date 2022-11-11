import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { Column } from "../../Pages/Ledger/Ledger";
import { TitleStyled } from "./styledComponents";

interface StickyHeadTableProps {
  title?: string;
  rows: readonly any[];
  columns:readonly Column[];
}
 const StickyHeadTable:React.FC<StickyHeadTableProps> =({title, rows, columns}) =>{
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
    <Paper sx={{ width: "100%", maxWidth: "100vw", overflow: "hidden" }}>
      {Boolean(title) && <TitleStyled>{title}</TitleStyled>}
      <TableContainer sx={{ maxHeight: "70vh", width: "100%" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ width: "100%", border: "1px solid white" }}
        >
          <TableHead>
            <TableRow sx={{ width: "100%" }}>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    bgcolor: "secondary.light",
                    color: "white",
                    fontWeight: "600",
                    border: "1px solid white",
                  }}
                  key={column.id}
                  // align={column.align}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    sx={{ width: "100%" }}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.balance}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{
                            border: "0.01px solid #d9d9d9",
                            p: 1,
                            fontSize: "0.9rem",
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
}


export default StickyHeadTable