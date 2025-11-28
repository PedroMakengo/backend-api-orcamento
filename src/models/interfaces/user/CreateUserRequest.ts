export interface CreateUserRequest {
  nome: string;
  email: string;
  senha: string;
  activo: boolean;
  perfil: "ADMIN" | "FUNCIONARIO";
}
