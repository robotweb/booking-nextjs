import { Label } from "@radix-ui/react-dropdown-menu";
import { FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { addVehicle } from "@/actions/data";

// @ts-ignore
export const AddVehicleForm = ({ returnSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    //description: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData);
    try {
      if (formData.name === "") return;
      const response = await addVehicle(formData);
      if (response.success) {
        setFormData({
          name: "",
        });
      }
      returnSubmit(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="flex w-full gap-2" onSubmit={handleSubmit}>
        <FormItem className="w-full">
          <Input
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormItem>
        <Button className="w-1/4">Submit</Button>
      </form>
    </>
  );
};
