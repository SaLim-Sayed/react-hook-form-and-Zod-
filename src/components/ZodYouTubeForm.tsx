import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// eslint-disable-next-line no-empty-pattern
export const ZodYouTubeForm = () => {
  const schema = z.object({
    email: z.string().email(),
    username: z.string().min(3, {
      message: "username must be at least 3 characters",
    }),
    channel: z.string().min(3, {
      message: "channel must be at least 3 characters",
    }),
    social: z.object({
      twitter: z.string().min(3, {
        message: "twitter must be at least 3 characters",
      }),
      facebook: z.string().min(3, {
        message: "facebook must be at least 3 characters",
      }),
    }),
    phNumbers: z.array(
      z.object({
        number: z.string().min(3, {
          message: "phone number must be at least 3 characters",
        }),
      })
    ),
    bod: z.date(),
  });
  type IForm = z.infer<typeof schema>;
  const form = useForm<IForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });
  const { register, control, handleSubmit, reset, formState } = form;
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });
  const onSubmit: SubmitHandler<IForm> = (data) => {
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
          className={errors.username ? "input-error" : ""}
          placeholder={
            errors.username ? errors.username?.message : "enter username"
          }
          {...register("username")}
        />

        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          className={errors.email ? "input-error" : ""}
          placeholder={errors.email ? errors.email?.message : "enter email"}
          {...register("email")}
        />
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          className={errors.channel && "input-error"}
          placeholder={
            errors.channel ? errors.channel?.message : "enter channel"
          }
          {...register("channel")}
        />
        <div className=" border border-pink-300">
          <div className="flex justify-between items-center p-4">
            <label htmlFor="phNumbers">List Of Phone Numbers</label>
            <button onClick={() => append({ number: "" })}>Add +</button>
          </div>
          <div>
             
            {fields.map((field, index) => (

              <div key={field.id} className=" flex gap-2 m-2">
                 {index +1} -
                <input
                  type="text"
                  id="phNumbers"
                  placeholder={
                    errors.phNumbers
                      ? errors.phNumbers?.message
                      : "enter here"
                  }
                  className={errors.phNumbers && "input-error"}
                  {...register(`phNumbers.${index}.number` as const )}
                />
                {index >0 && (
                  <button className="w-[25%]" onClick={() => remove(index)}>
                    remove Ph
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button>Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
