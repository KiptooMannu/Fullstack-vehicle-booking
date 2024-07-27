import { Context } from "hono";
import { vehiclesService, getVehicleService, updateVehicleService, deleteVehicleService, createVehicleWithSpecifications } from "./vehicle.services";

export const listVehicles = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await vehiclesService(limit);

        if (data == null || data.length == 0) {
            return c.text("Vehicles not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const getVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicle = await getVehicleService(id);
    if (vehicle == undefined) {
        return c.text("Vehicle not found", 404);
    }
    return c.json(vehicle, 200);
}

export const createVehicle = async (c: Context) => {
    try {
        const vehicleData = await c.req.json();
        console.log(vehicleData);

        const createdVehicle = await createVehicleWithSpecifications(vehicleData);

        if (!createdVehicle) {
            return c.text("Vehicle not created", 404);
        }
        return c.json(createdVehicle, 201);
    } catch (error: any) {
        console.error('Error creating vehicle:', error);
        return c.json({ error: error?.message }, 400);
    }
};

export const updateVehicle = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const vehicle = await c.req.json();
    try {
        const searchedVehicle = await getVehicleService(id);
        if (searchedVehicle == undefined) return c.text("Vehicle not found", 404);

        const res = await updateVehicleService(id, vehicle);
        if (!res) return c.text("Vehicle not updated", 404);

        return c.json({ msg: "Vehicle updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteVehicle = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const vehicle = await getVehicleService(id);
        if (vehicle == undefined) return c.text("Vehicle not found", 404);

        const res = await deleteVehicleService(id);
        if (!res) return c.text("Vehicle not deleted", 404);

        return c.json({ msg: "Vehicle deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
