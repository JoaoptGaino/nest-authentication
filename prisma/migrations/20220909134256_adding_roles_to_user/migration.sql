-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roles" "Roles"[];
