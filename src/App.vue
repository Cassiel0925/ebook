<template>
  <div id="app"> 
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  
}
// rem 配置 字体随着屏幕的大小变化
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style scoped>

</style>
