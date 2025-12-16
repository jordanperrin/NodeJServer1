ALTER TABLE "coffee_shops" ALTER COLUMN "rating" SET DATA TYPE numeric(3, 1);--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD COLUMN "total_ratings" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "coffee_shops" ADD COLUMN "average_rating" numeric(3, 1);