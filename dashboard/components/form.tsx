"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { SelectLabel } from "@radix-ui/react-select";

export default function CreateForm({ defaultValues, model }: any) {
  const { toast } = useToast()

  const initialState = defaultValues.reduce((acc: any, item: any) => {
    acc[item.name] = item.kind === "object" ? [] : null;
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialState);

  const formSchema = z.object(defaultValues);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues },
  });

  function handleInputChange(key: string, value: any) {
    setFormData({ ...formData, [key]: value });
  }

  function handleCheckboxChange(key: string) {
    setFormData({
      ...formData,
      [key]: formData[key] === null ? true : !formData[key],
    });
  }

  function handle(key: string, value: number) {
    // Create a copy of the array
    const newArray: Array<number> = formData[key];

    // Make the desired changes to the copy
    const index = newArray.indexOf(value);
    if (index !== -1) {
      newArray.splice(index, 1);
    } else {
      newArray.push(value);
    }

    // Update the state with the new array
    setFormData({ ...formData, [key]: newArray });
  }

  function onSubmit() {
    // console.log(formData)

    return fetch(`http://localhost:8000/admin/models/${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      toast({
        title: "Scheduled: Catch up",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
    })
    .catch(error => {
      console.error('Error:', error);
    });

  }


  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        {Object.keys(defaultValues).map((key: any) => {
          return (
            <FormField
              control={form.control}
              name={defaultValues[key].name}
              key={defaultValues[key].name}
              render={() => (
                <FormItem key={defaultValues[key].name} className="pb-2">
                  <FormControl>
                    {renderField(key, defaultValues[key])}
                  </FormControl>
                </FormItem>
              )}
            />
          );
        })}
        <Button type="button" onClick={onSubmit}>
          Create
        </Button>
      </form>
    </Form>
  );

  function renderField(key: string, dict: any) {
    if (String(dict.kind).toLowerCase() === "object") {
      return (
        <Select
          key={dict.name}
          name={dict.name}
          value={formData[dict.name]}
          onValueChange={(e: any) => handle(dict.name, e)}
        >
          <Label>{dict.name}</Label>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`${dict.name}`}>
              {
                formData[dict.name]
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dict.records.map((key: any) => {
                return (
                  <SelectItem className="cursor-pointer" key={key.id} value={key.id}>
                    {key.name ? key.name : key.title}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    } else if (String(dict.kind).toLowerCase() === "enum") {
      return (
        <Select
          key={dict.name}
          name={dict.name}
          value={formData[dict.name]}
          onValueChange={(e: any) => setFormData({ ...formData, [dict.name]: e })}
        >
          <Label>{dict.name}</Label>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={`${dict.name}`}>
              {
                formData[dict.name]
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dict.values.map((key: any) => {
                return (
                  <SelectItem className="cursor-pointer" key={key.name} value={key.name}>
                    {key.name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    } else if (String(dict.type).toLowerCase() === "string") {
      return dict.name === "post_content" ? (
        <>
          <FormLabel>
            {dict.name} {dict.isRequired ? "*" : ""}
          </FormLabel>
          <CKEditor
            editor={ClassicEditor}
            data=""
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              handleInputChange(dict.name, data);
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </>
      ) : (
        <>
          <FormLabel>
            {String(dict.name).toUpperCase()} {dict.isRequired ? "*" : ""}
          </FormLabel>
          <Input
            type={dict.name}
            key={dict.name}
            name={dict.name}
            value={formData[dict.name] || ""}
            onChange={(e) => handleInputChange(dict.name, e.target.value)}
            placeholder={dict.name}
          />
        </>
      );
    } else if (String(dict.type).toLowerCase() === "int") {
      return dict.isReadOnly || dict.isId ? null : (
        <>
          <FormLabel>
            {dict.name} {dict.isRequired ? "*" : ""}
          </FormLabel>
          <Input
            type="number"
            key={dict.name}
            name={dict.name}
            value={formData[dict.name] || ""}
            onChange={(e) =>
              handleInputChange(dict.name, Number(e.target.value))
            }
            placeholder={`${dict.name}`}
          />
        </>
      );
    } else if (String(dict.type).toLowerCase() === "boolean") {
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms2"
            key={dict.name}
            name={dict.name}
            value={formData[dict.name] || false}
            onClick={(e) => handleCheckboxChange(dict.name)}
          />
          <label
            htmlFor="terms2"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {dict.name} {dict.isRequired ? "*" : ""}
          </label>
        </div>
      );
    }
    // else if (String(dict.type).toLowerCase() === "datetime") {
    //   return dict.hasDefaultValue || dict.isUpdatedAt ? null : (
    //     <>
    //       <FormLabel>
    //         {dict.name} {dict.isRequired ? "*" : ""}
    //       </FormLabel>
    //       <Popover>
    //         <PopoverTrigger asChild>
    //           <Button
    //             variant={"outline"}
    //             className={cn(
    //               "w-[280px] justify-start text-left font-normal",
    //               !date && "text-muted-foreground",
    //             )}
    //           >
    //             <CalendarIcon className="mr-2 h-4 w-4" />
    //             {date ? format(date, "PPP") : <span>Pick a date</span>}
    //           </Button>
    //         </PopoverTrigger>
    //         <PopoverContent className="w-auto p-0">
    //           <Calendar
    //             mode="single"
    //             selected={date}
    //             onSelect={setDate}
    //             initialFocus
    //           />
    //         </PopoverContent>
    //       </Popover>
    //     </>
    //   );
    // }
    return null; // If the type doesn't match any case
  }
}
