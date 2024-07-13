exports.searchQuery = (name, date, time) => {
    let query = {};

    // Search by name or tag if provided
    if (name) {
        query.$or = [
            { name: { $regex: name, $options: 'i' } }, // case-insensitive search for name
            { tag: { $regex: name, $options: 'i' } }   // case-insensitive search for tag
        ];
    }

    // Search by date and time if provided, ensuring the slot is not booked
    if (date) {
        let dateMatch = {
            date: date,
            slots: {
                $elemMatch: {
                    $or: [
                        { booked: { $exists: false } }, // slot is not booked (booked field does not exist)
                        { booked: false }               // slot is not booked (booked field is false)
                    ]
                }
            }
        };

        if (time) {
            dateMatch.slots.$elemMatch.time = time;
        }

        query.timeSlots = { $elemMatch: dateMatch };
    }

    return query;
};
