<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.button {
    cursor: pointer;
    border: none;
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    background: slateblue;
    color: white;
    transition: all 0.3s;
    &:hover {
        background: white;
        outline: 1px solid slateblue;
        color: rgba(0, 0, 0, 0.8);
    }
}
</style>
