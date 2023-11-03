-- DropForeignKey
ALTER TABLE "contents" DROP CONSTRAINT "contents_week_id_fkey";

-- DropForeignKey
ALTER TABLE "months" DROP CONSTRAINT "months_syllabus_id_fkey";

-- DropForeignKey
ALTER TABLE "weeks" DROP CONSTRAINT "weeks_month_id_fkey";

-- AlterTable
ALTER TABLE "contents" ADD COLUMN     "lecture" TEXT;

-- AddForeignKey
ALTER TABLE "months" ADD CONSTRAINT "months_syllabus_id_fkey" FOREIGN KEY ("syllabus_id") REFERENCES "syllabuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weeks" ADD CONSTRAINT "weeks_month_id_fkey" FOREIGN KEY ("month_id") REFERENCES "months"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_week_id_fkey" FOREIGN KEY ("week_id") REFERENCES "weeks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
