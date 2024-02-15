"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Headphones, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Heading } from "@/components/heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Empty } from "@/components/empty";
import FileUpload from "@/components/file-upload";
import HoverMessage from "@/components/hover-message";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProModal } from "@/hooks/use-pro-modal";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formSchema, speedOptions, voiceOptions } from "./constants";

const ConversationPage = () => {
  const ProModal = useProModal();
  const router = useRouter();
  const [audio, setAudio] = useState<string>();
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      custom_voice: "random",
      speed: "standard",
    },
  });

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setAudio(undefined);

      if (
        form.getValues("custom_voice") !== "random" &&
        !form.getValues("voice")
      ) {
        toast.error("Please upload a voice file");
        return;
      }

      const response = await axios.post("api/audio", values);

      setAudio(response.data);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        ProModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      router.refresh();
    }
  };

  if (!isMounted) return null;

  return (
    <div>
      <Heading
        title="Audio Generation"
        description="Generate speech from text, clone voices from mp3 files."
        icon={Headphones}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                    rounded-lg 
                    border 
                    w-full 
                    p-4 
                    px-3 
                    md:px-6 
                    focus-within:shadow-sm
                    grid
                    grid-cols-12
                    gap-2 
                    "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      "col-span-12",
                      form.getValues("custom_voice") === "custom_voice"
                        ? "lg:col-span-5"
                        : "lg:col-span-6"
                    )}
                  >
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-2 outline-none focus-visible:ring-0 focus-visible:ring-transparent border-gray-300 rounded-sm py-5 px-4"
                        disabled={isLoading}
                        placeholder="The expressiveness of autoregressive transformers is literally nuts! I absolutely adore them."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="col-span-12 lg:col-span-2 border-2 border-gray-300 rounded-sm">
                <HoverMessage message="Select speed" side="top">
                  <FormField
                    control={form.control}
                    name="speed"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {speedOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </HoverMessage>
              </div>
              <div className="col-span-12 lg:col-span-2 border-2 border-gray-300 rounded-sm">
                <HoverMessage message=" Select voice" side="top">
                  <FormField
                    control={form.control}
                    name="custom_voice"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {voiceOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </HoverMessage>
              </div>
              {form.getValues("custom_voice") === "custom_voice" && (
                <Dialog>
                  <DialogTrigger>
                    <Button
                      className={cn("col-span-12 lg:col-span-2 w-full ")}
                      type="button"
                      disabled={isLoading}
                      size="icon"
                    >
                      <Upload className="w-5 h-5" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Voice</DialogTitle>
                      <DialogDescription className="pt-2 text-sm text-slate-700 font-normal ">
                        Create a custom voice based on an mp3 file of a speaker.
                        Audio should be at least 15 seconds, only contain one
                        speaker, and be in mp3 format.
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      name="voice"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          <FileUpload
                            endpoint="audioUpload"
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />
                  </DialogContent>
                </Dialog>
              )}

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!audio && !isLoading && (
            <div>
              <Empty label="No music generated" />
            </div>
          )}
          {audio && (
            <audio controls className="w-full mt-8">
              <source src={audio} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
