import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";
import "dotenv/config";

const createAdminService = async () => {
  const userRepository = AppDataSource.getRepository(User);

  const { username, email, password, cpf } = {
    username: process.env.ADMIN_USER,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PWD,
    cpf: "000.000.000-00",
  };

  const adminAlreadyExists = await userRepository.findOneBy({
    email: process.env.ADMIN_EMAIL,
  });

  if (adminAlreadyExists) {
    return console.log("User admin already exists");
  }

  const admin = userRepository.create({
    username,
    email,
    password: await hash(password as string, 10),
    cpf,
  });

  await userRepository.save(admin);

  return console.log("User admin created");
};

export default createAdminService;
