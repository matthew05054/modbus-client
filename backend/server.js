import express from "express";

import cors from "cors";

import http from "http";

import { Server } from "socket.io";

import { loadRegisters } from "./modbus/registerLoader.js";

import { startSimulator } from "./modbus/simulator.js";

import {
    connectClient,
    pollData,
} from "./modbus/client.js";

const app = express();

app.use(cors());

const httpServer =
    http.createServer(app);

const io = new Server(
    httpServer,
    {
        cors: {
            origin: "*",
        },
    }
);

global.registerMap = {};

async function start() {
    try {

        console.log(
            "Loading CSV..."
        );

        global.registerMap =
            await loadRegisters(
                "./data/registers.csv"
            );

        console.log(
            "Registers Loaded:",
            global.registerMap
        );

        console.log(
            "Starting Simulator..."
        );

        startSimulator();

        console.log(
            "Connecting Client..."
        );

        await connectClient();

        console.log(
            "Client Connected"
        );

        // POLL LOOP
        setInterval(async () => {
            try {

                const values =
                    await pollData();

                console.log(
                    "Received:",
                    values
                );

                io.emit(
                    "modbusData",
                    values
                );

            } catch (err) {

                console.log(
                    "Polling Error:",
                    err.message
                );
            }
        }, 1000);

    } catch (err) {

        console.log(
            "Startup Error:",
            err
        );
    }
}

// START APP
start();

// KEEP NODE RUNNING
httpServer.listen(
    4000,
    () => {

        console.log(
            "Backend Running on Port 4000"
        );
    }
);