-- AlterTable
ALTER TABLE "Board" ADD COLUMN     "columns" TEXT[] DEFAULT ARRAY[]::TEXT[];
