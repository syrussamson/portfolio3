import express from 'express';
import https from 'https';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from "ws";


const api = "AIzaSyDo6mk8x9SbjCeZz2aSI35TfKR6hxB47so"
const app = express();
app.use(cors());

const PORT = 3333;
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });
const fetchDataAndSend = () => {
    const url = `https://retro.umoiq.com/service/publicJSONFeed?command=vehicleLocations&a=ttc&t=0`;
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            wss.clients.forEach((client) => {
                    client.send(data);
            });
        });
    }).on('error', (error) => {
        console.error('Error:', error);
    });
};
setInterval(fetchDataAndSend, 1000); 
httpServer.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
});
