"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreateForm({ defaultValues }: any) {
  const [formData, setFormData] = useState(defaultValues);
  const [date, setDate] = useState<Date>();

  const formSchema = z.object(defaultValues);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues },
  });

  function handleInputChange(
    key: any,
    value: any,
    formData: any,
    setFormData: any,
  ) {
    console.log(formData);

    setFormData({ ...formData, [key]: value });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={() => (
            <FormItem>
              {Object.keys(defaultValues).map((key: any) => {
                return (
                  <div key={key} className="pb-2">
                    <FormControl>
                      {renderField(key, defaultValues[key])}
                    </FormControl>
                  </div>
                );
              })}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="button" onClick={onSubmit}>
          Create
        </Button>
      </form>
    </Form>
  );

  function renderField(key: string, dict: any) {
    console.log(dict.name);

    switch (String(dict.type).toLowerCase()) {
      case "string":
        return (
          dict.name === "content" ?
            <>
              <FormLabel>{dict.name}</FormLabel>
              <CKEditor
                editor={ClassicEditor}
                data=""
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
            </>
            :
            <>
              <FormLabel>{dict.name}</FormLabel>
              <Input
                type={`${dict.name}`}
                onChange={(e) =>
                  handleInputChange(key, e.target.value, formData, setFormData)
                }
                placeholder={`${dict.name}`}
                {...defaultValues}
              />
            </>
        );
      // case "datetime":
      // return (
      //   <>
      //     <FormLabel>{dict.name}</FormLabel>
      //     <Popover>
      //       <PopoverTrigger asChild>
      //         <Button
      //           variant={"outline"}
      //           className={cn(
      //             "w-[280px] justify-start text-left font-normal",
      //             !date && "text-muted-foreground",
      //           )}
      //         >
      //           <CalendarIcon className="mr-2 h-4 w-4" />
      //           {date ? format(date, "PPP") : <span>Pick a date</span>}
      //         </Button>
      //       </PopoverTrigger>
      //       <PopoverContent className="w-auto p-0">
      //         <Calendar
      //           mode="single"
      //           selected={date}
      //           onSelect={setDate}
      //           initialFocus
      //         />
      //       </PopoverContent>
      //     </Popover>
      //   </>
      // );
      case "boolean":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id="terms2" />
            <label
              htmlFor="terms2"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {dict.name}
            </label>
          </div>
        );
      case "datetime":
      default:
        return null; // If the type doesn't match any case
    }
  }
}
