"use client";

import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import api from "@/services/api";
import Link from "next/link";

interface Payable {
  id: string;
  description: string;
  value: number;
  assignor: { name: string };
}

export default function PayableList() {
  const [payables, setPayables] = useState<Payable[]>([]);

  useEffect(() => {
    api.get("/payable").then(({ data }) => setPayables(data));
  }, []);

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>
        Pagáveis
      </Typography>
      <Link href="/">Home</Link>
      <List>
        {payables.map((payable) => (
          <ListItem key={payable.id}>
            <ListItemText
              primary={payable.description}
              secondary={`Valor: R$ ${payable.value.toFixed(2)}, Cedente: ${
                payable.assignor.name
              }`}
            />
          </ListItem>
        ))}
      </List>
      <Link href="payables/create">Novo pagável</Link>
    </Box>
  );
}
