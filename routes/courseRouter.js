import express from 'express';
const router = express.Router();
import { SQL } from '../utils/db.js'

// Basic Route
router.get("/courses", async (req, res) => {
    // Fetch all rows from the courses table
    try {
        const courses = await SQL`SELECT * FROM course ORDER BY cid;;`;
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/courses/:cid", async (req, res) => {
    const { cid } = req.params;
    const course = await SQL`SELECT * FROM course WHERE cid = ${cid};`;
    res.status(200).json(course[0]);
});

router.post("/courses", async (req, res) => {
    const { cid, code, title, crhr, semester } = req.body;
    if (cid) {
        const course = await SQL`UPDATE course SET code = ${code}, title = ${title}, crhr = ${crhr}, semester = ${semester} WHERE cid = ${cid} RETURNING *;`;
        res.status(200).json(course[0]);
    }
    
});

export default router;