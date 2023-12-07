import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
type FormValues = {
  email: string;
  username: string;
  channel: string;
};

// eslint-disable-next-line no-empty-pattern
const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("form is submited", data);
    reset();
  };

  return (
    <div className="form">
      <h2 className=" font-bold text-3xl">YouTube Form </h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" {...register("username")} />
        <label htmlFor="email">E-Mail</label>
        <input type="email" id="email" {...register("email")} />
        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")} />
        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
