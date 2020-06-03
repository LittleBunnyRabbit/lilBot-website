import React from 'react';
import CPNT from "./components";
import routes from "../../Routes";
import logo from "../../images/potate-logo.gif";
import { 
    useColorMode,
    IconButton,
    Box,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    useDisclosure,
    Collapse,
    Stack,
    Select,
    Accordion,
    AccordionHeader,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Heading
} from "@chakra-ui/core";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
      <CPNT.Base>
        <NavbarDrawer isOpen={isOpen} onClose={onClose}/>
        <Box>
          <IconButton 
            icon={ colorMode === "light" ? "sun" : "moon" } 
            onClick={ toggleColorMode } 
            variantColor="green"
            variant="ghost"
            size="lg"
            style={{ outline: 0 }}
          />
        </Box>

        {/* <img src={logo} width="30px"/> */}

        <Box>
          <IconButton 
            icon="chevron-left"
            variantColor="green"
            variant="ghost"
            size="lg"
            onClick={onOpen}
          />
        </Box>
      </CPNT.Base>
  );
}

function NavbarDrawer({ onOpen, onClose, ...props }) {

    const handleMenuItem = () => {

        return onClose();
    }

    return (
      <Drawer
        { ...props }
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Routes</DrawerHeader>

          <DrawerBody>
            <Accordion allowMultiple>
              { routes?.map(route => (
                  <AccordionItem>
                    <AccordionHeader _expanded={{ color: "grey" }} >
                      <Box flex="1" textAlign="left">
                        { route?.name }
                      </Box>
                      <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4} pl={0} pr={0}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-start"
                      >
                        { route?.children?.map(child => <CPNT.Button to={route?.path + child?.path}> { child?.name } </CPNT.Button>) }
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                ))
              }
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    )
}
