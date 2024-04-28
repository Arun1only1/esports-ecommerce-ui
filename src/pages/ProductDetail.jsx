import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { fallbackImage } from "../constants/general.constants";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import DeleteProductDialog from "../component/DeleteProductDialog";

// Box => div
// Stack => div which has display flex and direction column
const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const productId = params?.id;

  // get user role
  const userRole = localStorage.getItem("role");

  //   fetch product details
  const { isPending, data } = useQuery({
    queryKey: ["get-product-detail"],
    queryFn: async () => {
      return await $axios.get(`/product/details/${productId}`);
    },
  });

  const productDetail = data?.data?.productDetail;

  if (isPending) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "3rem",
        mt: "5rem",
        width: "70%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "50%",
        }}
      >
        <img
          src={productDetail?.image || fallbackImage}
          alt=""
          style={{ width: "90%" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          gap: "2rem",
        }}
      >
        <Typography variant="h5">{productDetail.name}</Typography>
        <Chip
          label={productDetail.brand}
          variant="outlined"
          color="success"
          sx={{ fontSize: "1rem" }}
        />
        <Typography sx={{ textAlign: "justify" }}>
          {productDetail.description}
        </Typography>
        <Typography variant="h6">Price: ${productDetail.price}</Typography>

        <Chip
          variant="outlined"
          color="success"
          label={productDetail.category}
          sx={{ fontSize: "1rem", textTransform: "capitalize" }}
        />

        <Typography variant="h6">
          Available quantity: {productDetail.availableQuantity}
        </Typography>

        <Stack direction="row" spacing={4}>
          <Typography variant="h6">Free shipping</Typography>
          <Chip
            variant="outlined"
            color="success"
            label={productDetail.freeShipping ? "Yes" : "No"}
            sx={{ fontSize: "1rem" }}
          />
        </Stack>

        {userRole === "seller" && (
          <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              startIcon={<EditIcon />}
              fullWidth
              onClick={() => {
                navigate(`/product-edit/${productDetail._id}`);
              }}
            >
              Edit
            </Button>

            <DeleteProductDialog />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetail;
