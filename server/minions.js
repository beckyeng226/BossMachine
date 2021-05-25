const minionsRouter = require ('express').Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require ('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        return res.status(404).send('No minions found')
    }
});

//GET /api/minions to get all minions
minionsRouter.get('/', (req, res, next) => {
        res.send(getAllFromDatabase('minions'));
});

//POST /api/minions to create a new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

//GET /api/minions/:minionId get a single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

//PUT /api/minions/:minionId to update a single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

//DELETE /api/minions/:minionId to delete a single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const eliminatedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (eliminatedMinion) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send();
})