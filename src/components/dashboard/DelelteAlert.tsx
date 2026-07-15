"use client";

import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { StationInput } from "@/types";
interface StationDeleteAlertProps {
  station: StationInput;
  onDelete: (id: string) => Promise<{ success: boolean; message?: string } | any>;
}

export function StationDeleteAlert({ onDelete, station }: StationDeleteAlertProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleActionDelete = async () => {
    if (!onDelete || !station._id) return; // এখানে আইডি চেক করা হলো

    setIsDeleting(true);
    const loadingToast = toast.loading('Deleting station...');

    try {
      const res = await onDelete(station._id);
      toast.dismiss(loadingToast);

      if (res?.success) {
        toast.success('Station deleted successfully!');
      } else {
        toast.error(res?.message || 'Failed to delete station');
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Something went wrong');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        className="text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
        aria-label="Delete Station"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
      
      <AlertDialog.Backdrop className="backdrop-blur-sm bg-black/50">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-slate-950 text-slate-100 border border-slate-900 rounded-2xl shadow-2xl p-4">
            <AlertDialog.CloseTrigger className="text-slate-500 hover:text-slate-300 transition-colors" />
            
            <AlertDialog.Header className="flex items-center gap-2">
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-rose-400 font-bold">Delete station permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            
            <AlertDialog.Body className="text-slate-400 text-sm my-3">
              <p>
                This will permanently delete <strong>{station?.title || 'this station'}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            
            <AlertDialog.Footer className="flex justify-end gap-2 mt-4">
              <Button slot="close" className="bg-slate-900 text-slate-300 hover:bg-slate-800 rounded-xl" isDisabled={isDeleting}>
                Cancel
              </Button>
              <Button 
                slot="close" 
                className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl flex items-center gap-1.5"
                onClick={handleActionDelete}
                isDisabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Station"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}