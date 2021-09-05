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

#app {
    width: 100%;
    min-height: 100vh;
}
</style>
