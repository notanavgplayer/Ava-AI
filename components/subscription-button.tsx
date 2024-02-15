"use client";
import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

export const SubscriptionButton = ({ isPro =  false } : {isPro : boolean}) => {
  const [loading, setLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const router = useRouter();
  const proModal = useProModal();
  const manageSubscription = async () => {
    try {
      setLoading(true);
      setIsAlertOpen(true);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onclickHandler = async () => {
    try {
      setLoading(true);
      setIsAlertOpen(false);
      await axios.delete("/api/paypal");
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={isPro ? "default" : "premium"}
        disabled={loading}
        onClick={isPro ? manageSubscription : proModal.onOpen}
      >
        {isPro ? "Manage Subscription" : "Upgrade"}
        {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
      </Button>
      <AlertDialog open={isAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Subscription</AlertDialogTitle>
            <AlertDialogDescription className="text-justify">
              Are you sure you want to cancel your subscription? Please note,
              this action cannot be undone. Once confirmed, your account will
              lose access to subscription benefits immediately. We value your
              participation and would hate to see you go. Please consider this
              decision carefully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={onclickHandler}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
