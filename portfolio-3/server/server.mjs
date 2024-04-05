import express from 'express';
import https from 'https';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from "ws";
import fs from 'fs'
import url from 'url'

const api = "AIzaSyDo6mk8x9SbjCeZz2aSI35TfKR6hxB47so"
const app = express();
app.use(cors());


app.get('/root', (req, res) => {
    const q = url.parse(req.url, true);
    const path = q.pathname;
    fs.readdir(`/root${path}`, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading directory');
        }
        console.log('Directory read successfully!');
        res.json(files);
    });
});

app.post('/root', (req, res) => {
    const q = url.parse(req.url, true);
    const path = q.pathname;
    fs.mkdir(`/root${path}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error creating directory');
        }
        console.log('Directory created successfully!');
        res.status(201).send('Directory created successfully');
    });
});




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
    console.log(`WebSocket listening on ${PORT}`);
});


app.listen(3003, () => console.log('Network listening on 3003'))