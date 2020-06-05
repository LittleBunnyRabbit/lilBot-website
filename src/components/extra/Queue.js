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
    Badge, Avatar
} from "@chakra-ui/core";

export default function Queue({ queue, filters, ...props }) {
    const [ playerQueue, setPlayerQueue ] = React.useState([]);
    const [ activeFilters, setActiveFilters ] = React.useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const activePercentage = playerQueue?.filter(p => p?.active)?.length / playerQueue?.length;

    const switchActive = (id) => {
        setPlayerQueue(playerQueue?.map(player => {
            if(player?.id === id) player.active = !player?.active;
            return player;
        }));
    }

    const filterChange = (newFilters) => {
        setActiveFilters(newFilters)
        setPlayerQueue(playerQueue?.filter(p => newFilters?.every(f => p[f])));
    }

    React.useEffect(() => {
        setPlayerQueue(queue?.map(player => {
            player.active = true;
            return player;
        }))
    }, []);

    return (
        <>
          <QueueModal 
            blockScrollOnMount={true} 
            isOpen={isOpen} 
            onClose={onClose}
          />

          <Box>
            <b>{ playerQueue?.filter(p => p?.active)?.length }</b> active players in the queue!{" "}
            <IconButton
              variant="link"
              variantColor="teal"
              icon="search"
              onClick={onOpen}
            /> <br />
            { activeFilters?.map(filter => 
                <Badge 
                  variantColor={ filters?.find(f => f.name === filter)?.color }
                  mr="5px"
                >
                  { filter }
                </Badge>
              )
            }
          </Box>
        </>
    );

    function QueueModal({ ...props }) {
        const players = playerQueue?.map(player => <PlayerItem player={player}/> );
        return (
            <Modal { ...props }>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Queue</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <b>{ queue?.length }</b> total players in the queue! <br />
                  <b>{ playerQueue?.filter(p => p?.active)?.length }</b> active players in the queue!
                  <Divider />
                  <CheckboxGroup
                    isInline
                    spacing={8}
                    variantColor="teal"
                    onChange={filterChange}
                    value={activeFilters}
                  >
                    { filters?.map(filter => <Checkbox value={filter?.name}>{filter?.name}</Checkbox> )}
                  </CheckboxGroup>
                  <Divider />
                  <Progress 
                    value={ activePercentage * 100 } 
                    color={ activePercentage === 1 ? "green" : "orange" }
                    mb={3}
                  />
                  <Box
                    maxHeight="400px" 
                    overflowY="scroll"
                  >
                    <Stack spacing="5px"> { players } </Stack>
                  </Box>
                </ModalBody>
              </ModalContent>
            </Modal>
        )
    }

    function PlayerItem({ player, ...props }) {
        const [ onRemove, setOnRemove ] = React.useState(false);

        const handleClick = (remove) => {
            return setOnRemove(false);
        };

        const Base = ({ ...props }) => <Alert 
            { ...props }
            status={player?.active ? "success" : "warning"}
            variant="subtle"
            flexDirection="row"
            justifyContent="space-between"
            mb="5px"
        />;

        const Remove = () => (
            <Base>
              <Box> Remove <b>{ player?.username }</b> from the queue? </Box>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
              >
                <Button 
                  variantColor="green" 
                  mr="5%"
                  onClick={() => handleClick(true)}
                > Yes </Button>
                <Button 
                  variantColor="red"
                  onClick={() => handleClick(false)}
                > No </Button>
              </Box>
            </Base>
        );
        
        const Normal = () => (
            <Base>
              <Checkbox 
                variantColor="green" 
                isChecked={ player?.active }
                onChange={() => switchActive(player?.id)}
                isInvalid
              >
                { player?.username }{" "}
                { filters?.map(filter => player[filter?.name] ? filter?.icon : "" )}
              </Checkbox>
              <IconButton
                variant="ghost"
                variantColor="red"
                icon="delete"
                outline={0}
                onClick={() => setOnRemove(true)}
              />
            </Base>
        );

        return onRemove ? <Remove /> : <Normal />;
    }
}