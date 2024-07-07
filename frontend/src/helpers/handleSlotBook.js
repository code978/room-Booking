import apiService from './../services/apiService';

const handleSlotBook = async (e, slot, id, selectedDate, setTsLoad) => {
    if (!slot) {
        const userConfirmation = window.confirm("Do you want to book this time slot?");
        if (!userConfirmation) {
            return alert('Booking cancelled by user.');
        }
        const data = e.target.innerText
        if (!data) return alert('something went wrong with time slot.')
        
        try {
            setTsLoad(true);

            let repsonse = await apiService.bookRoom(id, selectedDate, data)

            if (repsonse?.status) {
                alert(repsonse?.message || 'time slot booked sucessfully!')
                setTimeout(() => {
                    window.location.reload();
                }, [1000])
            }

        } catch (error) {
            console.log(error)
        } finally {
            setTsLoad(false);
        }
    } else {
        alert('already booked');
    }
}

export default  handleSlotBook;