import * as React from "react";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import triplogService from "../../services/triplog.service";
import { useParams } from "react-router-dom";
import ElogBookForm from "./ElogBookForm";

import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import EditIcon from "@mui/icons-material/Edit";
import FileDownload from "@mui/icons-material/FileDownload";
import parseISO from "date-fns/parseISO";
import { fDate } from "../../utils/formatTime";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };

function createData(name, calories, fat) {
  return { name, calories, fat };
}

export default function ElogBookOneRecord() {
  const [rows, setRows] = useState([
    createData("Departure Harbor", ""),
    createData("Skipper ID Number", ""),
    createData("Wessel ID Number", ""),
    createData("Departure Date", ""),
    createData("Departure Time", ""),
    createData("Gear Type", ""),
    createData("Main Line", ""),
    createData("Branch Line", ""),
    createData("Hook Number", ""),
    createData("Hook Type", ""),
    createData("Depth Type", ""),
    createData("Bait Type", ""),
  ]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState();
  const [elogBook, setElogBook] = useState({ createdAt: "2000-01-01" });
  const { id } = useParams();
  useEffect(() => {
    triplogService.getTripLogById(id).then((result) => {
      const data = result.data;
      setElogBook(data);
      const list = [
        createData("Departure Harbor", data.Harbor),
        createData("Skipper ID Number", data.SkipperID),
        createData("Wessel ID Number", data.WesselID),
        createData("Departure Date", data.DepartureDate),
        createData("Departure Time", data.DepartureTime),
        createData("Gear Type", data.GearType),
        createData("Main Line", data.MainLine),
        createData("Branch Line", data.Branch),
        createData("Hook Number", data.HookNo),
        createData("Hook Type", data.HookType),
        createData("Depth Type", data.Depth),
        createData("Bait Type", data.Bait),
        // createData('CatchRecords', data.CatchRecords),
      ];
      setRows(list);
    });
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  //   const emptyRows =
  //     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   };
  const [edit, setEdit] = useState(true);

  const printRef = useRef();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 5,
          width: 700,
          height: 1000,
        },
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0",
      }}
    >
      {edit ? (
        <Paper elevation={3}>
          <Typography
            variant="h3"
            component="h2"
            sx={{ textAlign: "center", m: 4 }}
          >
            ElogBook Record ID #{id}
          </Typography>
          <Stack
            direction={"row"}
            alignItems="flex-end"
            justifyContent={"space-between"}
          >
            <Box>
              <IconButton
                aria-label="edit"
                color={edit ? "default" : "primary"}
                onClick={() => {
                  setEdit(!edit);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="download"
                onClick={async () => {
                  const element = printRef.current;
                  const canvas = await html2canvas(element);
                  const data = canvas.toDataURL("image/png");
                  const pdf = new jsPDF();
                  pdf.text(6, 6, "Trip Log Report." + id);
                  const imgProperties = pdf.getImageProperties(data);
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight =
                    (imgProperties.height * pdfWidth) / imgProperties.width;

                  pdf.addImage(data, "PNG", 0, 15, pdfWidth, pdfHeight);
                  pdf.save("departure_print.pdf");
                }}
              >
                <FileDownload />
              </IconButton>
            </Box>
          </Stack>

          <Divider sx={{ width: "100%", borderBottomWidth: 3 }} />

          <Table sx={{ minWidth: 500, mt: 4, ml: 5, marginRight: 200 }}>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row) => (
                <TableRow key={row.name} align="center">
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      width: "100px",
                      borderBottom: "none",
                      paddingLeft: "51px",
                      fontWeight: 500,
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    style={{ width: 160 }}
                    align="left"
                    sx={{ borderBottom: "none" }}
                  >
                    {row.calories}
                  </TableCell>
                </TableRow>
              ))}

              {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
            </TableBody>
          </Table>
        </Paper>
      ) : (
        <ElogBookForm setEdit={setEdit} edit={edit} id={elogBook} />
      )}
    </Box>
  );
}
