import apiService from './../services/apiService';
import socketUrl from './../../constants/urls';
import io from 'socket.io-client';

const handleSlotBook = async (e, slot, id, selectedDate, setTsLoad) => {

    const socket = io(socketUrl);

    useEffect(() => {
        return () => {
            socket.disconnect();
        }
    })

    if (!slot) {
        const userConfirmation = window.confirm("Do you want to book this time slot?");
        if (!userConfirmation) {
            return alert('Booking cancelled by user.');
        }
        const data = e.target.innerText
        if (!data) return alert('something went wrong with time slot.')

        try {
            setTsLoad(true);


            // const socket = io(socketUrl, { transports: ['websocket'] });
            const dataToSend = {
                roomId: id,
                selectedDate,
                data
            };
            socket.emit('bookRoom', dataToSend);
            socket.on('bookingSuccess', () => {
                setTsLoad(false);
                alert('time slot booked sucessfully!');
                setTimeout(() => {
                    window.location.reload();
                }, [1000]);
            });
            socket.on('bookingFailed', () => {
                setTsLoad(false);
                alert('something went wrong with time slot.');
            });

            // if (repsonse?.status) {
            //     alert(repsonse?.message || 'time slot booked sucessfully!')
            setTimeout(() => {
                window.location.reload();
            }, [1000])
            // }

        } catch (error) {
            console.log(error)
        } finally {
            setTsLoad(false);
        }
    } else {
        alert('already booked');
    }
}

export default handleSlotBook;