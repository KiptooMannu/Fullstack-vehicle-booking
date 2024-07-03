import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIVehicleSpec, TSVehicleSpec, VehicleSpecificationsTable } from "../drizzle/schema";

// Service to fetch vehicle specifications
export const vehicleSpecificationsService = async (limit?: number): Promise<TSVehicleSpec[] | null> => {
    if (limit) {
        return await db.query.VehicleSpecificationsTable.findMany({
            limit: limit
        });
    }
    return await db.query.VehicleSpecificationsTable.findMany();
}

// Service to fetch a single vehicle specification by ID
export const getVehicleSpecificationService = async (id: number): Promise<TSVehicleSpec | undefined> => {
    return await db.query.VehicleSpecificationsTable.findFirst({
        where: eq(VehicleSpecificationsTable.vehicleId, id)
    });
}

// Service to create a new vehicle specification
export const createVehicleSpecificationService = async (specification: TIVehicleSpec) => {
    await db.insert(VehicleSpecificationsTable).values(specification);
    return "Vehicle specification created successfully";
}

// Service to update a vehicle specification by ID
export const updateVehicleSpecificationService = async (id: number, specification: Partial<TIVehicleSpec>) => {
    await db.update(VehicleSpecificationsTable).set(specification).where(eq(VehicleSpecificationsTable.vehicleId, id));
    return "Vehicle specification updated successfully";
}

// Service to delete a vehicle specification by ID
export const deleteVehicleSpecificationService = async (id: number) => {
    await db.delete(VehicleSpecificationsTable).where(eq(VehicleSpecificationsTable.vehicleId, id));
    return "Vehicle specification deleted successfully";
}
