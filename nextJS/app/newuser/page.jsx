"use client";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

async function NewUser() {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const nameValue = watch("name");
  console.log(nameValue);
  console.log(watch("l_name"));

  const handleFormSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/api/ticket/route", data);
      router.push("/main");
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const delay = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  await delay(1000);

  return (
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
          Create User
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                {...register("name", { required: "Name is required" })}
              />
              <div
                style={{
                  width: "10rem",
                  color: "red",
                  height: "1rem",
                }}
              >
                {errors.name && errors.name.message}
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                {...register("l_name", { required: "Last Name is required" })}
              />
              <div
                style={{
                  width: "10rem",
                  height: "1rem",
                  color: "red",
                }}
              >
                {errors.l_name && errors.l_name.message}
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Nick Name"
                variant="outlined"
                fullWidth
                {...register("nick_name", { required: true })}
              />
              <div
                style={{
                  width: "10rem",
                  color: "red",
                  height: "1rem",
                }}
              >
                {errors.nick_name && "Nick Name is required"}
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                {...register("address", { required: true })}
              />
              <div
                style={{
                  width: "10rem",
                  height: "1rem",
                  color: "red",
                }}
              >
                {errors.address && "address is required"}
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                {...register("phone", { required: true })}
              />
              <div
                style={{
                  width: "10rem",
                  height: "1rem",
                  color: "red",
                }}
              >
                {errors.phone && "phone is required"}
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}
            >
              <Button
                type="submit"
                variant="contained"
                disableElevation
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}

export default NewUser;
