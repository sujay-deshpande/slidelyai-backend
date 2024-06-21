import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const dbPath = path.resolve(__dirname, '../db.json');
const PORT = 3000;

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send(true);
});

app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string, 10);
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    if (db.submissions && index >= 0 && index < db.submissions.length) {
        res.json(db.submissions[index]);
    } else {
        res.status(404).send('Submission not found');
    }
});

app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

    const newSubmission = {
        name,
        email,
        phone,
        github_link,
        stopwatch_time
    };

    if (!db.submissions) {
        db.submissions = [];
    }

    db.submissions.push(newSubmission);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
    res.status(200).send('Submission successful');
});

app.get('/search', (req, res) => {
    try {
        const name = (req.query.name as string).toLowerCase();
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 5;

        const dbContent = fs.readFileSync(dbPath, 'utf-8');
        const db = JSON.parse(dbContent);

        if (!db.submissions) {
            return res.status(404).send('No submissions found');
        }

        const results = db.submissions.filter((submission: { name: string; }) =>
            submission.name.toLowerCase().includes(name)
        );

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedResults = results.slice(startIndex, endIndex);

        const paginationInfo = {
            totalResults: results.length,
            currentPage: page,
            totalPages: Math.ceil(results.length / limit),
        };

        res.json({ results: paginatedResults, pagination: paginationInfo });
    } catch (error) {
        res.status(500).send('Server error: ' + error);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
