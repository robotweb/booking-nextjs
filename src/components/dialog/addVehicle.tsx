import { useState } from "react";
import { AddClientForm } from "../form/add-client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AddServiceForm } from "../form/add-service";
import { AddVehicleForm } from "../form/add-vehicle";

export const AddVehicle = ({ returnSubmit }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (response: any) => {
    console.log(response);
    if (response.success) {
      //@todo
      setDialogOpen(false);
    }
    returnSubmit(response);
  };
  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => {
        setDialogOpen(!dialogOpen);
      }}
    >
      <DialogTrigger>
        <Button>Add Vehicle</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">Add Vehicle</DialogTitle>
          <DialogDescription>
            <AddVehicleForm returnSubmit={handleSubmit}></AddVehicleForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
