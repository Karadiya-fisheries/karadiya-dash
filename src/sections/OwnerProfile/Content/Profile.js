import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  useFormik,
  Form,
  FormikProvider,
  useFormikContext,
  Field,
} from "formik";
import { useNavigate } from "react-router-dom";
// material
import { Stack, Box } from "@chakra-ui/react";
import { Card, ListItem, List, ListItemText, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
// component
import Iconify from "../../../components/Iconify";
import OwnerService from "../../../services/owner.service";
import activityService from "../../../services/activity.service";
import authService from "../../../services/auth.service";
import ownerService from "../../../services/owner.service";
import { EditOutlined } from "@mui/icons-material";

// ----------------------------------------------------------------------

export default function Profile({ data, setOpen }) {
  const [profile, setProfile] = useState([]);
  const uid = authService.getCurrentUser().uid;
  useEffect(() => {
    ownerService.getOwnerById(uid).then((value) => {
      console.log(value);
      setProfile(value.data);
    });
  }, []);
  return (
    <Card>
      <IconButton
        onClick={(e) => {
          setOpen(true);
        }}
      >
        <EditOutlined />
      </IconButton>
      <List subheader="Registration Details">
        <ListItem>
          <ListItemText>1. FIDivision: {profile.FIDivision}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>2. GNDivision: {profile.GNDivision}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>3. DSDivision: {profile.DSDivision}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>4. Surname: {profile.Surname}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>5. OtherNames: {profile.OtherNames}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>6. NicNo: {profile.NicNo}</ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>7. OccuType: {profile.OccuType}</ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText>8. FOpType: {profile.FOpType}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>9. AssocAct: {profile.AssocAct}</ListItemText>
        </ListItem>
      </List>
    </Card>
  );
}
