import { Box, Text, VStack } from "@chakra-ui/react";
import authservice from "../../../services/auth.service";

function Data() {
  const user = authservice.getCurrentUser();
  const list = [
    {
      id: 1,
      name: "Name",
      value: user.fullname,
      color: "cadet",
    },
    {
      id: 2,
      name: "E-mail",
      value: user.email,
      color: "cadet",
    },
    {
      id: 3,
      name: "Tel/Phone",
      value: user.phone,
      color: "cadet",
    },
  ];
  return (
    <VStack as="ul" spacing={0} listStyleType="none">
      {list.map((item) => (
        <Box
          key={item.id}
          as="li"
          w="full"
          py={3}
          px={5}
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth={1}
          borderColor="brand.light"
        >
          <Text color="brand.dark">{item.name}</Text>
          <Text color={`brand.${item.color}`} fontWeight="bold">
            {item.value}
          </Text>
        </Box>
      ))}
    </VStack>
  );
}

export default Data;
