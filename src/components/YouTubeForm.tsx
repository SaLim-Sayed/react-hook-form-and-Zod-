/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
type FormValues = {
  email: string;
  username: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phNumbers: {
    number: string;
  }[];
  bod: Date;
};

// eslint-disable-next-line no-empty-pattern
const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: async () => {
      const reponse = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await reponse.json();
      return {
        username: "salim",
        email: data.email,
        channel: "",
        social: {
          twitter: "",
          facebook: "",
        },
        phNumbers: [{ number: "" }],
        bod: new Date(),
      };
    },
    mode: "all",
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    getValues,
    setValue,
    reset,
  } = form;
  const {
    errors,
    dirtyFields,
    touchedFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;
  // console.log({ dirtyFields, touchedFields, isDirty, isValid });
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });
  const { fields, append, remove } = useFieldArray({
    name: "phNumbers",
    control,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("form is submited", data);
    // reset();
  };

  const handleGetValues = () => {
    console.log("get Values", getValues());
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log(errors);
  };
  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={
              errors.username
                ? "placeholder:text-red-500 border-red-500"
                : "border-white "
            }
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
        </div>
        <div className="form-control">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            className={
              errors.email
                ? "placeholder:text-red-500 border-red-500"
                : "border-white "
            }
            {...register("email", {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter Different E-mail"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("admin.com") || "Domain not Suported"
                  );
                },
                emailAvailable:async (fieldValue)=>{
                  const response = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                  );
                  const data = await response.json();
                  return data.length ===0|| "Email Already Taken" 
                }
              },
            })}
          />
          <p className="errors">{errors.email?.message} </p>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            className={
              errors.channel
                ? "placeholder:text-red-500 border-red-500"
                : "border-white "
            }
            placeholder={
              errors.channel ? errors.channel?.message : "enter channel"
            }
            {...register("channel", {
              required: {
                value: true,
                message: "channel is required",
              },
            })}
          />
          {/* <p className="errors">{errors.channel?.message} </p> */}
        </div>
        <div className="flex gap-2">
          <div className="form-control">
            <label htmlFor="twitter">Twitter</label>
            <input
              type="text"
              id="twitter"
              className={
                errors.social?.twitter
                  ? "placeholder:text-red-500 border-red-500"
                  : "border-white "
              }
              placeholder={
                errors.social?.twitter
                  ? errors.social?.twitter?.message
                  : "enter twitter"
              }
              {...register("social.twitter", {
                required: { value: true, message: "twitter is required" },
              })}
            />
            {/* <p className="errors">{errors.social?.twitter?.message} </p> */}
          </div>
          <div className="form-control">
            <label htmlFor="facebook">Facebook</label>
            <input
              type="text"
              id="facebook"
              className={
                errors.social?.facebook
                  ? "placeholder:text-red-500 border-red-500"
                  : "border-white "
              }
              placeholder={
                errors.social?.facebook
                  ? errors.social?.facebook?.message
                  : "enter facebook"
              }
              {...register("social.facebook", {
                required: { value: true, message: "facebook is required" },
              })}
            />
            {/* <p className="errors">{errors.social?.facebook?.message} </p> */}
          </div>
        </div>
        <div className=" border border-pink-300">
          <div className="flex justify-between items-center p-4">
            <label htmlFor="phNumbers">List Of Phone Numbers</label>
            <button onClick={() => append({ number: "" })}>Add +</button>
          </div>
          <div>
            {fields.map((field, index) => (
              <div key={field.id} className=" flex gap-2 m-2">
                <input
                  type="text"
                  id="phNumbers"
                  placeholder={
                    errors.phNumbers
                      ? errors.phNumbers[index]?.message
                      : "enter here"
                  }
                  className={
                    errors.phNumbers
                      ? "placeholder:text-red-500 w-[75%] border-red-500"
                      : "border-white w-[75%]"
                  }
                  {...register(`phNumbers.${index}.number` as const, {
                    required: {
                      value: true,
                      message: "phone number is required",
                    },
                  })}
                />
                {index > 0 && (
                  <button className="w-[25%]" onClick={() => remove(index)}>
                    remove Ph
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="bod">Birth Date</label>
          <input
            type="date"
            id="bod"
            className={
              errors.bod ? "placeholder:text-red-500 border-red-500" : ""
            }
            {...register("bod", {
              valueAsDate: true,
              required: { value: true, message: "bod is required" },
            })}
          />
          <p className="errors">{errors.bod?.message} </p>
        </div>

        <div className="flex justify-around">
          <button
            disabled={!isDirty || !isValid || isSubmitting}
            className={
              !isDirty || !isValid || isSubmitting ? "cursor-not-allowed" : ""
            }
          >
            Submit
          </button>
          <button
            disabled={!isDirty}
            className={!isDirty ? "cursor-not-allowed" : ""}
            onClick={() => reset()}
          >
            Reset
          </button>
          <button onClick={handleGetValues}>Get values</button>
          <button onClick={handleSetValue}>Set Value</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
