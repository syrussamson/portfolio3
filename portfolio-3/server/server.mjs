import express from 'express';
import https from 'https';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from "ws";
import fs from 'fs'
import url from 'url'
import path from 'path'

const api = "AIzaSyDo6mk8x9SbjCeZz2aSI35TfKR6hxB47so"
const app = express();
app.use(cors());

app.get('/root/*', (req, res) => {
    const subpath = req.params[0] || ''; 
    const fullPath = path.join( 'root', subpath);
    try {
        const files = fs.readdirSync(fullPath);
        console.log('Directory read successfully!');
        res.status(200).send(files);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading directory');
    }
});

app.post('/root/*', (req, res) => {
    const subpath = req.params[0] || '';
    const fullPath = path.join( 'root', subpath);
    try {
        fs.mkdirSync(fullPath);
        console.log('Directory created successfully!');
        res.status(201).send('Directory created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating directory or path already exists. ');
    }
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