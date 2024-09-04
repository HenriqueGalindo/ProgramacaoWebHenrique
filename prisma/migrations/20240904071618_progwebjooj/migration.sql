/*
  Warnings:

  - You are about to drop the `_UsuarioEstabSalvos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UsuarioEstabSalvos" DROP CONSTRAINT "_UsuarioEstabSalvos_A_fkey";

-- DropForeignKey
ALTER TABLE "_UsuarioEstabSalvos" DROP CONSTRAINT "_UsuarioEstabSalvos_B_fkey";

-- DropTable
DROP TABLE "_UsuarioEstabSalvos";

-- CreateTable
CREATE TABLE "usuario_estab_salvos" (
    "usuarioId" INTEGER NOT NULL,
    "estabId" INTEGER NOT NULL,

    CONSTRAINT "usuario_estab_salvos_pkey" PRIMARY KEY ("usuarioId","estabId")
);

-- AddForeignKey
ALTER TABLE "usuario_estab_salvos" ADD CONSTRAINT "usuario_estab_salvos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_estab_salvos" ADD CONSTRAINT "usuario_estab_salvos_estabId_fkey" FOREIGN KEY ("estabId") REFERENCES "estabelecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
