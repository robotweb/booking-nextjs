"use server";
import { db } from "@/lib/db";
import { useSession } from "next-auth/react";

export async function getUserByEmail(email: unknown) {
  console.log("userByEmail", email);
  const user = await db.user.findUnique({
    where: { email: email as string },
    include: {
      roles: true,
    },
  });
  console.log(user);
  return user;
}

export async function getUserById(id: unknown) {
  const user = await db.user.findUnique({
    where: { id: id as string },
  });
  console.log("userById", user);
  return user;
}

export async function updateUserProfiile(values: unknown) {
  const { data: session, status } = useSession();
  console.log("Updating user");
  const { email, name } = values as { email: string; name: string };
  const updatedUser = await db.user.update({
    where: { email: email as string },
    data: { name: name as string },
  });
  console.log("new user data", updatedUser);
  return updatedUser;
}

export async function addService(values: unknown) {
  try {
    console.log("Adding service");
    const { name } = values as { name: string };
    const service = await db.service.create({
      data: { name: name as string },
    });
    console.log("new service", service);
    return { success: true, data: service };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function getServices() {
  try {
    const services = await db.service.findMany();
    console.log("services", services);
    return { success: true, data: services };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function addLocation(values: unknown) {
  try {
    console.log("Adding location");
    const { name } = values as { name: string };
    const location = await db.location.create({
      data: { name: name },
    });
    console.log("new location", location);
    return { success: true, data: location };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function getLocations() {
  try {
    const locations = await db.location.findMany();
    console.log("locations", locations);
    return { success: true, data: locations };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function addVehicle(values: any) {
  try {
    console.log("Adding vehicle", values);
    const { name } = values;
    const vehicle = await db.vehicle.create({
      data: { name: name },
    });
    console.log("new vehicle", vehicle);
    return { success: true, data: vehicle };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function getVehicles() {
  try {
    const vehicles = await db.vehicle.findMany();
    console.log("vehicles", vehicles);
    return { success: true, data: vehicles };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function addPrice(values: {
  service_id: string;
  vehicle_id: string;
  origin_id: string;
  destination_id: string;
  price: string;
}) {
  try {
    const price = await db.vehicleLocationPrice.create({
      data: {
        serviceId: parseInt(values.service_id),
        vehicleId: parseInt(values.vehicle_id),
        startLocationId: parseInt(values.origin_id),
        endLocationId: parseInt(values.destination_id),
        price: parseFloat(values.price),
      },
    });
    console.log("new price", price);
    return { success: true, data: price };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function getPrices() {
  try {
    const prices = await db.vehicleLocationPrice.findMany({
      select: {
        id: true,
        price: true,
        vehicle: {
          select: {
            name: true,
          },
        },
        service: {
          select: {
            name: true,
          },
        },
        startLocation: {
          select: {
            name: true,
          },
        },
        endLocation: {
          select: {
            name: true,
          },
        },
      },
    });
    const transformedPrices = prices.map((price) => ({
      id: price.id,
      price: price.price,
      vehicleName: price.vehicle.name,
      serviceName: price.service.name,
      startLocationName: price.startLocation.name,
      endLocationName: price.endLocation.name,
    }));
    console.log("prices", transformedPrices);
    return { success: true, data: transformedPrices };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function getClients() {
  try {
    const clients = await db.client.findMany();
    console.log("clients", clients);
    return { success: true, data: clients };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}

export async function addClient(values: unknown) {
  try {
    console.log("Adding client");
    const { name, email, phone } = values as {
      name: string;
      email: string;
      phone: string;
    };
    const service = await db.client.create({
      data: {
        name: name as string,
        email: email as string,
        phone: phone as string,
      },
    });
    console.log("new service", service);
    return { success: true, data: service };
  } catch (error) {
    console.log("error", error);
    return { error: error };
  }
}
