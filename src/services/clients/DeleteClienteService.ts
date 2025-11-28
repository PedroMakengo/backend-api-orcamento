import { prisma } from "../../lib/prisma";

class DeleteClientService {
  async execute(id: string) {
    const deleteCliente = await prisma.cliente.delete({
      where: {
        id,
      },
    });

    return deleteCliente;
  }
}

export { DeleteClientService };
