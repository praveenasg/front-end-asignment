"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Contact, contactsData, states } from "@/lib/sampleData";
import { DataTable } from "./DataTable";
import { columns } from "./Columns";
import { useState } from "react";
import { format, addDays } from "date-fns";

// handle validation here.
const formSchema = z.object({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  date_of_birth: z.date().optional(),
  email_address: z
    .string()
    .email("Enter a valid email")
    .optional()
    .or(z.literal("")),
  phone_number: z
    .string()
    .max(10, {
      message: "Phone number should be 10 digits",
    })
    .optional(),
  street_address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z
    .string()
    .max(6, {
      message: "zip code should be 6 characters.",
    })
    .optional(),
});

function ContactSearch() {
  // Data after the user clicks on search will be stored in the variable
  const [filteredData, setFilteredData] = useState<Contact[]>();

  // Declare Form schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      date_of_birth: undefined,
      email_address: "",
      phone_number: "",
      street_address: "",
      city: "",
      state: "",
      zip_code: "",
    },
  });

  function handleRowSelect(row: Contact) {
    form.reset({
      firstname: row.firstname,
      lastname: row.lastname,
      date_of_birth: addDays(new Date(row.date_of_birth), 1),
      email_address: row.email_address,
      phone_number: row.phone_number,
      street_address: row.street_address,
      city: row.city,
      state: row.state,
      zip_code: row.zip_code,
    });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    //  return the contact if any of the following values (first name , last name ... execpt DATE OF BIRTH ) matches with the current contact
    const filteredValues = contactsData.filter((contact) => {
      return (
        (values.firstname && values.firstname.length > 0
          ? contact.firstname.includes(values.firstname)
          : true) &&
        (values.lastname && values.lastname.length > 0
          ? contact.lastname.includes(values.lastname)
          : true) &&
        (values.email_address && values.email_address.length > 0
          ? contact.email_address.includes(values.email_address)
          : true) &&
        (values.phone_number && values.phone_number.length > 0
          ? contact.phone_number.includes(values.phone_number)
          : true) &&
        (values.state && values.state.length > 0
          ? contact.state.includes(values.state)
          : true) &&
        (values.street_address && values.street_address.length > 0
          ? contact.street_address.includes(values.street_address)
          : true) &&
        (values.city && values.city.length > 0
          ? contact.city.includes(values.city)
          : true) &&
        (values.zip_code && values.zip_code.length > 0
          ? contact.zip_code.includes(values.zip_code)
          : true)
      );
    });
    setFilteredData(filteredValues);
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Choose a contact</h1>
      <div className="flex flex-col space-y-3 p-5">
        {/* ---- Form ---- */}
        <Form {...form}>
          <h2 className="text-lg">Search for a contact</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid lg:grid-cols-2 lg:gap-40 lg:items-center">
              {/* left side */}

              <div className="sm:grid sm:grid-cols-3 sm:gap-3">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date_of_birth"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 w-full text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "yyyy-MM-dd")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email_address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*----- right side -----*/}

              <div className="sm:grid sm:grid-cols-4 sm:gap-3">
                <FormField
                  control={form.control}
                  name="street_address"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-4">
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state.id} value={state.id}>
                              {state.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* ---- Submit Button ---- */}
            <Button type="submit" variant="outline" className="text-blue-400">
              Search
            </Button>
          </form>
        </Form>
      </div>

      {/* ---- Data Table ---- */}

      <DataTable
        columns={columns}
        data={filteredData ?? []}
        handleRowSelect={handleRowSelect}
      />
    </div>
  );
}
export default ContactSearch;
