import React from 'react';
import PrivateMatch from "./rocketLeague/PrivateMatch";
import Tournament from "./rocketLeague/Tournament";

import BotStatus from "./discord/BotStatus";

import Contest from "./twitch/Contest";
import Poll from "./twitch/Poll";

import CoinFlip from "./miscellaneous/CoinFlip";

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
                component: Tournament
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
                component: BotStatus
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
                component: Contest
            },
            {
                name: "Poll",
                path: "/poll",
                component: Poll
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
                component: CoinFlip
            },
            {
                name: "Suggestions",
                path: "/suggestions",
                component: null
            }
        ]
    },
];