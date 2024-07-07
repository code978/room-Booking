
exports.checkValidTimes = (time) => {
    const validTimes = [
        '09:00-09:30', '09:30-10:00', '10:00-10:30', '10:30-11:00', '11:00-11:30', '11:30-12:00', '12:00-12:30', '12:30-13:00',
        '13:00-13:30', '13:30-14:00', '14:00-14:30', '14:30-15:00', '15:00-15:30', '15:30-16:00', '16:00-16:30', '16:30-17:00',
        '17:00-17:30', '17:30-18:00'
    ];

    if (!validTimes.includes(time)) {
        return {
            status: false,
            message: 'Invalid time slot. Time should be in 30-minute intervals starting from 09:00 to 23:30.'
        };
    }

    return {
        status:true,
        message:`This is valid time.`
    };
}