ALTER TABLE "zip_codes" RENAME COLUMN "zip" TO "zip_code";--> statement-breakpoint
ALTER TABLE "zip_codes" DROP CONSTRAINT "zip_codes_zip_unique";--> statement-breakpoint
ALTER TABLE "zip_codes" ADD CONSTRAINT "zip_codes_zip_code_unique" UNIQUE("zip_code");