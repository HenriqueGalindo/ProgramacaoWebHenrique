/*
  Warnings:

  - You are about to drop the column `tagPNome` on the `estabelecimento` table. All the data in the column will be lost.
  - The primary key for the `tag_estab` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `estabelecimentoId` on the `tag_estab` table. All the data in the column will be lost.
  - You are about to drop the column `tagSNome` on the `tag_estab` table. All the data in the column will be lost.
  - You are about to drop the column `tagPNome` on the `tag_secundaria` table. All the data in the column will be lost.
  - Added the required column `tagP` to the `estabelecimento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estabId` to the `tag_estab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagS` to the `tag_estab` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagP` to the `tag_secundaria` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "estabelecimento" DROP CONSTRAINT "estabelecimento_tagPNome_fkey";

-- DropForeignKey
ALTER TABLE "tag_estab" DROP CONSTRAINT "tag_estab_estabelecimentoId_fkey";

-- DropForeignKey
ALTER TABLE "tag_estab" DROP CONSTRAINT "tag_estab_tagSNome_fkey";

-- DropForeignKey
ALTER TABLE "tag_secundaria" DROP CONSTRAINT "tag_secundaria_tagPNome_fkey";

-- AlterTable
ALTER TABLE "estabelecimento" DROP COLUMN "tagPNome",
ADD COLUMN     "tagP" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tag_estab" DROP CONSTRAINT "tag_estab_pkey",
DROP COLUMN "estabelecimentoId",
DROP COLUMN "tagSNome",
ADD COLUMN     "estabId" INTEGER NOT NULL,
ADD COLUMN     "tagS" TEXT NOT NULL,
ADD CONSTRAINT "tag_estab_pkey" PRIMARY KEY ("estabId", "tagS");

-- AlterTable
ALTER TABLE "tag_secundaria" DROP COLUMN "tagPNome",
ADD COLUMN     "tagP" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "estabelecimento" ADD CONSTRAINT "estabelecimento_tagP_fkey" FOREIGN KEY ("tagP") REFERENCES "tag_primaria"("nomeTag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_secundaria" ADD CONSTRAINT "tag_secundaria_tagP_fkey" FOREIGN KEY ("tagP") REFERENCES "tag_primaria"("nomeTag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_estab" ADD CONSTRAINT "tag_estab_estabId_fkey" FOREIGN KEY ("estabId") REFERENCES "estabelecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_estab" ADD CONSTRAINT "tag_estab_tagS_fkey" FOREIGN KEY ("tagS") REFERENCES "tag_secundaria"("nomeTag") ON DELETE RESTRICT ON UPDATE CASCADE;
