import { prisma } from "../../lib/prisma";

class ListUserService {
  async execute() {
    const users = await prisma.usuario.findMany();

    return users;
  }
}

export { ListUserService };
