<template>
    <router-view />
</template>

<style lang="scss">
html {
    font-size: 62.5%;
    @media (max-width: 640px) {
        font-size: 52%;
    }
}

body {
    color: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
p,
li {
    font-weight: 200;
}
strong {
    font-weight: 400;
}

#app {
    margin-top: 10vh;
    width: 100%;
}
</style>
