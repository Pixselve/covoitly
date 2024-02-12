"use client";
import { useRef } from "react";

import { Rowdies } from "next/font/google";
import { handleNewDriver } from "@/lib/action";
import MaterialSymbolsAddCircleOutlineRounded from "@/components/icons/materialSymbolsAddCircleOutlineRounded";
import GridiconsCrossCircle from "@/components/icons/gridicons-cross-circle";
import { newDriverSchema } from "@/lib/schema";
import { useFormState } from "react-dom";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Input } from "@/components/ui/input";

const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });
export function NewDiverModal(props: { poolId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modifiedAction = async (state: Awaited<unknown>, f: FormData) => {
    const result = await handleNewDriver(state, f);
    // sleep for 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));
    closeDialog();
    return result;
  };

  const [lastResult, action] = useFormState(modifiedAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: newDriverSchema });
    },
    defaultValue: {
      poolId: props.poolId,
    },
    constraint: getZodConstraint(newDriverSchema),
    shouldValidate: "onBlur",
  });

  function closeDialog() {
    dialogRef.current?.close();
    form.reset();
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`p-6 bg-secondary rounded-xl space-y-6 ${rowdies.className}`}
      >
        <header className="flex items-center justify-between">
          <h1 className={` text-xl text-primary`}>
            Ajouter un nouveau conducteur
          </h1>
          <button
            className="outline-none"
            type="button"
            onClick={() => {
              closeDialog();
            }}
          >
            <GridiconsCrossCircle className="h-6 text-primary"></GridiconsCrossCircle>
          </button>
        </header>

        <form {...getFormProps(form)} action={action} className="space-y-6">
          <div>
            <Input
              {...getInputProps(fields.name, { type: "text" })}
              className={`border-primary border-2 bg-secondary py-2 px-4 rounded-full w-full ${fields.name.errors ? "border-red-500" : ""}`}
              placeholder="Nom"
            />

            {fields.name.errors && (
              <div>
                {fields.name.errors?.map((error, i) => (
                  <p key={i} className="text-red-500 text-sm">
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          <input {...getInputProps(fields.poolId, { type: "hidden" })} />

          <button
            type="submit"
            className="bg-primary w-full py-2 px-4 rounded-full text-secondary"
          >
            Ajouter
          </button>
        </form>
      </dialog>

      <button
        onClick={() => {
          dialogRef.current?.showModal();
        }}
        className="rounded-full p-4 bg-secondary flex items-center justify-center text-primary hover:scale-105 transition-transform shadow-lg"
      >
        <MaterialSymbolsAddCircleOutlineRounded className="h-12"></MaterialSymbolsAddCircleOutlineRounded>
      </button>
    </>
  );
}
