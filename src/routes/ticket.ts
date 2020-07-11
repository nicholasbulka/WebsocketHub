import express from 'express';
import TicketController from '../controllers/TicketController';

const ticketRouter = express.Router();

ticketRouter.get(
    '/', TicketController

);

export default ticketRouter
