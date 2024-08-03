<template>
    <div class="bg">
        <div class="container">
            <div class="box">
                <div class="icon">🔍</div>
                <div class="content">
                    <h2>ค้นหาสถานประกอบการ</h2>
                    <p>ค้นหาข้อมูลของสถานประกอบการที่รุ่นก่อนหน้านี้ไปฝึก เพื่อเป็นแนวทางการตัดสินใจ</p>
                    <router-link to="/internship-teaching" class="cta">GET STARTED →</router-link>
                </div>
            </div>
            <div class="box">
                <div class="icon">📅</div>
                <div class="content">
                    <h2>ดูข้อมูลข่าวสาร</h2>
                    <p>ติดตามประกาศต่างๆ ที่เกี่ยวข้องกับงานสหกิจศึกษา</p>
                    <router-link to="/news" class="cta">GET STARTED →</router-link>
                </div>
            </div>
            <div class="box">
                <div class="icon">🏫</div>
                <div class="content">
                    <h2>เกี่ยวกับงานสหกิจศึกษา</h2>
                    <p>หากมีข้อสงสัยสามารถติดต่อมาตามข้อมูลที่ให้ไว้ในเพจของเรา</p>
                    <router-link to="/cooperative" class="cta">GET STARTED →</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.bg {
    position: relative;
    width: 100%;
    /* min-height: 100vh; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
}

.bg::before {
    content: "";
    /* background-image: url('../../assets/img/8.1.png'); */
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(3px);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
}

.container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    max-width: 1200px;
    margin: 20px auto;
}

.box {
    background-color: white;
    width: 30%;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s;
}

.box:hover {
    transform: translateY(-10px);
}

.icon {
    font-size: 40px;
    margin-bottom: 15px;
}

.content h2 {
    font-size: 20px;
    margin-bottom: 10px;
}

.content p {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
}

.cta {
    color: #ff7f50;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;
}

.cta:hover {
    color: #ff4500;
}
</style>
