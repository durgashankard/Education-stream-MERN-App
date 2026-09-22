const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectionString = "mongodb://127.0.0.1:27017";

app.get('/users', (req, res) => {
    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db("mern-app-db");
            database.collection('users').find({}).toArray().then(documents => {
                res.send(documents);
                res.end();
            });
        });
});

app.get('/categories', (req, res) => {

    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db("mern-app-db");
            database.collection('categories').find({}).toArray().then(documents => {
                res.send(documents);
                res.end();
            });
        });

})
app.get('/admin', (req, res) => {
    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db("mern-app-db");
            database.collection('admin').find({}).toArray().then(documents => {
                res.send(documents);
                res.end();
            });
        });
})
app.get('/videos', (req, res) => {
    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db("mern-app-db");
            database.collection('videos').find({}).toArray().then(documents => {
                res.send(documents);
                res.end();
            });
        });
})
app.get('/video/:id', (req, res) => {
    var id = parseInt(req.params.id);
    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db("mern-app-db");
            database.collection('videos').findOne({ video_id: id }).then(document => {
                res.send(document);
                res.end();
            });
        });
})

app.post('/add-user', (req, res) => {

    var user = {
        user_id: req.body.user_id,
        user_name: req.body.user_name,
        password: req.body.password,
        email: req.body.email
    }

    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db('mern-app-db');
            database.collection('users').insertOne(user)
                .then(() => {
                    console.log('User Registered');
                })
            res.end();
        });

})

app.post('/add-video', (req, res) => {

    var video = {
        video_id: parseInt(req.body.video_id),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        likes: parseInt(req.body.likes),
        views: parseInt(req.body.views),
        comments: req.body.comments,
        category_id: parseInt(req.body.category_id)
    }

    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db('mern-app-db');
            database.collection('videos').insertOne(video)
                .then(() => {
                    console.log('Video Added');
                })
            res.end();
        });

})

app.put('/edit-video/:id', (req, res) => {
    var id = parseInt(req.params.id);

    var video = {
        video_id: parseInt(req.body.video_id),
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        likes: parseInt(req.body.likes),
        views: parseInt(req.body.views),
        comments: req.body.comments,
        category_id: parseInt(req.body.category_id)
    }

    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db('mern-app-db');
            database.collection('videos').updateOne({ video_id: id }, { $set: video })
                .then(() => {
                    console.log('Video Updated');
                })
            res.end();
        });
})

app.delete('/delete-video/:id', (req, res) => {
    mongoClient.connect(connectionString)
        .then(clientObject => {
            var database = clientObject.db('mern-app-db');
            database.collection('videos').deleteOne({ video_id: parseInt(req.params.id) })
                .then(() => {
                    console.log('Deleted Video');
                })
            res.end();
        });
})

app.listen(6060);
console.log('API Started http://127.0.0.1:6060');