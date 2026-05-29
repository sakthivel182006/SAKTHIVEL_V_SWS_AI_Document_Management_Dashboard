import express from "express";

import {

    getNotifications,

    markAsRead,

    markAllRead

}
from "../controllers/notificationController.js";

const router =
express.Router();

router.get(
    "/",
    getNotifications
);

router.put(
    "/read-all",
    markAllRead
);

router.put(
    "/:id",
    markAsRead
);

export default router;