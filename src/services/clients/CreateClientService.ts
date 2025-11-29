import { prisma } from "../../lib/prisma";

import type { ClientRequest } from "../../models/interfaces/client/ClientRequest";

class CreateClientService {
  async execute({
    nome,
    email,
    endereco,
    telefone,
    zap,
    empresa,
    observacao,
    usuarioId,
  }: ClientRequest) {
    const user = await prisma.usuario.findFirst({
      where: {
        id: usuarioId,
      },
    });

    if (!user) {
      throw new Error("Wrong username or password");
    }

    const save = await prisma.cliente.create({
      data: {
        nome,
        email,
        endereco,
        telefone,
        zap,
        empresa,
        observacao,
        usuarioId,
      },
    });

    return save;
  }
}

export { CreateClientService };
