"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Upload, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Heading } from "@/components/heading";
import { Form, FormField } from "@/components/ui/form";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Empty } from "@/components/empty";
import FileUpload from "@/components/file-upload";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formSchema } from "./constants";

const VideoPage = () => {
  const ProModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      audioOrVideoUrl: "",
      imageOrVideoUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values.audioOrVideoUrl || !values.imageOrVideoUrl)
        return toast.error("Please upload both audio and video");

      setVideo(undefined);

      const response = await axios.post("api/video", values);

      setVideo(response.data);
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
        title="Video Generation"
        description="Single Image Talking Face Animation"
        icon={Video}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
        />
        <h1 className="text-center font-bold sm:text-xs lg:text-2xl mt-16 ">Upload a Image to create a Talking Face Animation.</h1>
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
              <div className="col-span-12 p-2 lg:p-1 lg:col-span-5 flex justify-center items-center border-dashed border-slate-400 border">
                <Dialog onOpenChange={(open) => !open}>
                  <DialogTrigger>
                    <div className=" flex justify-center items-center text-sm hover:text-slate-600 transition-all ">
                      <Upload className="w-6 h-6 mr-2" /> Upload Image or Video
                      *
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="mb-4">
                      <DialogTitle>Upload Image or Video</DialogTitle>
                      <DialogDescription className="pt-2 text-sm text-slate-600 font-normal ">
                        Upload an image or video of a person&apos;s face. Ensure the
                        image is in .png format and the video is in .mp4 format.
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      name="imageOrVideoUrl"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          <FileUpload
                            endpoint="ImageOrVideoUpload"
                            onChange={field.onChange}
                            value={field.value}
                          />
                        </div>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          className="w-full"
                          type="button"
                          size="icon"
                          color="secondary"
                          onClick={() => router.refresh()}
                        >
                          Done
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="col-span-12 p-2 lg:p-1 lg:col-span-5 flex justify-center items-center border-dashed border-slate-400 border">
                <Dialog>
                  <DialogTrigger>
                    <div className=" flex justify-center items-center text-sm hover:text-slate-600 transition-all ">
                      <Upload className="w-6 h-6 mr-2" /> Upload audio or video
                      *
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="mb-4">
                      <DialogTitle>Upload Audio or Video</DialogTitle>
                      <DialogDescription className="pt-2 text-sm text-slate-600 font-normal ">
                        Upload an audio or video file of the person speaking.
                        Ensure the audio is in .wav format and the video is in
                        .mp4 format.
                      </DialogDescription>
                    </DialogHeader>
                    <FormField
                      name="audioOrVideoUrl"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex flex-col gap-2">
                          <FileUpload
                            endpoint="audioOrVideoUpload"
                            onChange={field.onChange}
                            value={field.value}
                          />
                        </div>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          className="w-full"
                          type="button"
                          size="icon"
                          color="secondary"
                          onClick={() => router.refresh()}
                        >
                          Done
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="col-span-12 lg:col-span-2 flex justify-center items-center">
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isLoading}
                  size="icon"
                >
                  Generate
                </Button>
              </div>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {!video && !isLoading && (
            <div>
              <Empty label="No video generated" />
            </div>
          )}
          {video && (
            <video
              className="w-full aspect-video mt-8 rounded-lg border bg-black"
              controls
            >
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
