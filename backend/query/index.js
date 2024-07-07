
exports.searchQuery = (name, date, time) => {
    if (name || date || time) {
        query = {};

        if (name) {
            query.$or = [
                { name: { $regex: name, $options: 'i' } }, // case-insensitive search
                { tag: { $regex: name, $options: 'i' } }   // case-insensitive search for tag
            ];
        }

        if (date && time) {
            query.timeSlots = {
                $elemMatch: {
                    date: date,
                    'slots.time': time,
                },
            };
        } else if (date) {
            query.timeSlots = {
                $elemMatch: {
                    date: date,
                },
            };
        }
    }
}
