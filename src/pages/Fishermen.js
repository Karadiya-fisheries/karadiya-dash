import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Box,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Fab,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled } from "@mui/material/styles";
// components
import Page from "../components/Page";
import Label from "../components/Label";
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import SearchNotFound from "../components/SearchNotFound";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../sections/@dashboard/user";
import ElogBookForm from "../sections/ElogBook/ElogBookForm";
import FishermenProfile from "../sections/FishermenProfile/index"
import { sample } from "lodash";
import FishermenService from "../services/fishermen.service";
import TripLogService from "../services/triplog.service";
import ColorPreview from "../components/color-utils/ColorPreview";
import ColorManyPicker from "../components/color-utils/ColorManyPicker";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "FishermenId", label: "Fishermen ID", alignRight: false },
  { id: "Surname", label: "Name", alignRight: false },
  { id: "FIDivision", label: "FI Division", alignRight: false },
  { id: "FDistrict", label: "District", alignRight: false },
  { id: "FZone", label: "Zone", alignRight: false },
  { id: "Occupation", label: "Occupation", alignRight: false },
  { id: "isVerified", label: "IsAccepted", alignRight: false },
  { id: "status", label: "Status", alignRight: false },

  { id: "" },
];

const dummyData = [
  {
    id: 1001,
    name: "Lasitha Lankajeewa",
    FDivision: "South",
    FDistrict: "Galle",
    FZone: "PG8958",
    Occupation:"fishermen"
  },
  {
    id: 1002,
    name: "Amal Perera",
    FDivision: "West",
    FDistrict: "Matara",
    FZone: "PG24896",
    Occupation:"fishermen"
  },
];


const ContentStyle = styled(Modal)(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const styles = (theme) => ({
  modal: {
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "hidden",
    height: "100%",
    maxHeight: 500,
    display: "block",
  },
  header: {
    padding: "12px 0",
    borderBottom: "1px solid darkgrey",
  },
  content: {
    padding: 12,
    overflow: "scroll",
  },
});
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.tripId.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ELogBook() {
  const [USERLIST, setUserList] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("id");

  const [filtertripId, setFiltertripId] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(null);

  // useEffect(() => {
  //   // StatService.getAllUsers().then((users) => {
      
  //      const userlist = dummyData?.map((user, index) => ({
  //       fishermenId: user.fishermenId,
  //       name: user.name,
  //       FDivision: user.FDivision,
  //       FDistrict: user.FDistrict,
  //       FZone: user.FZone,
  //       Occupation:user.Occupation,
  //        isVerified: user.confirm,
  //        status: sample(["active", "banned"]),
  //        role: sample(["User", "Fishermen", "Owner", "Officer"]),
  //      }));
  //      setUserList(userlist);
  //   // });
  //  }, []);

    useEffect(() => {
      FishermenService.getFishermens().then((fishermens) => {
        console.log(fishermens);
        const userlist = fishermens.data.map((fishermen, index) => ({
          FishermenId: fishermen.FishermenId,
          Surname: fishermen.Surname,
          FIDivision: fishermen.FIDivision,
          FDistrict: fishermen.FDistrict,
          FZone: fishermen.FZone,
          Occupation:fishermen.Occupation,
          status: sample(["viewed", "modified", "submitted"]),
          record: fishermen,
        }));
        setUserList(userlist);
      });
    }, []);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.tripId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, tripId) => {
    const selectedIndex = selected.indexOf(tripId);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, tripId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterBytripId = (event) => {
    setFiltertripId(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filtertripId
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="ELogBook">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          {!open && (
            <>
              <Typography variant="h4">Fishermen</Typography>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                New Log
              </Button>
            </>
          )}
        </Stack>

        {!open ? (
          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filtertripId={filtertripId}
              onFiltertripId={handleFilterBytripId}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          FishermenId,
                          Occupation,
                          Surname,
                          FIDivision,
                          FDistrict,
                          FZone,

                          status,
                          avatarUrl,
                          isVerified,
                          record,
                        } = row;
                        const isItemSelected = selected.indexOf(FishermenId) !== -1;

                        return (
                          <TableRow
                            hover
                            onClick={() => {
                              setKey(record);
                              setOpen(true);
                            }}
                            key={FishermenId}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, FishermenId)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Typography variant="subtitle2" noWrap align="Right">
                                  {FishermenId}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{Surname}</TableCell>
                            <TableCell align="left">{FIDivision}</TableCell>
                            <TableCell align="left">{FDistrict}</TableCell>
                            <TableCell align="left">{FZone}</TableCell>
                            <TableCell align="left">{Occupation}</TableCell>
                            <TableCell align="left">
                              {isVerified ? "Yes" : "No"}
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                color={
                                  (status === "banned" && "error") || "success"
                                }
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>

                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isUserNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filtertripId} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        ) : (
          <>
            <Box>
              <Fab
                sx={{ m: 3, alignSelf: "right" }}
                onClick={() => {
                  setOpen(false);
                }}
                variant="extended"
                size="medium"
                color="primary"
                aria-label="edit"
              >
                <ArrowBackIosIcon sx={{ mr: 1 }} />
                Back
              </Fab>
            </Box>
            <FishermenProfile id={key} />
          </>
        )}
      </Container>
    </Page>
  );
}
