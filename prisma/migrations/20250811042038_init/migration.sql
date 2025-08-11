-- CreateTable
CREATE TABLE "public"."Enrollment" (
    "id" SERIAL NOT NULL,
    "enrollment_id" TEXT NOT NULL,
    "access_token" TEXT NOT NULL,
    "bankName" TEXT,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_enrollment_id_key" ON "public"."Enrollment"("enrollment_id");
