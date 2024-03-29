import { faker } from "@faker-js/faker";
import { sample } from "lodash";
import StatService from "../services/stat.service";
// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/products/product_${setIndex}.jpg`,
  name: faker.name.findName(),
  company: faker.company.companyName(),
  isVerified: faker.datatype.boolean(),
  status: sample(["active", "banned"]),
  role: sample([
    "Leader",
    "Hr Manager",
    "UI Designer",
    "UX Designer",
    "UI/UX Designer",
    "Project Manager",
    "Backend Developer",
    "Full Stack Designer",
    "Front End Developer",
    "Full Stack Developer",
  ]),
}));

export default users;
