import React from 'react';
import PrivateMatch from "./components/rocket-league/private-match/PrivateMatch";
import Players from "./components/minecraft/players/Players";

export default [
    {
        name: "Rocket League",
        path: "/rocket-league",
        socket_path: "/rl",
        children: [
            {
                name: "Private Match",
                path: "/private-match",
                socket_path: "/privateMatch",
                component: PrivateMatch
            },
            {
                name: "Tournament",
                path: "/tournament",
                component: () => <h1>tourney</h1>
            },
            {
                name: "Minecraft",
                path: "/minecraft",
                component: Players
            }
        ]
    },
    {
        name: "Discord",
        path: "/discord",
        children: [
            {
                name: "Bot Status",
                path: "/bot-status",
                component: null
            }
        ]
    },
    {
        name: "Twitch",
        path: "/twitch",
        children: [
            {
                name: "Bot Status",
                path: "/bot-status",
                component: null
            },
            {
                name: "Contest",
                path: "/contest",
                component: null
            },
            {
                name: "Poll",
                path: "/poll",
                component: null
            }
        ]
    },
    {
        name: "Miscellaneous",
        path: "/miscellaneous",
        children: [
            {
                name: "Coin Flip",
                path: "/coin-flip",
                component: null
            },
            {
                name: "Suggestions",
                path: "/suggestions",
                component: null
            }
        ]
    },
];