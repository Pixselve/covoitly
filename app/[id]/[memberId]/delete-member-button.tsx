"use client";
import { deleteMember } from "@/app/[id]/[memberId]/actions";
import { useTransition } from "react";

type DeleteMemberButtonProps = {
  memberId: number;
};

export default function DeleteMemberButton(props: DeleteMemberButtonProps) {
  const [isLoadingDeleteMember, deleteMemberTransaction] = useTransition();
  return (
    <button
      onClick={() =>
        deleteMemberTransaction(() => {
          deleteMember(props.memberId);
        })
      }
      className="bg-red-500 text-lg py-2 px-4 rounded-full"
    >
      Supprimer mon profile
    </button>
  );
}
