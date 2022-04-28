const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

//Models
const modeloCity = require('./models').City
const modeloIdenticationType = require('./models').IdentificationType
const modeloUser = require('./models').User

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("WELCOME TO MI FIRST API")
});

//LOGIN USER
app.post('/login', (req, res) => {

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(req.body.user)) {
        modeloUser.findAll({
            where: {
                email: req.body.user,
                password: req.body.password,
            }
        }).then((data) => {
            const token = Math.random().toString(36);
            data.length > 0 ? res.json({ data: data, token: token }) : res.json({
                data: data,
                error: "Correo o contraseña incorrectos, validar información"
            });
        })
    } else {
        modeloUser.findAll({
            where: {
                username: req.body.user,
                password: req.body.password,
            }
        }).then((data) => {
            const token = Math.random().toString(36);
            data.length > 0 ? res.json({ data: data, token: token }) : res.json({
                data: data,
                error: "Usuario o contraseña incorrectos, validar información"
            });
        })
    }

});

//CREATE USER
app.post('/usuarios', (req, res) => {

    modeloUser.findAll({ where: { email: req.body.email, } }).then((data) => {
        if (data.length > 0) {
            res.json({
                error: "Correo existente, validar información"
            });
        } else {
            modeloUser.create(req.body).then((user) => {
                res.json({ data: user });
            })
                .catch((error) => {
                    res.json({ error: error });
                })
        }
    })


});

//GET ALL USERS
app.get('/usuarios', (req, res) => {
    modeloUser.findAll({ include: [{ model: modeloIdenticationType }, { model: modeloCity }] }).then((data) => {

        res.json(data);
    })
        .catch((error) => {
            res.json({ error: error });
        })
});

//GET USERS BY ID
app.get('/usuarios/:id', (req, res) => {
    modeloUser.findAll({
        where: { id: req.params.id }
    }).then((data) => {

        res.json(data);
    })
        .catch((error) => {
            res.json({ error: error });
        })
});

//DELETE USER
app.delete('/usuarios/:id', (req, res) => {
    modeloUser.destroy({
        where: { id: req.params.id },
    }).then((data) => {

        res.json({ data: data });
    })
        .catch((error) => {
            res.json({ error: error });
        })
});


//UPADTE USER
app.put('/usuarios/:id', (req, res) => {
    modeloUser.update(req.body, {
        where: { id: req.params.id },
    }).then((data) => {

        res.json({ data: data });
    })
        .catch((error) => {
            res.json({ error: error });
        })
});

//GET ALL CITIES
app.get('/cities', (req, res) => {
    modeloCity.findAll().then((data) => {

        res.json(data);
    })
        .catch((error) => {
            res.json({ error: error });
        })
});

//GET ALL IDENTIFICATION TYPE
app.get('/identifications', (req, res) => {
    modeloIdenticationType.findAll().then((data) => {

        res.json(data);
    })
        .catch((error) => {
            res.json({ error: error });
        })
});

app.listen(PORT, () => {
    console.log("Server running");
})