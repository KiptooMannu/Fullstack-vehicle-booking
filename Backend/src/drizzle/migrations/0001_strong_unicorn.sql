ALTER TABLE "bookings" DROP CONSTRAINT "bookings_vehicle_id_vehicles_vehicle_spec_id_fk";
--> statement-breakpoint
ALTER TABLE "fleet_management" DROP CONSTRAINT "fleet_management_vehicle_id_vehicles_vehicle_spec_id_fk";
--> statement-breakpoint
ALTER TABLE "vehicles" DROP CONSTRAINT "vehicles_vehicle_id_vehicle_specifications_vehicle_id_fk";
--> statement-breakpoint
ALTER TABLE "bookings" ALTER COLUMN "total_amount" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "fleet_management" ALTER COLUMN "depreciation_rate" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "fleet_management" ALTER COLUMN "current_value" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "fleet_management" ALTER COLUMN "maintenance_cost" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "payments" ALTER COLUMN "amount" SET DATA TYPE numeric;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'vehicles'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "vehicles" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "vehicles" ADD PRIMARY KEY ("vehicle_id");--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "vehicle_spec_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "vehicle_id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "rental_rate" SET DATA TYPE numeric;--> statement-breakpoint
ALTER TABLE "vehicles" ALTER COLUMN "availability" SET DATA TYPE boolean;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authentication" ADD CONSTRAINT "authentication_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_vehicle_id_vehicles_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("vehicle_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fleet_management" ADD CONSTRAINT "fleet_management_vehicle_id_vehicles_vehicle_id_fk" FOREIGN KEY ("vehicle_id") REFERENCES "public"."vehicles"("vehicle_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vehicle_spec_id_vehicle_specifications_vehicle_id_fk" FOREIGN KEY ("vehicle_spec_id") REFERENCES "public"."vehicle_specifications"("vehicle_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
