<template>
  <div class="module-dashboard">
    <div class="calendar">
      <p id="monthName"></p>
      <p id="dayName"></p>
      <p id="dayNumber"></p>
      <p id="year"></p>
    </div>
  </div>
</template>

<script>
export default {

  mounted () {
    const lang = navigator.language
    const date = new Date()
    const dayNumber = date.getDate()
    const dayName = date.toLocaleString(lang, {
      weekday: 'long'
    })
    const monthName = date.toLocaleString(lang, {
      month: 'long'
    })
    const year = date.getFullYear()

    document.getElementById('monthName').innerHTML = monthName
    document.getElementById('dayName').innerHTML = dayName
    document.getElementById('dayNumber').innerHTML = dayNumber
    document.getElementById('year').innerHTML = year
  }
}
</script>

<style lang="scss" scoped>

@import url("https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,600;0,700;1,400&display=swap");

.module-dashboard {
  // margin: 0;
  margin-bottom: -40px !important;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("https://images.pexels.com/photos/2448749/pexels-photo-2448749.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-size: cover;
  background-position: center;

  .calendar {
    position: relative;
    width: 200px;
    background: #fff;
    text-align: center;
    border-radius: 8px;
    overflow: hidden;
    -webkit-box-reflect: below 1px
      linear-gradient(transparent, transparent, #000400);
  }

  .calendar #monthName {
    position: relative;
    padding: 5px 10px;
    background: #000000;
    color: #fff;
    font-size: 30px;
  }

  .calendar #dayName {
    margin: 20px;
    font-size: 20px;
    font-weight: 300;
    color: #464646;
  }

  .calendar #dayNumber {
    margin: 0;
    line-height: 1em;
    font-size: 80px;
    font-weight: 700;
    color: #2c2c2c;
  }

  .calendar #year {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 700;
    color: #999;
  }
}

</style>
