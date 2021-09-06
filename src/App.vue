<template>
    <router-view />
</template>

<style lang="scss">
// Custom.scss
// Option B: Include parts of Bootstrap

// 1. Include functions first (so you can manipulate colors, SVGs, calc, etc)
@import '../node_modules/bootstrap/scss/functions';

// 2. Include any default variable overrides here
$primary: #6610f2;

// 3. Include remainder of required Bootstrap stylesheets
@import '../node_modules/bootstrap/scss/variables';
@import '../node_modules/bootstrap/scss/mixins';

// 4. Include any optional Bootstrap components as you like
@import '../node_modules/bootstrap/scss/root';
@import '../node_modules/bootstrap/scss/reboot';
@import '../node_modules/bootstrap/scss/type';
@import '../node_modules/bootstrap/scss/images';
@import '../node_modules/bootstrap/scss/containers';
@import '../node_modules/bootstrap/scss/grid';

// 5. Add additional custom code here

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
