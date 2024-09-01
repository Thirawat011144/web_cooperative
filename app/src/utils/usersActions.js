import axios from "axios";
import Swal from "sweetalert2";
import config from "../../config";
import { makeModalDraggable } from "@/utils/draggable";

const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const branch = userData.branch || null;

if (!branch) {
    console.log('No userData found in localStorage');
} else {
    console.log('Branches:', branch);

    branch.forEach((branchItem, index) => {
        console.log(`Branch ${index + 1}:`, branchItem.name);
    });
}

// ฟังก์ชันดึงข้อมูล
export const fetchData = async (users, status = null) => {
    try {
        const response = await axios.get(`${config.api_path}/users`);
        let filteredUsers = response.data.filter((user) =>
            user.year === "ปวช 3" && branch.some(b => b.name === user.branch)
        );

        // ตรวจสอบข้อมูลผู้ใช้ที่ถูกกรองก่อนการกรองสถานะ
        console.log("Filtered users before status filter:", filteredUsers);

        if (status && status !== "ทั้งหมด") {
            filteredUsers = filteredUsers.filter(user => user.status === status);
        }

        // ตรวจสอบข้อมูลผู้ใช้หลังการกรองสถานะ
        console.log("Filtered users after status filter:", filteredUsers);

        users.value = filteredUsers;

        // ตรวจสอบข้อมูลผู้ใช้ที่ถูกเซ็ตให้กับ users
        console.log("Final users list:", users.value);

    } catch (error) {
        Swal.fire({
            title: "error",
            text: `Cr2 Error: ${error.message}`,
            icon: "error",
        });
    }
};

// ฟังก์ชันแสดง modal
export const showModal = async (id, modalData, isModalVisible) => {
    if (!modalData || !isModalVisible) {
        throw new Error("modalData and isModalVisible must be defined");
    }
    isModalVisible.value = true;
    try {
        const response = await axios.get(`${config.api_path}/user/${id}`);
        modalData.value = response.data;
        makeModalDraggable();
    } catch (error) {
        Swal.fire({
            title: "error",
            text: `Cr2 Error Fetching Data: ${error.message}`,
            icon: "error",
        });
    }
};

export const updateUserStatus = async (id, newStatus, fetchData, users) => {
    try {
        const response = await axios.put(`${config.api_path}/user/${id}`, {
            status: newStatus,
        });
        if (response.data.message === "Success") {
            Swal.fire({
                title: "สำเร็จ",
                text: "อัปเดตสถานะสำเร็จ",
                icon: "success",
            });
            console.log("Calling fetchData after status update...");
            await fetchData(users, selectedAction.value); // รีเฟรชข้อมูล โดยให้ใช้ status ปัจจุบัน
        }
    } catch (error) {
        Swal.fire({
            title: "error",
            text: `Cr2 Error Updating Status: ${error.message}`,
            icon: "error",
        });
    }
};

// ฟังก์ชันลบผู้ใช้
export const deleteUser = async (id, users) => {
    const result = await Swal.fire({
        title: "คุณแน่ใจหรือไม่?",
        text: "คุณจะไม่สามารถย้อนกลับได้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
        try {
            await axios.delete(`${config.api_path}/users/${id}`);
            users.value = users.value.filter((user) => user.id !== id);
            Swal.fire({
                title: "สำเร็จ",
                text: "ลบข้อมูลผู้ใช้สำเร็จ",
                icon: "success",
            });
            fetchData(users); // รีเฟรชข้อมูลโดยส่ง users ref เข้าไป
        } catch (error) {
            Swal.fire({
                title: "error",
                text: `Cr2 Error DeleteData: ${error.message}`,
                icon: "error",
            });
        }
    }
};