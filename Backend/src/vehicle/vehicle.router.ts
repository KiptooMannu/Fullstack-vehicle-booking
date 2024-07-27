import { Hono } from "hono";
import { listVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle } from "./vehicle.controller";
import { adminOrUserRoleAuth, adminRoleAuth } from "../middlewear/bearAuth";
import { vehicleSchema } from "../validators";
import { zValidator } from "@hono/zod-validator";

export const vehiclesRouter = new Hono();

// GET all vehicles - /api/vehicles
vehiclesRouter.get("/vehicles",adminOrUserRoleAuth , listVehicles);

// GET a single vehicle by ID - /api/vehicles/:id
vehiclesRouter.get("/vehicles/:id",zValidator("json", vehicleSchema),adminOrUserRoleAuth, getVehicle);

// POST create a new vehicle - /api/vehicles
vehiclesRouter.post("/vehicles",adminRoleAuth, createVehicle);

// PUT update a vehicle by ID - /api/vehicles/:id
vehiclesRouter.put("/vehicles/:id",adminRoleAuth , updateVehicle);

// DELETE a vehicle by ID - /api/vehicles/:id
vehiclesRouter.delete("/vehicles/:id",adminRoleAuth, deleteVehicle);
