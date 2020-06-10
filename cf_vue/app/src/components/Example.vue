<template>
    <div>
        <h1>{{ message }}</h1>
        <slot name="paragraph"></slot>
        <slot name="link"></slot>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            message: "Hello Vue!!"
        }
    }
}
</script>