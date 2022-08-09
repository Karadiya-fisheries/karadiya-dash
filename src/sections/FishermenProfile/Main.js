import { Container } from "@chakra-ui/layout";
import Content from "./Content/Content";
import Sidebar from "./Sidebar/Sidebar";

export default function Main({ id }) {
  console.log(id);
  return (
    <Container display={{ base: "block", md: "flex" }} maxW="container.xl">
      <Sidebar id={id} />
      <Content id={id} />
    </Container>
  );
}
