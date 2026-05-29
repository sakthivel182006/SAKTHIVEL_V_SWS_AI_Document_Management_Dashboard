import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {

    io = new Server(server, {

        cors: {

            origin: "*",

            methods: [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ]

        }

    });

    io.on(
        "connection",
        (socket) => {

            console.log(
                `User Connected: ${socket.id}`
            );

            socket.on(
                "disconnect",
                () => {

                    console.log(
                        `User Disconnected: ${socket.id}`
                    );

                }
            );

        }
    );

};

export const sendUploadNotification = (
    fileCount
) => {

    if (!io) return;

    io.emit(
        "uploadCompleted",
        {

            type: "success",

            message:
                `${fileCount} files uploaded successfully`,

            timestamp:
                new Date()

        }
    );

};

export const sendStatusNotification = (
    fileName,
    status
) => {

    if (!io) return;

    io.emit(
        "documentStatusUpdated",
        {

            type: "info",

            message:
                `${fileName} status updated to ${status}`,

            timestamp:
                new Date()

        }
    );

};

export const sendBackgroundNotification = (
    fileCount
) => {

    if (!io) return;

    io.emit(
        "backgroundProcessing",
        {

            type: "info",

            message:
                `Upload in progress - processing ${fileCount} files in background`,

            timestamp:
                new Date()

        }
    );

};