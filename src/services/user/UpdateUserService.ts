import { prisma } from "../../lib/prisma";
import type { CreateUserRequest } from "../../models/interfaces/user/CreateUserRequest";

class UpdateClientService {
  async execute(id: string, data: CreateUserRequest) {
    const payload = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined)
    );

    const updated = await prisma.usuario.update({
      where: { id },
      data: payload,
    });

    return updated;
  }
}

export { UpdateClientService };
