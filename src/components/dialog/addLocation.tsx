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
import { AddLocationForm } from "../form/add-location";

export const AddLocation = ({ returnSubmit }) => {
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
        <Button>Add Location</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">Add Location</DialogTitle>
          <DialogDescription>
            <AddLocationForm returnSubmit={handleSubmit}></AddLocationForm>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
