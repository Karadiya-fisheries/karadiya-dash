import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as React from "react";
import LotForm from "./LotForm";
import { alpha } from "@mui/material";
import { Card, Paper, Stack } from "@mui/material";
import { styled as MuiStyle } from "@mui/material/styles";
import { fDate } from "../../../utils/formatTime";

const RegisterStyle = MuiStyle(Paper)(({ theme }) => ({
  maxWidth: 640,
  padding: theme.spacing(2, 2),
  alignItems: "center",
  justifyContent: "space-between",
  mb: 5,
  backgroundColor: alpha("#b1f1fc", 0.2),
}));

export default function CatchList({ catchRecords }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {catchRecords.map((rec, index) => (
        <Card sx={{ m: 1 }}>
          <Lot
            key={index}
            id={index + 1}
            handleChange={handleChange}
            expanded={expanded}
            CatchRecord={rec}
          />
        </Card>
      ))}
    </div>
  );
}

const Lot = ({ expanded, handleChange, CatchRecord, id }) => {
  const [load, setLoad] = React.useState(0);
  return (
    <Accordion
      expanded={expanded === "panel" + id}
      onChange={handleChange("panel" + id)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography variant="subtitle1" sx={{ width: "33%", flexShrink: 0 }}>
          Catch ID No.{CatchRecord.CatchId} Created At{" "}
          {fDate(CatchRecord.createdAt)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction={"row"}>
          <Typography>Choose A Lot: </Typography>
          <FormControl sx={{ mx: 4, mb: 4 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Fish Load
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={load}
              onChange={(e) => {
                setLoad(e.target.value);
              }}
              defaultValue={0}
              autoWidth
              label="Fish Load"
            >
              {CatchRecord.Catch.map((item, index) => (
                <MenuItem value={index}>Fish Lot No.{index + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <RegisterStyle elevation={5}>
          <LotForm
            load={CatchRecord.Catch[load]}
            catchId={CatchRecord.CatchId}
          />
        </RegisterStyle>
      </AccordionDetails>
    </Accordion>
  );
};
