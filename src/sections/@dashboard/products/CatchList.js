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

export default function CatchList({ catchRecords }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {catchRecords.map((rec, index) => (
        <Lot
          key={index}
          id={index + 1}
          handleChange={handleChange}
          expanded={expanded}
          CatchRecord={rec}
        />
      ))}
    </div>
  );
}

const Lot = ({ expanded, handleChange, CatchRecord, id }) => {
  const [load, setLoad] = React.useState({});

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
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          Catch ID No.{CatchRecord.CatchId} Created At{" "}
          {CatchRecord.createdAt.substring(0, 10)}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <FormControl sx={{ m: 1, minWidth: 80 }}>
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
              autoWidth
              label="Fish Load"
            >
              {CatchRecord.Catch.map((item, index) => (
                <MenuItem value={index}>Fish Lot No.{index + 1}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <LotForm load={load} catchId={CatchRecord.CatchId} ownerId={} />
      </AccordionDetails>
    </Accordion>
  );
};
