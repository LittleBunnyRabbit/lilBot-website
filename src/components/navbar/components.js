import React from 'react';
import { 
  Flex,
  Box,
  Button
} from "@chakra-ui/core";

import {
    Link
} from "react-router-dom";


export default {
    Base: ({ ...props }) => <Flex { ...props } 
        direction="row"
        justify="space-between"
        padding="20px"
    />,

    ButtonRow: ({ ...props }) => <Flex { ...props } 
        width="50%"
        direction="row"
        justify="space-between"
    />,

    Button: ({ to, ...props }) => (
        <Box 
            as={ Link } 
            to={ to } 
            width="100%"
        >
            <Button { ...props } 
                padding="0px"
                textAlign="left"
                variantColor="green" 
                variant="ghost" 
                width="100%" 
                size="md"
                outline={0} 
            />
        </Box>
    )
}