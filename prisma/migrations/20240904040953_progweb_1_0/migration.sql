-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estabelecimento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagens" TEXT[],
    "tagPNome" TEXT NOT NULL,

    CONSTRAINT "estabelecimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag_primaria" (
    "nomeTag" TEXT NOT NULL,

    CONSTRAINT "tag_primaria_pkey" PRIMARY KEY ("nomeTag")
);

-- CreateTable
CREATE TABLE "tag_secundaria" (
    "nomeTag" TEXT NOT NULL,
    "tagPNome" TEXT NOT NULL,

    CONSTRAINT "tag_secundaria_pkey" PRIMARY KEY ("nomeTag")
);

-- CreateTable
CREATE TABLE "tag_estab" (
    "estabelecimentoId" INTEGER NOT NULL,
    "tagSNome" TEXT NOT NULL,

    CONSTRAINT "tag_estab_pkey" PRIMARY KEY ("estabelecimentoId","tagSNome")
);

-- CreateTable
CREATE TABLE "_UsuarioEstabSalvos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_username_key" ON "usuario"("username");

-- CreateIndex
CREATE UNIQUE INDEX "_UsuarioEstabSalvos_AB_unique" ON "_UsuarioEstabSalvos"("A", "B");

-- CreateIndex
CREATE INDEX "_UsuarioEstabSalvos_B_index" ON "_UsuarioEstabSalvos"("B");

-- AddForeignKey
ALTER TABLE "estabelecimento" ADD CONSTRAINT "estabelecimento_tagPNome_fkey" FOREIGN KEY ("tagPNome") REFERENCES "tag_primaria"("nomeTag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_secundaria" ADD CONSTRAINT "tag_secundaria_tagPNome_fkey" FOREIGN KEY ("tagPNome") REFERENCES "tag_primaria"("nomeTag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_estab" ADD CONSTRAINT "tag_estab_estabelecimentoId_fkey" FOREIGN KEY ("estabelecimentoId") REFERENCES "estabelecimento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_estab" ADD CONSTRAINT "tag_estab_tagSNome_fkey" FOREIGN KEY ("tagSNome") REFERENCES "tag_secundaria"("nomeTag") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioEstabSalvos" ADD CONSTRAINT "_UsuarioEstabSalvos_A_fkey" FOREIGN KEY ("A") REFERENCES "estabelecimento"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioEstabSalvos" ADD CONSTRAINT "_UsuarioEstabSalvos_B_fkey" FOREIGN KEY ("B") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
