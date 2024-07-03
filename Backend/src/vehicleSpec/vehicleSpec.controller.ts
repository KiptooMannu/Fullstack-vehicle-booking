import { Context } from "hono";
import { vehicleSpecificationsService, getVehicleSpecificationService, createVehicleSpecificationService, updateVehicleSpecificationService, deleteVehicleSpecificationService } from "./vehicleSpec.services";

export const listVehicleSpecifications = async (c: Context) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await vehicleSpecificationsService(limit);

        if (data == null || data.length == 0) {
            return c.text("Vehicle specifications not found", 404);
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const getVehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const specification = await getVehicleSpecificationService(id);
    if (specification == undefined) {
        return c.text("Vehicle specification not found", 404);
    }
    return c.json(specification, 200);
}

export const createVehicleSpecification = async (c: Context) => {
    try {
        const specification = await c.req.json();
        const createdSpecification = await createVehicleSpecificationService(specification);

        if (!createdSpecification) {
            return c.text("Vehicle specification not created", 404);
        }
        return c.json(createdSpecification, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const updateVehicleSpecification = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const specification = await c.req.json();
    try {
        const searchedSpecification = await getVehicleSpecificationService(id);
        if (searchedSpecification == undefined) return c.text("Vehicle specification not found", 404);

        const res = await updateVehicleSpecificationService(id, specification);
        if (!res) return c.text("Vehicle specification not updated", 404);

        return c.json({ msg: "Vehicle specification updated successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

export const deleteVehicleSpecification = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const specification = await getVehicleSpecificationService(id);
        if (specification == undefined) return c.text("Vehicle specification not found", 404);

        const res = await deleteVehicleSpecificationService(id);
        if (!res) return c.text("Vehicle specification not deleted", 404);

        return c.json({ msg: "Vehicle specification deleted successfully" }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
