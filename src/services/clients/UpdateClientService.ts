import { prisma } from "../../lib/prisma";
import type { ClientRequest } from "../../models/interfaces/client/ClientRequest";

class UpdateClientService {
  async execute(id: string, data: ClientRequest) {
    const payload = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const updated = await prisma.cliente.update({
      where: { id },
      data: payload,
    });

    return updated;
  }
}

export { UpdateClientService };
