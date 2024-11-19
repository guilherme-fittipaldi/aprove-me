"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import api from "@/services/api";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Assignor {
  id: string;
  name: string;
}

interface PayableForm {
  emissionDate: Date;
  value: number;
  assignorId: string;
}

export default function CreatePayable() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<PayableForm>();
  const [assignors, setAssignors] = useState<Assignor[]>([]);
  const [emissionDate, setEmissionDate] = useState<Date | null>(null);

  useEffect(() => {
    api.get("/assignor").then(({ data }) => setAssignors(data));
  }, []);

  const onSubmit = async (data: PayableForm) => {
    const aux = {...data, value: parseFloat(data.value.toString())}
    try {
      await api.post("/payable/create", aux);
      alert("Pagável cadastrado com sucesso!");
    } catch (err: any) {
      alert(`Erro ao cadastrar pagável: ${err.response?.data?.message}`);
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={4}>
      <Typography variant="h4" mb={2}>
        Cadastrar Pagável
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Valor"
          type="number"
          {...register("value", { required: "Valor é obrigatório", min: 0.01 })}
          error={!!errors.value}
          helperText={errors.value?.message}
          margin="normal"
        />
        <Select
          fullWidth
          value=""
          defaultValue=""
          displayEmpty
          onChange={(e) => setValue("assignorId", e.target.value as string)}>
          <MenuItem value="" disabled>
            Selecione um Cedente
          </MenuItem>
          {Array.isArray(assignors) &&
            assignors?.map((assignor) => (
              <MenuItem key={assignor.id} value={assignor.id}>
                {assignor.name}
              </MenuItem>
            ))}
        </Select>

        <Controller
          name="emissionDate"
          control={control}
          render={({ field }) => (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                {...field}
                label="Data de Emissão"
                value={emissionDate}
                onChange={(newDate) => {
                  setEmissionDate(newDate); // Atualiza o estado local
                  setValue("emissionDate", newDate); // Atualiza no react-hook-form
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={!!errors.emissionDate}
                    helperText={
                      errors.emissionDate ? "Data de emissão é obrigatória" : ""
                    }
                  />
                )}
              />
            </LocalizationProvider>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}>
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
