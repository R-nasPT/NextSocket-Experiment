"use client";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Add, Delete, Edit } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import MyLoader from "../component/loading/page";

function Main() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/ticket/route"
      );
      setUser(response.data);
      // setLoading(true);
      setLoading(false);
    } catch (err) {
      console.error("An error occurred while fetching data.", err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/ticket/route?id=${id}`);
      fetchData(); // ลบแล้วดึงข้อมูลใหม่
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const item = Array.from(user);
    const [reorderedItem] = item.splice(result.source.index, 1);
    item.splice(result.destination.index, 0, reorderedItem);

    setUser(item);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <Container
            sx={{
              backgroundColor: "white",
              height: "100vh",
              marginTop: "70px",
            }}
          >
            <MyLoader />
          </Container>
        </Box>
      ) : (
        <Box sx={{ backgroundColor: "#e0e0e0", paddingTop: "3rem" }}>
          <Container sx={{ backgroundColor: "white", height: "100vh" }}>
            <Grid2
              container
              justifyContent="space-between"
              alignItems="center"
              paddingTop="20px"
            >
              <h1>USER</h1>
              <div>
                <Link href="/pdf">
                  <Button variant="outlined">PDF</Button>
                </Link>
                <Link href="/newuser">
                  <Button
                    sx={{
                      backgroundColor: "#279EFF",
                      color: "white",
                      marginLeft: "5px",
                      "&:hover": { backgroundColor: "#0C356A" },
                    }}
                  >
                    <Add />
                  </Button>
                </Link>
              </div>
            </Grid2>
            <TableContainer>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="user-list" direction="vertical">
                  {(provided) => (
                    <Table ref={provided.innerRef} {...provided.droppableProps}>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#00b0ff" }}>
                          <TableCell sx={{ color: "white" }}>NAME</TableCell>
                          <TableCell sx={{ color: "white" }}>
                            LAST NAME
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>
                            NICK NAME
                          </TableCell>
                          <TableCell sx={{ color: "white" }}>ADDRESS</TableCell>
                          <TableCell sx={{ color: "white" }}>PHONE</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {user.map((item, index) => (
                          <Draggable
                            key={item.test_id}
                            draggableId={item.test_id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <TableRow
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.l_name}</TableCell>
                                <TableCell>{item.nick_name}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                  }}
                                >
                                  <Link href={`/edit/${item.test_id}`}>
                                    <Edit
                                      sx={{
                                        backgroundColor: "#f50057",
                                        color: "white",
                                        padding: "10px",
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        "&:hover": {
                                          backgroundColor: "#ab003c",
                                        },
                                      }}
                                    />
                                  </Link>
                                  <Delete
                                    sx={{
                                      backgroundColor: "#bdbdbd",
                                      color: "white",
                                      padding: "10px",
                                      borderRadius: "50%",
                                      cursor: "pointer",
                                      "&:hover": { backgroundColor: "#9e9e9e" },
                                    }}
                                    onClick={() => handleDelete(item.test_id)}
                                  />
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </TableBody>
                    </Table>
                  )}
                </Droppable>
              </DragDropContext>
            </TableContainer>
          </Container>
        </Box>
      )}
    </>
  );
}

export default Main;
