"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { toggleUserBlockAction } from "@/lib/actions/user";

interface UserBlockButtonProps {
  userId: string;
  isBlocked: boolean;
}

export function UserBlockButton({ userId, isBlocked }: UserBlockButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    const actionText = isBlocked ? "Unblocking" : "Blocking";
    const loadingToast = toast.loading(`${actionText} user...`);

    try {
      const res = await toggleUserBlockAction(userId, !isBlocked);
      toast.dismiss(loadingToast);
      if (res?.success) {
        toast.success(`User ${isBlocked ? "unblocked" : "blocked"} successfully!`);
      } else {
        toast.error(res?.message || `Failed to change user status`);
      }
    } catch (error: any) {
      toast.dismiss(loadingToast);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleToggle}
      isDisabled={isLoading}
      className={`font-semibold rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1.5 ${
        isBlocked
          ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
          : "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
      }`}
    >
      {isLoading ? (
        <span>Processing...</span>
      ) : isBlocked ? (
        <>
          <ShieldCheck className="w-4 h-4" />
          Unblock
        </>
      ) : (
        <>
          <ShieldAlert className="w-4 h-4" />
          Block
        </>
      )}
    </Button>
  );
}