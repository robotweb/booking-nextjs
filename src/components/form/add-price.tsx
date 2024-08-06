import { FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  addPrice,
  getLocations,
  getServices,
  getVehicles,
} from "@/actions/data";
import { set } from "zod";
// @ts-ignore
export const AddPriceForm = ({ returnSubmit }) => {
  const [formData, setFormData] = useState({
    price: "",
  });

  const [serviceOptions, setServiceOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [service, setService] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const getData = async () => {
    try {
      const services = await getServices();
      setServiceOptions(services.data as []);
      const vehicles = await getVehicles();
      setVehicleOptions(vehicles.data as []);
      const locations = await getLocations();
      setLocationOptions(locations.data as []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const data = {
        service_id: service,
        vehicle_id: vehicle,
        origin_id: origin,
        destination_id: destination,
        price: formData.price,
      };
      const response = await addPrice(data);
      if (response.success) {
        setFormData({
          price: "",
        });
        setService("");
        setVehicle("");
        setOrigin("");
        setDestination("");
      }
      returnSubmit(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="flex flex-col w-full gap-2" onSubmit={handleSubmit}>
        <div className="flex w-full gap-2">
          <FormItem className="w-1/2">
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {serviceOptions?.map(
                    (option: { id: number; name: string }) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.name}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
          <FormItem className="w-1/2">
            <Select value={vehicle} onValueChange={setVehicle}>
              <SelectTrigger>
                <SelectValue placeholder="Vehicle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {vehicleOptions?.map(
                    (option: { id: number; name: string }) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.name}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </div>
        <div className="flex w-full gap-2">
          <FormItem className="w-1/2">
            <Select value={origin} onValueChange={setOrigin}>
              <SelectTrigger>
                <SelectValue placeholder="Origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {locationOptions?.map(
                    (option: { id: number; name: string }) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.name}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
          <FormItem className="w-1/2">
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger>
                <SelectValue placeholder="Destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {locationOptions?.map(
                    (option: { id: number; name: string }) => (
                      <SelectItem key={option.id} value={option.id.toString()}>
                        {option.name}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </div>
        <FormItem className="w-1/2">
          <Input
            id="price"
            name="price"
            placeholder="Price"
            // @ts-ignore
            value={formData.name}
            onChange={handleChange}
          />
        </FormItem>
        <Button className="w-1/4">Submit</Button>
      </form>
    </>
  );
};
