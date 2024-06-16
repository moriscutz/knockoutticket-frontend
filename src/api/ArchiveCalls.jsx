import axios from "axios";

const BASE_URL = "http://localhost:8080/archives";

const ArchiveCalls = {

    createArchivedEvent: async (archivedEventData) => {
        try{
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const response = await axios.post(BASE_URL, archivedEventData, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error archiving event:`, error);
            throw error;
        }
        

    }
};

export default ArchiveCalls;