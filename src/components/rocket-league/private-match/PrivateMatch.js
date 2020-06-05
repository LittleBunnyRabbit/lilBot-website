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
  Flex,
  IconButton,
  Heading,
  ButtonGroup,
  Editable,
  EditablePreview,
  EditableInput,
  NumberInput,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  RadioButtonGroup
} from "@chakra-ui/core";

import {
  VarInfo,
  MatchInfo
} from "../../extra/BoxStyles";

import { EditPopover } from "../../extra/EditPopover";

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
    ];

    const InfoComponent = () => {
        return (
          <Flex
            direction="column"
            justify="flex-start"
            align="left"
            marginTop="1%"
          >
            <Heading as="h2" size="xl">Create Match</Heading>
            <VarInfo name="Username" value={ match?.name } mb="0.5rem">
              <IconButton icon="edit" size="sm" />
            </VarInfo>
            <VarInfo name="Password" value={ match?.password  } mb="0.5rem">
              <Box>
                <IconButton icon="edit" size="sm" mr="5px"/>
                <IconButton icon="repeat" size="sm" />
              </Box>
            </VarInfo>
            <Example />
            <Button
              width="100%"
              mt="0.5rem"
            >
              START
            </Button>
          </Flex>
        );

        function Example() {
          const CustomRadio = React.forwardRef((props, ref) => {
            const { isChecked, isDisabled, value, ...rest } = props;
            return (
              <Button
                ref={ref}
                variantColor={isChecked ? "green" : "gray"}
                aria-checked={isChecked}
                role="radio"
                isDisabled={isDisabled}
                {...rest}
              />
            );
          });
      
          return (
            <RadioButtonGroup
              defaultValue={1}
              onChange={val => console.log(val)}
              isInline
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
            >
              { Array.from(Array(4).keys()).map(value => {
                  value++;
                  return <CustomRadio value={value} children={`${value}v${value}`} width="100%"/>
                })
              }
            </RadioButtonGroup>
          );
        }
    }

    const QueueComponent = () => {
        return (
          <Box>
            <Heading as="h2" size="xl">Queue</Heading>
            <Queue queue={ que } filters={ qFilters }/>
          </Box>
        );
    }

    const MatchComponent = () => {
        return (
          <Box width="100%">
            <Heading as="h2" size="xl">Active Match</Heading>
            <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={10}>
              <Box>
                <MatchInfo name="username" value="My Username" />
                <MatchInfo name="password" value="asda8s4d65a" />
                <MatchInfo name="mode" value="3v3" />
              </Box>
              <Box>
                {/* { que.slice(0, 5).map(player => (
                  <Box>
                    { player?.username }{" "}
                    { qFilters?.map(filter => player[filter?.name] ? filter?.icon : "" )}
                  </Box>
                ))

                }         */}
                *insert players*

              </Box>
            </SimpleGrid>
          </Box>
        )
    }

    return (
      <CPNT.Base>
        <SimpleGrid columns={[1, 1, 2]} spacing={10} mb={10}>
          <InfoComponent />
          <QueueComponent />
        </SimpleGrid>
        <MatchComponent />
      </CPNT.Base>
    );
}