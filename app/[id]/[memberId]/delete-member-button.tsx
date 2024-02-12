"use client";
import { useTransition } from "react";
import { deleteMember } from "@/lib/action";

type DeleteMemberButtonProps = {
  memberId: number;
};

export default function DeleteMemberButton(props: DeleteMemberButtonProps) {
  const [isLoadingDeleteMember, deleteMemberTransaction] = useTransition();
  return (
    <button
      disabled={isLoadingDeleteMember}
      onClick={() =>
        deleteMemberTransaction(async () => {
          await deleteMember(props.memberId);
        })
      }
      className="bg-red-500 text-lg py-2 px-4 rounded-full"
    >
      Supprimer mon profile
    </button>
  );
}
