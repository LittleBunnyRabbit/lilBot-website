import React from 'react';
import CPNT from "./components";
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
  Divider,
  Tooltip
} from "@chakra-ui/core";

// const itemIcons = require.context("../../../images/minecraft/items", true);

export default function Players() {
    const Information = ({ ...props }) => {
        return (
            <Box>
                Information
            </Box>
        )
    }

    const Inventory = ({ ...props }) => {
        const { storage, hotbar, armor, offHand} = getInventory();
        const SelectedItemSlot = 6;

        const ItemContainer = ({ item, slot, isSelected, ...props }) => {
            const Base = ({ ...props }) => <Box 
              { ...props }
              bg="green" 
              height="100%" 
              width="100%"
              border={ isSelected ? "2px solid cyan" : "1px solid grey" }
              position="relative"
            /> 

            return !item ? <Base /> : (
                <Tooltip 
                  hasArrow 
                  label={`${item?.id?.replace(/_/g, " ")}`}
                  placement="top"
                >
                  <Base> 
                    <Box
                      position="absolute"
                      width="100%"
                      height="100%"
                      display="flex"
                      flexDirection="row"
                      justifyContent="flex-end"
                      alignItems="flex-end"
                    >
                      { item?.count }
                    </Box>
                    <img src={`${process.env.PUBLIC_URL}/minecraft/${item?.id}.png`} width="100%"/>
                  </Base>
                </Tooltip>
            );
        }

        const StorageGrid = () => (
            <SimpleGrid columns={9} spacing="5px" textAlign="center">
              { Array.from(new Array(3 * 9), (x, i) => i + 9).map((slot) => {
                    let item = storage[slot];
                    if(slot == 33) item = undefined;
                    return <ItemContainer
                      item={item} 
                      slot={slot}
                      isSelected={ SelectedItemSlot == slot }
                    />
                })

              }
            </SimpleGrid>
        );

        const HotbarGrid = () => (
            <SimpleGrid columns={9} spacing="5px" textAlign="center">
              { hotbar?.map(item => <ItemContainer 
                  slot={item?.Slot}
                  id={item?.id}
                  count={item?.Count}
                />
              )}
            </SimpleGrid>
        );

        const ArmorGrid = () => {
            return (
                <SimpleGrid columns={3} spacing={5}>
                  <SimpleGrid columns={1} spacing={5}>
                    
                  </SimpleGrid>
                </SimpleGrid>
            );
        }
        
        return (
            <Box
                position="relative"
                width="100%"
                height="100%"
            >
              <SimpleGrid columns={1} spacing={5}>
                {/* <Box bg="tomato" height="50%"> <ArmorGrid /> </Box> */}
                <Box height="40%"> <StorageGrid /> </Box>
                {/* <Box height="10%"> <HotbarGrid /> </Box> */}
              </SimpleGrid>
            </Box>
        )
    }

    const Map = ({ ...props }) => {
        return (
            <Box>
                Map
            </Box>
        )
    }

    const PlayerList = ({ ...props }) => {
        return (
            <Box>
                PlayerList
            </Box>
        )
    }

    return (
        <CPNT.Base>
            <SimpleGrid columns={2} spacing="40px">
                <Box bg=""> <Inventory /> </Box>
                <Box bg="tomato" height="80px"> <Information /> </Box>
                <Box bg="tomato" height="80px"> <Map /> </Box>
                <Box bg="tomato" height="80px"> <PlayerList /> </Box>
            </SimpleGrid>
        </CPNT.Base>
    )
}

function getInventory() {
    let { Inventory } = getPlayerData();
    const storage = {};
    const hotbar = {};
    const armor = {};
    let offHand;

    Inventory = Inventory.map(item => {
        const slot = parseInt(item?.Slot?.replace("b", ""));
        const id = item?.id?.replace("minecraft:", "");
        const count = parseInt(item?.Count?.replace("b", ""));

        if(slot === -106) offHand = item;
        else if(slot >= 0 && slot < 9) hotbar[slot] = { id, count };
        else if(slot > 8 && slot < 100) storage[slot] = { id, count };
        else if(slot > 99) armor[slot] = { id, count };
    })

    return { 
        storage, hotbar, armor, offHand
    }
}

function getPlayerData() {
     const blocks = [
        "minecraft:command_block", "minecraft:stripped_birch_wood",
        "minecraft:iron_ore", "minecraft:stone_button", 
        "minecraft:diamond_pickaxe", "minecraft:ender_chest",  
        "minecraft:gold_ore", "minecraft:andesite"
    ];
    
    const Storage = Array.from(Array(4 * 9).keys()).map((a, i) => {
        return {
            "Slot": `${i}b`,
            "id": blocks[Math.floor(Math.random() * blocks.length)],
            "Count": `${Math.floor(Math.random() * 64) + 1}b`,
        }
    });

    const Armor = [
        {
            "Slot": "100b",
            "id":"minecraft:diamond_boots",
            "Count": "1b",
            "tag":{
               "Damage":0
            }
         },
         {
            "Slot": "101b",
            "id":"minecraft:diamond_leggings",
            "Count": "1b"
         },
         {
            "Slot":"102b",
            "id":"minecraft:elytra",
            "Count":"1b"
         },
         {
            "Slot":"103b",
            "id":"minecraft:diamond_helmet",
            "Count":"1b"
         },
         {
            "Slot":"-106b",
            "id":"minecraft:diamond_pickaxe",
            "Count":"1b"
         }
    ]

    const Inventory = [
        ...Storage,
        ...Armor
    ]

    return {
        Inventory
    }
}