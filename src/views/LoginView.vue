<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema } from '../validation/loginSchema'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

const { handleSubmit } = useForm({ validationSchema: loginSchema })

const auth = useFirebaseAuth()

 console.log(auth)

const email = useField('email')
const password = useField('password')
const submit = handleSubmit((values) => {
    //console.log('submit...')
    //console.log(values)
    signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
            console.log(userCredential)
        }).catch(error => {
            console.log(error.code)
            console.log(error.message)
        })
})

</script>

<template>
    <v-card
        flat
        max-width="600"
        class="mx-auto my-10"
    >
        <v-card-title
            class="text-h4 font-weight-bold"
            tag="h3"
        >
            Start Session
        </v-card-title>
        <v-card-subtitle>
            Start with your account.
        </v-card-subtitle>

        <v-form class="mt-5">
            <v-text-field
                class="mb-3"
                type="email"
                label="Email"
                bg-color="blue-grey-lighten-5"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />
            <v-text-field
                class="mb-3"
                type="password"
                label="Password"
                bg-color="blue-grey-lighten-5"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />
            <v-btn
                block
                color="pink-accent-3"
                @click="submit"
            >
                Start Session
            </v-btn>
        </v-form>

    </v-card>
</template>