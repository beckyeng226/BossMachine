const ideasRouter = require ('express').Router();
module.exports = ideasRouter;

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require ('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send()
    }
});

//GET /api/ideas get all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

//POST /api/ideas create a new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

//GET /api/ideas/:ideaId get a single idea by id
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

//PUT /api/ideas/:ideaId to update a single idea by id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

//DELETE /api/ideas/:ideaId to delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const eliminatedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (eliminatedIdea) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});
