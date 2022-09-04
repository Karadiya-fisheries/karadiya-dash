import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import LotForm from "./LotForm";
import {
  alpha,
  ListItem,
  Card,
  Paper,
  Stack,
  List,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled as MuiStyle } from "@mui/material/styles";
import { fDate } from "../../../utils/formatTime";
import lotService from "../../../services/lot.service";

const RegisterStyle = MuiStyle(Paper)(({ theme }) => ({
  maxWidth: 720,
  padding: theme.spacing(2, 2),
  alignItems: "center",
  justifyContent: "space-between",
  mb: 5,
  backgroundColor: alpha("#b1f1fc", 0.2),
}));

export default function CatchList({ catchRecords }) {
  const [expanded, setExpanded] = useState(false);

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
  const [load, setLoad] = useState(0);

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
          <LotList loadIndex={load} catchId={CatchRecord.CatchId} />
          <Divider sx={{ mb: 1 }} />
          <LotForm
            load={CatchRecord.Catch[load]}
            loadIndex={load}
            catchId={CatchRecord.CatchId}
          />
        </RegisterStyle>
      </AccordionDetails>
    </Accordion>
  );
};

const LotList = ({ catchId, loadIndex }) => {
  const [lots, setLots] = useState([]);
  const query = {
    catchId: parseInt(catchId),
    loadIndex: parseInt(loadIndex),
  };
  useEffect(() => {
    lotService.getCreatedLots(query).then((res) => {
      setLots(res.data);
    });
  }, [loadIndex]);
  return (
    <List sx={{ borderTop: "1px solid black" }}>
      {lots.map((bid, index) => (
        <ListItem key={index} sx={{ borderBottom: "1px solid black", m: 1 }}>
          <Stack direction={"row"} spacing={3}>
            <Typography variant="subtitle2">
              Auction Lot - #{bid.LotId} -
            </Typography>

            <ListItemText>Lot Title - {bid.LotTitle}</ListItemText>
            <ListItemText>Lot Size - {bid.LotSize} kg</ListItemText>
            <ListItemText>Unit Price - {bid.LotUnitPrice} lkr</ListItemText>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};
