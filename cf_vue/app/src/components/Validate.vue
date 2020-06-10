<template>
    <div>
        <template v-if="error">
            <p>Error Form</p>
        </template>

        <form @submit.prevent="validateForm">
            <input v-model="$v.name.$model" type="text">
            <!-- <p v-if="!$v.name.minLength">Nombre deb ser mayor a {{ $v.name.$params.minLength.min }}</p> -->
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators'

export default {
    data: function() {
        return {
            name: "",
            error: false
        }
    },

    validations: {
        name: {
            required,
            minLength: minLength(5)
        }
    },

    watch: {
        name: function(new_value, old_value){
            console.log("Old: " + old_value);
            console.log("New: " + new_value);
        }
    },

    methods: {
        validateForm: function() {
            this.$v.$touch();

            if(this.$v.$invalid) {
                this.error = true;
            } else {
                alert('Valido');
            }
        }
    }
}
</script>