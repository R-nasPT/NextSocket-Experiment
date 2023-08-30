"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";

function Edit({ params }) {
  // console.log(params.id);
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/ticket/route?id=${params.id}`
        );
        // console.log(response.data[0]);
        const userData = response.data[0];
        setValue("name", userData.name);
        setValue("l_name", userData.l_name);
        setValue("nick_name", userData.nick_name);
        setValue("address", userData.address);
        setValue("phone", userData.phone);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [params.id, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      await axios.put(
        `http://localhost:3000/api/ticket/route?id=${params.id}`,
        data
      );
      alert("Data edited successfully");
    } catch (error) {
      console.error("Error editing data:", error);
    }
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#eeeeee",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: "4rem",
              borderRadius: "20px",
              width: "50%",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Edit User
            </Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    {...register("name")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    {...register("l_name")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    {...register("nick_name")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    {...register("address")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    {...register("phone")}
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "end",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    disableElevation
                    color="primary"
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Edit;
