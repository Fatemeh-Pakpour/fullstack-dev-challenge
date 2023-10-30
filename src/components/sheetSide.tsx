import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import {
    Sheet, SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "~/components/ui/sheet";
import { fetchData } from "~/utils";
import { toast } from "~/components/ui/use-toast";
import moment from "moment";
import { type VesselsType } from "~/pages/api/vessel/getAll";


export function SheetSide() {
    const formSchema = z.object({
        departure: z.string(),
        arrival: z.string(),
        portOfLoading: z.string(),
        portOfDischarge: z.string(),
        vessel: z.string(),
    });
    const [error, setError] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        const departure = form.getValues("departure");
        const arrival = form.getValues("arrival");
        if (arrival && departure) {
            setError(moment(arrival).isBefore(departure));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, form.getValues("departure"), form.getValues("arrival")]);


    const mutation =
        useMutation(
            async (values: z.infer<typeof formSchema>) => {
                const isBefore = moment(values.arrival).isBefore(values.departure);
                setError(isBefore);
                try {
                    if (!error) {
                        const response = await fetch('/api/voyage/create', {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body:
                                JSON.stringify({
                                    portOfLoading: values.portOfLoading,
                                    portOfDischarge: values.portOfDischarge,
                                    scheduledArrival: moment(values.arrival).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                                    scheduledDeparture: moment(values.departure).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
                                    vesselId: values.vessel,
                                }),
                        });
                        if (!response.ok) {
                            toast({
                                variant: "destructive",
                                title: "Request error.",
                                description: "Please try again",
                            })
                            throw new Error('An error occurred');
                        }
                        else {
                            toast({
                                title: "Registration successful.",
                                description: "Data received successfully",
                            })
                        }
                        form.reset();
                    }
                } catch (error) {
                    toast({
                        variant: "destructive",
                        title: "Network error.",
                        description: "Please try again.",
                    })
                }
            }
        );
    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values);
    }

    const { data: vessels } = useQuery<VesselsType>(["vessels"], () =>
        fetchData("vessel/getAll")
    );

    return (
        <div className="grid gap-4 pl-4 lg:pl-8 md:justify-items-start lg:justify-items-center lg:grid-cols-7">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" className="bg-white text-black my-4 w-min col-start-1 col-end-3">Create</Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-slate-600 overflow-y-auto">
                    <SheetHeader className="mb-8">
                        <SheetTitle className="mb-2">Add a voyage</SheetTitle>
                        <SheetDescription>
                            Add a voyage here. Click submit when you're done.
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="departure"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Departure</FormLabel>
                                        <FormControl>
                                            <Input type="date"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {error && <p className='text-rose-600 text-xs'>Arrival date is before departure date</p>}
                            <FormField
                                control={form.control}
                                name="arrival"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Arrival</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="portOfLoading"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Port of loading</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Port of loading"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="portOfDischarge"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Port of discharge</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Port of discharge" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vessel"
                                render={({ field }) =>
                                    <FormItem>
                                        <FormLabel>Vessel</FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a vessel" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {vessels?.map(vessel => (<SelectItem value={vessel.value} key={vessel.value}>{vessel.label}</SelectItem>))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                }
                            />
                            <Button type="submit" style={{ marginTop: "25px" }}>Submit</Button>
                        </form>
                    </Form>
                </SheetContent>
            </Sheet>
        </div >
    )
}
