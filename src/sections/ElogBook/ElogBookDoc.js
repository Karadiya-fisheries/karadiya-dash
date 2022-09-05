import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import FileDownload from "@mui/icons-material/FileDownload";
import ElogBookOneRecord from "./ElogbookOnerecord";
import { useParams } from "react-router-dom";
import parseISO from "date-fns/parseISO";
import { fDate } from "../../utils/formatTime";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ElogBookForm from "./ElogBookForm";
export default function ElogBookRec() {
  const [edit, setEdit] = useState(true);
  const { id } = useParams();
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
                pdf.text(6, 6, "Departure Approval Request." + id);
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

        {/* <Grid container item xs={6} direction="column" >
  
  </Grid>
  <Grid container item xs={6} direction="column" >
  
  </Grid> */}
        {edit ? <ElogBookOneRecord ref={printRef} id={id} /> : <ElogBookForm />}
      </Paper>
    </Box>
  );
}
