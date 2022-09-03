import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Typography, IconButton, Stack} from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ElogBookOneRecord from './ElogbookOnerecord';
import { fDate } from "../../utils/formatTime";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useTheme } from "@mui/material/styles";

import EditIcon from "@mui/icons-material/Edit";
import FileDownload from "@mui/icons-material/FileDownload";
import parseISO from "date-fns/parseISO";
import triplogService from '../../services/triplog.service';
import { useState, useEffect, useRef } from "react";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";

export default function SimplePaper() {
  const theme = useTheme();
  const { id } = useParams();
  const [edit, setEdit] = useState(true);
  const [elogbook, setElogbook] = useState({ createdAt: "2000-01-01" });
  const printRef = useRef();
  useEffect(() => {
    triplogService.getTripLogById(id).then((result) => {
      setElogbook(result.data);
    });
  }, []);
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
       <Stack spacing={3} direction="column">
          <Typography variant="h4">
            ElogBook Record ID(#{elogbook.ElogbookId})
          </Typography>
          <Stack
            direction={"row"}
            alignItems="flex-end"
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle2">
              Created At: {fDate(parseISO(elogbook.createdAt))}
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
                    "Departure Approval Request." + elogbook.ElogbookId
                  );
                  const imgProperties = pdf.getImageProperties(data);
                  const pdfWidth = pdf.internal.pageSize.getWidth();
                  const pdfHeight =
                    (imgProperties.height * pdfWidth) / imgProperties.width;

                  pdf.addImage(data, "PNG", 0, 15, pdfWidth, pdfHeight);
                  pdf.save("elogbook_print.pdf");
                }}
              >
                <FileDownload />
              </IconButton>
            </Box>
          </Stack>
          <Divider sx={{ color: theme.palette.divider }} />
          
      <Paper elevation={3} sx={{border:1}} >
      <Typography variant="h3" component="h2" sx={{textAlign:'center',m:4}}>
       ElogBook Record ID
      </Typography>
      <Divider sx={{width:'100%',borderBottomWidth: 3}} />
      
  {/* <Grid container item xs={6} direction="column" >
  
  </Grid>
  <Grid container item xs={6} direction="column" >
  
  </Grid> */}
  <ElogBookOneRecord/>

      </Paper>
      </Stack>
    </Box>
  );
}
