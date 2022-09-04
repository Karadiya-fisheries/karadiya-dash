import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Box,
  Card,
  Link,
  Typography,
  Stack,
  Avatar,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { fCurrency } from "../../../utils/formatNumber";
import { fToNow, fDate } from "../../../utils/formatTime";
// components
import Label from "../../../components/Label";
import { ColorPreview } from "../../../components/color-utils";
import { isAfter, isBefore, parseISO } from "date-fns";
import moment from "moment";

// ----------------------------------------------------------------------

const ProductImgStyle = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});
const TitleStyle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 1,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));
// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

const getStatus = (startDate, endDate) => {
  const start = parseISO(startDate);
  const end = parseISO(endDate);
  if (moment().isBetween(start, end))
    return { status: "live", date: end, color: "success" };
  else if (moment().isAfter(end))
    return { status: "auctioned", date: end, color: "error" };
  else if (moment().isBefore(start))
    return { status: "pending", date: start, color: "info" };
  else return { status: "", date: moment(), color: "" };
};
export default function ShopProductCard({ product }) {
  const { name, cover, price, start, end, owner, size, id } = product;
  const color = getStatus(start, end).color;

  const date = getStatus(start, end).date;
  const status = getStatus(start, end).status;
  const distanceToNow = fToNow(date);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <Box sx={{ pt: "100%", position: "relative" }}>
          {status && (
            <Label
              variant="filled"
              color={color}
              sx={{
                zIndex: 9,
                top: 16,
                right: 16,
                position: "absolute",
                textTransform: "uppercase",
              }}
            >
              {status}
            </Label>
          )}
          <AvatarStyle
            alt={owner.name}
            src={owner.avatarUrl}
            sx={{
              zIndex: 9,
              top: 24,
              left: 24,
              width: 40,
              height: 40,
            }}
          />
          <ProductImgStyle alt={name} src={cover} />
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <TitleStyle
            to={{ pathname: "/dashboard/lot/view/" + id, replace: true }}
            color="inherit"
            underline="hover"
            component={RouterLink}
          >
            <Typography variant="subtitle1" noWrap>
              {name}
            </Typography>
            <Typography variant="subtitle1" noWrap>
              {size} Kg
            </Typography>
          </TitleStyle>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block" }}
            >
              {fDate(date)}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ color: "text.disabled", display: "block" }}
            >
              {fToNow(date)}
            </Typography>
            <Typography variant="subtitle1">
              &nbsp; LKR.{fCurrency(price)}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
}
