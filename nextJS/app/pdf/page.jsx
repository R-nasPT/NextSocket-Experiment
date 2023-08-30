"use client";
import React from "react";
import html2pdf from "html2pdf.js";
import { Box, Button, Table, TableHead, TableRow } from "@mui/material";

function PDFPage() {
  const generatePDF = () => {
    const element = document.getElementById("content");

    const opt = {
      margin: 10,
      filename: "my_document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      html2pdf: {
        margin: { top: 50, bottom: 50 },
      },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <Box
      sx={{ paddingY: "2rem", paddingX: "24rem", backgroundColor: "#CBD5E1" }}
    >
      <Button onClick={generatePDF} sx={{ marginTop: "3rem" }}>
        Generate PDF
      </Button>
      <Box
        id="content"
        sx={{ backgroundColor: "white", paddingY: "1.5rem", paddingX: "2rem" }}
      >
        <p>
          This is the content that will be converted to PDF. Lorem, ipsum dolor
          sit amen consectetur adipisicing elite. Quibusdam molesting gusto
          delegati eos quod beaten rescinds official dolorous mobis, corporal
          rem similitude, maxima ex odic facile vitae subscript ipsum adiposis.
        </p>
      </Box>
    </Box>
  );
}

export default PDFPage;
