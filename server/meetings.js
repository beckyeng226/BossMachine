const meetingsRouter = require ('express').Router();
module.exports = meetingsRouter;

const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting
} = require ('./db');

// meetingsRouter.param('meetingId', (req, res, next, id) => {
//     const meeting = getFromDatabaseById('meetings', id);
//     if (meeting) {
//         req.meeting = meeting;
//         next();
//     } else {
//         res.status(404).send('No meetings found.')
//     }
// });

//GET /api/meetings get all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

//POST /api/meetings create new meeting (use createMeeting fxn from db.js)
meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

//DELETE /api/meetings to delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})