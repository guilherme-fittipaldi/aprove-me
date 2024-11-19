"use client";

import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
// import api from "@/lib/api";
import api from "@/services/api";
import { useRouter } from "next/navigation";

interface AssignorForm {
  name: string;
  document: string;
  phone: string;
  email: string;
}

export default function CreateAssignor() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignorForm>();

  const onSubmit = async (data: AssignorForm) => {
    try {
      await api.post("/assignor", data);
      alert("Cedente cadastrado com sucesso!");
    } catch (err: any) {
      alert(`Erro ao cadastrar cedente: ${err.response?.data?.message}`);
    }
  };

  const router = useRouter();

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>
        Cadastrar Cedente
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Nome"
          {...register("name", {
            required: "Nome é obrigatório",
            maxLength: 255,
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Telefone"
          {...register("phone", {
            required: "Telefone é obrigatório",
            maxLength: 255,
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          {...register("email", {
            required: "Email é obrigatório",
            maxLength: 255,
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Documento"
          {...register("document", {
            required: "Documento é obrigatório",
            maxLength: 20,
          })}
          error={!!errors.document}
          helperText={errors.document?.message}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
        <Button
          onClick={() => router.back()}
          variant="contained"
          color="error">
          Cancelar
        </Button>
      </form>
    </Box>
  );
}
