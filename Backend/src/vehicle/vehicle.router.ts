import { Hono } from "hono";
import { listVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle } from "./vehicle.controller";

export const vehiclesRouter = new Hono();

// GET all vehicles - /api/vehicles
vehiclesRouter.get("/vehicles", listVehicles);

// GET a single vehicle by ID - /api/vehicles/:id
vehiclesRouter.get("/vehicles/:id", getVehicle);

// POST create a new vehicle - /api/vehicles
vehiclesRouter.post("/vehicles", createVehicle);

// PUT update a vehicle by ID - /api/vehicles/:id
vehiclesRouter.put("/vehicles/:id", updateVehicle);

// DELETE a vehicle by ID - /api/vehicles/:id
vehiclesRouter.delete("/vehicles/:id", deleteVehicle);
