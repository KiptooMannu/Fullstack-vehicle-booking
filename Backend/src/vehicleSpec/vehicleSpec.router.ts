import { Hono } from "hono";
import { listVehicleSpecifications, getVehicleSpecification, createVehicleSpecification, updateVehicleSpecification, deleteVehicleSpecification } from "./vehicleSpec.controller";

export const vehicleSpecificationsRouter = new Hono();

// GET all vehicle specifications - /api/vehicle-specifications
vehicleSpecificationsRouter.get("/vehicle-specifications", listVehicleSpecifications);

// GET a single vehicle specification by ID - /api/vehicle-specifications/:id
vehicleSpecificationsRouter.get("/vehicle-specifications/:id", getVehicleSpecification);

// POST create a new vehicle specification - /api/vehicle-specifications
vehicleSpecificationsRouter.post("/vehicle-specifications", createVehicleSpecification);

// PUT update a vehicle specification by ID - /api/vehicle-specifications/:id
vehicleSpecificationsRouter.put("/vehicle-specifications/:id", updateVehicleSpecification);

// DELETE a vehicle specification by ID - /api/vehicle-specifications/:id
vehicleSpecificationsRouter.delete("/vehicle-specifications/:id", deleteVehicleSpecification);
