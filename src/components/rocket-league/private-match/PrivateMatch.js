import React from 'react';
import CPNT from "./components";
import Queue from "../../extra/Queue";
import { 
  useDisclosure,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalBody,
  FormControl,
  ModalCloseButton,
  FormLabel,
  Input,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Flex
} from "@chakra-ui/core";

let que = [
    { username: "someone 1", id: 1, subscriber: true, moderator: true },
    { username: "someone 2", id: 2, subscriber: true, moderator: false },
    { username: "someone 3", id: 3, subscriber: false, moderator: false },
    { username: "someone 4", id: 4, subscriber: false, moderator: true },
    { username: "someone 5", id: 5, subscriber: true, moderator: false },
    { username: "someone 6", id: 6, subscriber: false, moderator: true },
    { username: "someone 7", id: 7, subscriber: true, moderator: true },
    { username: "someone 8", id: 8, subscriber: false, moderator: false },
    { username: "someone 9", id: 9, subscriber: true, moderator: true }
]

export default function PrivateMatch() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ match, setMatch ] = React.useState({
      name: "My Name",
      password: "My Password"
    });

    const qFilters = [
        { name: "subscriber", icon: "🥔", color: "purple" },
        { name: "moderator", icon: "⚔️", color: "green" },
    ]

    const CreateMatch = () => (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Private Match</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input placeholder="Optional" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button variantColor="blue" mr={3}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    );

    return (
        <CPNT.Base>
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Box height="80px">
              <Queue 
                queue={ que } 
                filters={ qFilters }
              />
            </Box>
            <Box height="80px">
              <CreateMatch />
              <Button onClick={ onOpen } width="100%">Create Match</Button>
              <Flex
                direction="column"
                justify="flex-start"
                align="left"
                marginTop="1%"
              >
                <Box>
                  { match?.name }
                </Box>
                <Box>
                  { match?.password }
                </Box>
              </Flex>
            </Box>
          </SimpleGrid>

        </CPNT.Base>
    )
}