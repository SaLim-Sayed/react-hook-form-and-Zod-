import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { FormValues } from "./YouTubeForm";

// eslint-disable-next-line no-empty-pattern
export const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, reset, formState } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("form is submited", data);
    reset();
  };

  return (
    <div className="form">
      <h2 className=" font-bold text-3xl">YouTube Form </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder={
            errors.username ? errors.username?.message : "enter username"
          }
          {...register("username", {
            required: {
              value: true,
              message: "username is required",
            },
          })}
        />
        <p className="errors">{errors.username?.message} </p>
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        <p className="errors">{errors.email?.message} </p>
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "channel is required",
            },
          })}
        />
        <p className="errors">{errors.channel?.message} </p>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
