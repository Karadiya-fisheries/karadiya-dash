import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// material
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";
import lotService from "../../../services/lot.service";

// ----------------------------------------------------------------------

export default function ProductList({ ...other }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    lotService.getLots().then((lots) => {
      const products = lots.data.map((lot, index) => ({
        id: lot.LotId,
        name: lot.LotTitle,
        cover: lot.LotCover,
        price: lot.LotUnitPrice,
        start: lot.LotStartDate,
        end: lot.LotEndDate,
        size: lot.LotSize,
        owner: {
          name: lot.owner.user.fullname,
          avatarUrl: lot.owner.user.profileUrl,
        },
      }));
      setProducts(products);
    });
  }, []);

  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <ShopProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
