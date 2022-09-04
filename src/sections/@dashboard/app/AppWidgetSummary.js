// @mui
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";
// utils
import { fCurrency, fShortenNumber } from "../../../utils/formatNumber";
// components
import Iconify from "../../../components/Iconify";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  return (
    <Card
      sx={{
        py: 2,
        boxShadow: 1,
        textAlign: "center",
        color: (theme) => theme.palette[color].darker,
        bgcolor: (theme) => alpha(theme.palette[color].light, 0.5),
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].darker,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette[color].darker,
              0
            )} 0%, ${alpha(theme.palette[color].darker, 0.5)} 100%)`,
        }}
      >
        <Iconify icon={icon} width={28} height={28} />
      </IconWrapperStyle>

      {other.type === "currentBid" ? (
        <Typography variant="h3">Rs.{fCurrency(total)}</Typography>
      ) : (
        <Typography variant="h3">{fShortenNumber(total)}</Typography>
      )}
      <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
        {title}
      </Typography>
    </Card>
  );
}
