import express from 'express';
import https from 'https';
import cors from 'cors';
import {
    createServer
} from 'http';
import {
    WebSocketServer
} from "ws";
import fs from 'fs'
import path from 'path'

const app = express();
app.use(cors());
app.use(express.json())

app.get('/root/*', (req, res) => {
    const subpath = req.params[0] || '';
    const fullPath = path.join('root', subpath);
    try {
        const filesAndDirectories = fs.readdirSync(fullPath).map(name => {
            const itemPath = path.join(fullPath, name);
            const stats = fs.statSync(itemPath);
            return {
                title: name,
                type: stats.isDirectory() ? 'folder' : 'file',
                path: itemPath.substring(5)
            };
        });

        console.log('Directory read');
        res.status(200).json(filesAndDirectories);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error reading directory');
    }
});



app.post('/root/*', (req, res) => {
    const subpath = req.params[0] || '';
    const fullPath = path.join('root', subpath);
    try {
        let newDirectoryPath = fullPath;
        let count = 1;
        while (fs.existsSync(newDirectoryPath)) {
            newDirectoryPath = `${fullPath}(${count})`;
            count++;
        }

        fs.mkdirSync(newDirectoryPath);
        console.log('Directory created successfully!');
        res.status(201).json({
            sent: 'success'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            sent: 'fail'
        });
    }
});


app.put('/root/*', (req, res) => {
    const subpath = req.params[0] || '';
    const fullPath = path.join('root', subpath);
    console.log(req.body);
    const {
        newName
    } = req.body;

    try {
        if (fs.existsSync(fullPath)) {
            const newPath = path.join('root', path.dirname(subpath), newName);
            fs.renameSync(fullPath, newPath);
            console.log('File or directory renamed successfully!');
            res.status(200).json({
                message: 'directory renamed successfully'
            });
        } else {
            res.status(404).json({
                error: 'not found'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Error renaming directory'
        });
    }
});

app.delete('/root/*', (req, res) => {
    const subpath = req.params[0] || '';
    const fullPath = path.join('root', subpath);
    try {
        if (fs.existsSync(fullPath)) {
            if (fs.statSync(fullPath).isDirectory()) {
                fs.rmdirSync(fullPath, {
                    recursive: true
                });
                console.log('Directory deleted successfully!');
                res.status(200).json({
                    message: 'Directory deleted successfully'
                });
            } else {
                fs.unlinkSync(fullPath);
                console.log('File deleted successfully!');
                res.status(200).json({
                    message: 'File deleted successfully'
                });
            }
        } else {
            res.status(404).json({
                error: 'File or directory not found'
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'Error deleting file or directory'
        });
    }
});

const url = `https://retro.umoiq.com/service/publicJSONFeed?command=vehicleLocations&a=ttc&t=0`;

const PORT = 3333;
const httpServer = createServer(app);
const wss = new WebSocketServer({
    server: httpServer
});

let initialData;

wss.on('connection', () => {
    https.get(url, (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            try {
                initialData = JSON.parse(data).vehicle; 
                wss.clients.forEach((client) => {
                    client.send(JSON.stringify(initialData));  
                });
            } catch (error) {
                console.error('Error parsing initial data JSON:', error);
            }
        });
    }).on('error', (error) => {
        console.error('Error:', error);
    });
});

const fetchDeltas = () => {
    if (initialData) {
        https.get(url, (response) => {
            let newData = '';
            response.on('data', (chunk) => {
                newData += chunk;
            });
            response.on('end', () => {
                try {
                    newData = JSON.parse(newData).vehicle;  
                    const deltas = generateDeltas(initialData, newData);
                    wss.clients.forEach((client) => {
                        client.send(JSON.stringify(deltas));
                    });
                    initialData = newData;
                } catch (error) {
                    console.error('Error parsing new data JSON:', error);
                }
            });
        }).on('error', (error) => {
            console.error('Error fetching new data:', error);
        });
    }
};

function generateDeltas(initialData, newData) {
    const deltas = [];
     const initialDataMap = new Map(initialData.map(item => [item.id, item]));
    for (const newItem of newData) {
        const matchingItem = initialDataMap.get(newItem.id);
        if (!matchingItem || !isEqual(newItem, matchingItem)) {
            deltas.push(newItem);
        }
    }
    console.log("deltas: ", deltas);
    return deltas;
}

function isEqual(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        // need to omit this value bc it'll trigger a false flag, resulting in large updates
        if (key === "secsSinceReport") {
            continue;
        }
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
    return true;
}






setInterval(fetchDeltas, 1000);

httpServer.listen(PORT, () => {
    console.log(`WebSocket listening on ${PORT}`);
});


app.listen(3003, () => console.log('Network listening on 3003'))