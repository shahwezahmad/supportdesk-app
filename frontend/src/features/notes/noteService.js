import axios from "axios"

const API_URL = 'https://supportdesk-app-c1ny.onrender.com/api/tickets/'

const getNotes = async (tickedId, token) => {
    const config = {
        headers : {
            Authorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(`${API_URL}/${tickedId}/notes`,config)

    return response.data


}

const createNote =  async (noteText, ticketId, token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}${ticketId}/notes`,{text:noteText}, config )
    return response.data
}

const noteServie = {getNotes,createNote}
export default noteServie