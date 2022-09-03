import { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
// material
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Paper,
  Container,
  Stack,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";

// components
import Page from "../../components/Page";
import Iconify from "../../components/Iconify";
import DepartureService from "../../services/DepartureService";
import authService from "../../services/auth.service";
// utils
import { fDate } from "../../utils/formatTime";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useTheme } from "@mui/material/styles";
import DepartureForm from "./DepartureFrom";
import EditIcon from "@mui/icons-material/Edit";
import FileDownload from "@mui/icons-material/FileDownload";
import parseISO from "date-fns/parseISO";
// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

// ----------------------------------------------------------------------

const CoverImgStyle = styled("img")({
  objectFit: "contain",
});

export default function DepartureView() {
  const theme = useTheme();
  const { id } = useParams();
  const [edit, setEdit] = useState(true);
  const [departure, setDeparture] = useState({ createdAt: "2000-01-01" });
  const printRef = useRef();
  useEffect(() => {
    DepartureService.getDepartureById(id).then((result) => {
      setDeparture(result.data);
    });
  }, []);
  return (
    <Page title="Dashboard: Departure">
      <Container>
        <Stack spacing={3} direction="column">
          <Typography variant="h4">
            Departure Approval Request Record ID(#{departure.DepartureId})
          </Typography>
          <Stack
            direction={"row"}
            alignItems="flex-end"
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">
              Created At: {fDate(parseISO(departure.createdAt))}
            </Typography>
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
                  pdf.text(
                    6,
                    6,
                    "Departure Approval Request." + departure.DepartureId
                  );
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
          <Divider sx={{ color: theme.palette.divider }} />
          {edit ? (
            <Paper
              ref={printRef}
              elevation="3"
              variant="outlined"
              sx={{ pr: 4, pl: 4 }}
            >
              <List>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>IMUL NO -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>{departure.Imul}</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Owner's Name -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.OwnerName}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Phone No -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>{departure.TelNo}</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>E-mail -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>{departure.Email}</Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Skipper's Name -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.SkipperName}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Skipper NIC -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.SkipperNic}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Skipper No - </ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.SkipperNo}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Departing Port -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.DepartingPort}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Fishing Zone -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.FishingZone}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>M Length -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.MLength}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Number of Throns -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.NoThrons}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>C net Length -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.CNetLength}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>C Eye Size -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.CEyeSize}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Netting Length -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.NettingLength}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Net Eye Size -</ListItemText>
                  <ListItemText>
                    <Typography paragraph={true}>
                      {departure.NetEyeSize}
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>CrewDetails -</ListItemText>
                  {departure.CrewDetails &&
                    departure.CrewDetails.map((rec, index) => {
                      return (
                        <ListItemText
                          key={index}
                          primary={rec.name}
                          secondary={
                            <Typography display="inline" variant="overline">
                              {rec.nic}
                            </Typography>
                          }
                        />
                      );
                    })}
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Local Operating License -</ListItemText>
                  <Typography paragraph={true}>
                    {departure.LocalOpLicense}
                  </Typography>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>International Operating License -</ListItemText>
                  <Typography paragraph={true}>
                    {departure.InterOpLicense}
                  </Typography>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Radio Station -</ListItemText>
                  <Typography paragraph={true}>
                    {departure.RadioStation}
                  </Typography>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>Frequency -</ListItemText>
                  <Typography paragraph={true}>
                    {departure.Frequency}
                  </Typography>
                </ListItem>
                <ListItem alignItems="flex-start" divider="true">
                  <ListItemText>VMS -</ListItemText>
                  <Typography paragraph={true}>{departure.Vms}</Typography>
                </ListItem>
              </List>
            </Paper>
          ) : (
            <DepartureForm id={departure} edit={edit} />
          )}
        </Stack>
      </Container>
    </Page>
  );
}
