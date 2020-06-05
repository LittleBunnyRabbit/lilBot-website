import React from 'react';
import { 
    useColorMode,
    useDisclosure, Stack,
    Alert, IconButton,
    Checkbox, Box,
    Button, Divider,
    Progress, Modal,
    ModalBody, ModalHeader,
    ModalContent, ModalOverlay,
    ModalCloseButton, CheckboxGroup,
    Badge, Flex, PseudoBox
} from "@chakra-ui/core";

export const VarInfo = ({ name, value, borderRadius="0.25rem", children, ...props }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex
            { ...props }
            width="100%"
            padding="5px 10px 5px 10px"
            backgroundColor={colorMode === "light" ? "#EDF2F7" : "#2c313d"}
            borderRadius={borderRadius}
            direction="row"
            justify="space-between"
            align="center"
        >
            <Flex direction="row" justify="flex-start">
                <Box fontWeight="700" pr="10px" textTransform="capitalize">
                    {`${name}:`}
                </Box>
                { value }
            </Flex>
            { children }
        </Flex>
    );
}

export const MatchInfo = ({ name, value, borderRadius="0.25rem", ...props }) => {
    const { colorMode, toggleColorMode } = useColorMode();
    const backgroundColor = colorMode === "light" ? "#EDF2F7" : "#2c313d";
    return (
        <PseudoBox
            { ...props }
            display="flex"
            direction="row"
            justifyContent="flex-start"
            position="relative"
            mb="0.25rem"
            _hover={{ opacity: 0.8 }}
        >
            <Box
                padding="5px 10px 5px 10px"
                backgroundColor={backgroundColor}
                borderRadius={borderRadius}
                fontWeight="700"
                pr="10px" 
                textTransform="capitalize"
                mr="0.25rem"
                width="30%"
            >
                {name}
            </Box>
            <Box
                width="70%"
                padding="5px 10px 5px 10px"
                backgroundColor={backgroundColor}
                borderRadius={borderRadius}
                pr="10px" 
            >
                {value}
            </Box>
        </PseudoBox>
    );
}
