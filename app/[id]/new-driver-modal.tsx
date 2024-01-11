"use client";
import { useRef } from "react";

import { Rowdies } from "next/font/google";
import { handleNewDriver } from "@/app/[id]/actions";
import MaterialSymbolsAddCircleOutlineRounded from "@/components/materialSymbolsAddCircleOutlineRounded";
import GridiconsCrossCircle from "@/components/gridicons-cross-circle";

const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });
export function NewDiverModal(props: { poolId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
              dialogRef.current?.close();
            }}
          >
            <GridiconsCrossCircle className="h-6 text-primary"></GridiconsCrossCircle>
          </button>
        </header>

        <form
          ref={formRef}
          className="space-y-6"
          action={async (f) => {
            await handleNewDriver(f);
            dialogRef.current?.close();
            formRef.current?.reset();
          }}
        >
          <input
            required
            className="border-primary border-2 bg-secondary py-2 px-4 rounded-full w-full"
            type="text"
            placeholder="Nom"
            name="name"
            minLength={1}
            maxLength={255}
          />
          <input
            className="hidden"
            type="hidden"
            name="poolId"
            value={props.poolId}
          />

          <button className="bg-primary w-full py-2 px-4 rounded-full text-secondary">
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
