"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { AddLocationForm } from "@/components/form/add-location";
import { DataTable } from "@/components/table/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { getLocations } from "@/actions/data";
import { AddLocation } from "@/components/dialog/addLocation";

const SettingsUserPage = () => {
  type Location = {
    id: string;
    name: number;
  };
  const columns: ColumnDef<Location>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const service = row.id;
        return (
          <div className="flex justify-end h-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      const result = await getLocations();
      console.log(result);
      if (result.success) {
        setData(result.data as []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const handleSubmit = (response: any) => {
    console.log(response);
    if (response.success) {
      getData();
    }
  };
  return (
    <div className="p-6 space-y-4 flex-column">
      <AddLocation returnSubmit={handleSubmit}></AddLocation>
      <DataTable columns={columns} data={data}></DataTable>
    </div>
  );
};

export default SettingsUserPage;
