"use client";

import { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import api from "@/services/api";
import Link from "next/link";

interface Assignor {
  id: string;
  name: string;
  document: string;
}

export default function AssignorList() {
  const [assignors, setAssignors] = useState<Assignor[]>([]);

  useEffect(() => {
    api.get("/assignor").then(({ data }) => setAssignors(data));
  }, []);

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>
        Cedentes
      </Typography>
      <Link href="/">Home</Link>

      <List>
        {assignors.map((assignor) => (
          <ListItem key={assignor.id}>
            <ListItemText
              primary={assignor.name}
              secondary={`Documento: ${assignor.document}`}
            />
          </ListItem>
        ))}
      </List>
      <Link href="assignor/create">Novo cedente</Link>
    </Box>
  );
}
