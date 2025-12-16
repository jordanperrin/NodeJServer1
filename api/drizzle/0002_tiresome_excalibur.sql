ALTER TABLE "coffee_shops" ALTER COLUMN "rating" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "coffee_shops" ALTER COLUMN "rating" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee_shops" ALTER COLUMN "total_ratings" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "coffee_shops" ALTER COLUMN "average_rating" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "coffee_shops" ALTER COLUMN "average_rating" SET NOT NULL;