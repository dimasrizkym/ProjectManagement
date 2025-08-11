import { Button } from "@/components/ui/button";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";
import apiClient from "@/config/axios";
import { toast } from "sonner";
import ReactSelect from "react-select";
import { fi } from "zod/v4/locales";

interface tagsOptions {
  label: string;
  value: string;
}

const formSchema = z
  .object({
    taskId: z.string().optional().nullable(),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    priority: z.string().min(1, { message: "Priority is required" }),
    tag: z.array(z.string().min(1, { message: "Tag is required" })),
    dueDate: z.string().min(1, { message: "Due date is required" }),
  })
  .superRefine((data, ctx) => {
    const today = new Date().toISOString().split("T")[0];
    if (data.dueDate < today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Due date cannot be in the past",
        path: ["dueDate"],
      });
    }
  });

const FormProject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<tagsOptions[]>([]);
  const navigate = useNavigate();

  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  const getTags = async () => {
    try {
      const { data } = await apiClient.get("/tags");
      const result = data.map((tag: { tag_name: string }) => {
        return {
          label: tag.tag_name,
          value: tag.tag_name,
        };
      });

      setTags(result);
    } catch (error) {
      toast("Failed to get tags. Please try again.");
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      taskId: null,
      title: "",
      description: "",
      priority: "",
      tag: [],
      dueDate: "",
    },
  });

  const handleForm = async (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
  };

  useEffect(() => {
    if (open) {
      getTags();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Form Project</DialogTitle>
          <DialogDescription asChild>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleForm)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Due Date</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Priority"</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {priorityOptions.map(
                                (
                                  option: { value: string; label: string },
                                  index: number
                                ) => (
                                  <SelectItem key={index} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <ReactSelect
                            options={tags}
                            isMulti
                            isClearable
                            placeholder="Select tags"
                            onChange={(value) => {
                              value
                                ? field.onChange(
                                    value.map(
                                      (item: { value: string }) => item.value
                                    )
                                  )
                                : [];
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading && <Loading />}
                      Save
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FormProject;
