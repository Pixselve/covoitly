"use client";
import { handleNewMemberSchedule } from "@/lib/action";
import { rowdies } from "@/lib/font";
import { useFormState } from "react-dom";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { newDriverSchema, newMemberScheduleSchema } from "@/lib/schema";

export default function ({ memberId }: { memberId: number }) {
  const [lastResult, action] = useFormState(handleNewMemberSchedule, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: newMemberScheduleSchema });
    },
    defaultValue: {
      memberId,
    },
    constraint: getZodConstraint(newMemberScheduleSchema),
    shouldValidate: "onBlur",
  });

  return (
    <form
      {...getFormProps(form)}
      action={action}
      className={`${rowdies.className} text-2xl space-y-4 border-4 rounded-xl p-4 w-full`}
    >
      <div className="max-w-2xl">
        <label htmlFor={fields.date.id}>Je souhaite partir le</label>
        <input
          className="bg-primary border-b-2"
          {...getInputProps(fields.date, { type: "date" })}
        />
        <label htmlFor={fields.from.id}>
          pour arriver à mon lieu de travail à{" "}
        </label>
        <input
          className="bg-primary border-b-2"
          {...getInputProps(fields.from, { type: "time" })}
        />
        <label htmlFor={fields.to.id}>et repartir à</label>
        <input
          className="bg-primary border-b-2"
          {...getInputProps(fields.to, { type: "time" })}
        />
        <input
          className="hidden"
          {...getInputProps(fields.memberId, { type: "hidden" })}
        />
        <span>.</span>
      </div>

      <button
        type="submit"
        className="bg-secondary text-primary px-4 py-2 rounded-full"
      >
        Ajouter
      </button>

      <p>{form.errors}</p>
    </form>
  );
}
