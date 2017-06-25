<template>
  <div class="background"></div>
</template>

<style scoped>
@keyframes colorful {
  0%   {background-color: rgba(255, 99, 132, 1);}
  20%  {background-color: rgba(54, 162, 235, 1);}
  40%  {background-color: rgba(255, 206, 86, 1);}
  60%  {background-color: rgba(75, 192, 192, 1);}
  80%  {background-color: rgba(153, 102, 255, 1);}
  100% {background-color: rgba(255, 159, 64, 1);}
}
.background {
  width: 100%;
  height: 230px;
  animation-name: colorful;
  animation-duration: 24s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
</style>
