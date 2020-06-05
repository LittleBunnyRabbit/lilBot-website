import React from 'react';
import { 
    useDisclosure, Stack,
    Alert, IconButton,
    Checkbox, Box,
    Button, Divider,
    Progress, Modal,
    ModalBody, ModalHeader,
    ModalContent, ModalOverlay,
    ModalCloseButton, CheckboxGroup,
    Badge, Flex, Popover, PopoverTrigger, PopoverArrow, PopoverBody, PopoverCloseButton,
    FormControl, FormLabel, Input,
    ButtonGroup, PopoverContent
} from "@chakra-ui/core";

const TextInput = React.forwardRef((props, ref) => {
    return (
      <FormControl>
        <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
        <Input ref={ref} id={props.id} {...props} />
      </FormControl>
    );
  });
  
const Form = ({ firstFieldRef, onCancel }) => {
    return (
      <Stack spacing={4}>
        <TextInput
          label="First name"
          id="first-name"
          ref={firstFieldRef}
          defaultValue="John"
        />
        <TextInput label="Last name" id="last-name" defaultValue="Smith" />
        <ButtonGroup d="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button isDisabled variantColor="teal">
            Save
          </Button>
        </ButtonGroup>
      </Stack>
    );
};

export const EditPopover = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const firstFieldRef = React.useRef(null);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    return (
      <Popover
        isOpen={isOpen}
        onOpen={open}
        onClose={close}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon="edit" />
        </PopoverTrigger>
        <PopoverContent zIndex={4} p={5}>
        <PopoverArrow bg="white" />
            <PopoverCloseButton />
            <Form firstFieldRef={firstFieldRef} onCancel={close} />
        </PopoverContent>
      </Popover>
    );
};