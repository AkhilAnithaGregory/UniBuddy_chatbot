import { Types } from "mongoose";

export async function getJournals(req, res) {
    try {
        const { userId, year, month, page = 1, limit = 10 } = req.query;
        const userObjectId = new Types.ObjectId(userId);

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const skip = (page - 1) * limit;

        // Build match object
        let match = { userId: userObjectId };

        // Year filtering
        if (year) {
            match.$expr = {
                $eq: [
                    { $toInt: { $arrayElemAt: [{ $split: ["$date", "/"] }, 2] } },
                    parseInt(year)
                ]
            };
        }

        // Month filtering
        if (month) {
            match.$expr = {
                $and: [
                    match.$expr,
                    {
                        $eq: [
                            { $toInt: { $arrayElemAt: [{ $split: ["$date", "/"] }, 1] } },
                            parseInt(month)
                        ]
                    }
                ]
            };
        }

        const journals = await aggregate([
            { $match: match },
            { $sort: { date: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) }
        ]);

        const totalItem = await countDocuments({ userId });
        const totalPage = Math.round(totalItem / limit);

        return res.status(200).json({
            totalItem,
            totalPage,
            page: parseInt(page),
            limit: parseInt(limit),
            journals
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}


export async function createJournal(req, res) {
    try {
        const { userId, title, date, content } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const journal = await create({
            userId,
            title,
            date,
            content
        });

        return res.status(201).json({
            message: "Journal created successfully",
            journal
        });

    } catch (error) {

        // Avoid duplicate journal same user
        if (error.code === 11000) {
            return res.status(400).json({
                message: "You already created a journal for this date."
            });
        }

        return res.status(500).json({
            message: "Server error"
        });
    }
}

export async function getJournalById(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid journal ID" });
        }

        const journal = await findOne({
            _id: id,
            userId: userId
        });

        if (!journal) {
            return res.status(404).json({ message: "Journal not found or access denied" });
        }

        return res.status(200).json(journal);

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}

export async function deleteJournal(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        
        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid journal ID" });
        }

        const journal = await findOne({ _id: id, userId });

        if (!journal) {
            return res.status(404).json({ message: "Journal not found or access denied" });
        }

        await deleteOne({ _id: id });

        return res.status(200).json({ message: "Journal deleted successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}


export async function updateJournal(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { title, date, content } = req.body;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid journal ID" });
        }

        const journal = await findOne({ _id: id, userId });
        if (!journal) {
            return res.status(404).json({ message: "Journal not found or access denied" });
        }

        if (date && date !== journal.date) {
            const existing = await findOne({ userId, date });
            if (existing) {
                return res.status(400).json({ message: "You already have a journal for this date" });
            }
        }

        journal.title = title || journal.title;
        journal.date = date || journal.date;
        journal.content = content || journal.content;

        await journal.save();

        return res.status(200).json({ message: "Journal updated successfully", journal });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}