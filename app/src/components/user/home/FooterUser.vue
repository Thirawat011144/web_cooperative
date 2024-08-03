<template>
    <div>
        <FetherCardVue />
        <footer class="footer">

            <div class="footer-container">
                <div class="logo-section">
                    <img src="../../assets//img/rmuti3.png" alt="Ridgeview Middle School Logo" />
                    <span class="fs-6">Rajamangala University of Technology Isan Khonkaen Campus</span>
                    <span class="mt-1">มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น</span>
                    <span style="font-size: 15px;" class="m-3">ติดต่อมหาวิทยาลัย</span>
                    <span style="font-size: 12px;" class="fw-lighter">150 ถ.ศรีจันทร์ อ.เมือง จ.ขอนแก่น 40000 โทรศัพท์
                        043-283703
                        (ฝ่ายบริหารงานทั่วไป)</span>
                    <span style="font-size: 12px;" class="fw-lighter mt-1">043-283704 (งานบริการการศึกษา) แฟ็กซ์
                        043-234756
                        www.fte.rmuti.ac.th</span>
                </div>
                <div class="footer-columns">
                    <div class="footer-column">
                        <h3 class="text-center">หน่วยงานสหกิจศึกษา</h3>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <div class="social-links">
                    <a href="https://facebook.com"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://twitter.com"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://instagram.com"><i class="fa-brands fa-line"></i></a>
                    <a href="https://youtube.com"><i class="fa-solid fa-x"></i></a>
                </div>
                <p>คณะครุศาสตร์อุตสาหกรรม มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น</p>
            </div>
        </footer>
    </div>
</template>
<script setup>
import FetherCardVue from "./FetherCard.vue";

</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {

    background: #ececec;
}


.footer {
    font-family: 'Kanit', sans-serif;
    background-color: #827f82;
    color: white;
    padding: 40px 20px;
    width: 100%;
    box-sizing: border-box;

}

.footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 20px;
}

.logo-section img {
    height: 60px;
    margin-bottom: 10px;
}

.footer-columns {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
}

.footer-column {
    flex: 1;
    padding: 0 20px;
}

.footer-column h3 {
    margin-bottom: 10px;
}

.footer-column ul {
    list-style: none;
    padding: 0;
}

.footer-column ul li {
    margin-bottom: 5px;
}

.footer-column ul li a {
    color: white;
    text-decoration: none;
    font-weight: 300;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid #555;
    padding-top: 10px;
    box-sizing: border-box;
    /* เพิ่มบรรทัดนี้ */
}

.social-links a {
    color: white;
    margin: 0 10px;
    font-size: 1.5em;
}
</style>
