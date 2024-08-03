import axios from "axios";
import Swal from "sweetalert2";
import { makeModalDraggable } from "@/utils/draggable";

export const showModal = async (id, evaluationData, modalData, config, isModalVisible) => {
    isModalVisible.value = true;
    try {
        const response = await axios.get(`${config.api_path}/user/${id}`);
        const user = response.data;
        makeModalDraggable(); // Call function to make the modal draggable

        // Find evaluation data related to studentID
        const evaluation = evaluationData.value.find(e => e.studentId === user.studentID);
        modalData.value = { ...user, evaluation };
    } catch (error) {
        Swal.fire({
            title: "error",
            text: `${error.message}, Cr2 Error Fetching Data`,
            icon: 'error'
        });
    }
};

export const closeModal = (isModalVisible, modalData) => {
    isModalVisible.value = false;
    modalData.value = null;
};
