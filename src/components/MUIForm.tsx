import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line no-empty-pattern
const MUIForm = () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
      message: "password must be at least 6 characters",
    }),
  });
  type IForm = z.infer<typeof schema>;
  const form = useForm<IForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = form;

  const onSubmit = (data: IForm) => {
    console.log(data);
  };
  useEffect(() => {
    isSubmitSuccessful && reset();
  },[isSubmitSuccessful, reset]);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className=" bg-white">
        <Stack spacing={2} width={400}>
          <TextField
            label="Email"
            variant="outlined"
             
            {...register("email")}
            helperText={errors.email?.message}
          />
          <TextField
            label="password"
            type="password"
            variant="outlined"
             
            {...register("password")}
            helperText={errors.password?.message}
          />
          <Button  className="mx-auto" variant="contained" type="submit"   color="secondary">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default MUIForm;
