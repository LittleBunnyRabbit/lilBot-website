import React from "react";
import { Box } from "@chakra-ui/core";

export default {
    Base: ({ ...props }) => <Box 
        { ...props }
        width="100%"
        height="100%"
        position="relative"
        padding="2%"
    />
};