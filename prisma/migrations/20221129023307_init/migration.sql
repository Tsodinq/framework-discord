-- AlterTable
ALTER TABLE "GuildMember" ADD COLUMN     "soodamreStaff" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "StaffContactInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "StaffContactInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StaffContactInfo" ADD CONSTRAINT "StaffContactInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "GuildMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
