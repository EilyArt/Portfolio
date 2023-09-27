import axios from 'axios';

const getAllModels = async () => {
    try {
        const response = await axios.get('http://localhost:8000/admin/models');
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

export { getAllModels };
