<script setup>
import { useForm, useField } from 'vee-validate'
import { validationSchema, imageSchema } from '@/validation/proprietySchema'

const items = [1, 2, 3, 4, 5]

const { handleSubmit } = useForm({
    validationSchema: {
        ...validationSchema,
        ...imageSchema
    }
})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const rooms = useField('rooms')
const bathrooms = useField('bathrooms')
const garages = useField('garages')
const description = useField('description')
const balcony = useField('balcony')

const submit = handleSubmit((values) => {
    console.log(values)
})

</script>
<template>
    <v-card
        max-width="800"
        flat
        class="mx-auto my-10"
    >
        <v-card-title
            class="text-h4 font-weight-bold"
            tag="h3"
        >
            New Propriety
        </v-card-title>
        <v-card-subtitle>
            Please fill the from
        </v-card-subtitle>

        <v-form class="mt-10">
            <v-text-field
                class="mb-5"
                label="Title Proprierty"
                v-model="title.value.value"
                :error-messages="title.errorMessage.value"
            />
            <v-file-input
                accept="image/jpeg"
                label ="Photo"
                prepend-icon="mdi-camera"
                class="mb-5"
                v-model="image.value.value"
                :error-messages="image.errorMessage.value"
            />
            <v-text-field
                class="mb-5"
                label="Price"
                v-model="price.value.value"
                :error-messages="price.errorMessage.value"
            />
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                        label="rooms"
                        class="mb-5"
                        :items="items"
                        v-model="rooms.value.value"
                        :error-messages="rooms.errorMessage.value"
                    />
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-select
                        label="bathrooms"
                        class="mb-5"
                        :items="items"
                        v-model="bathrooms.value.value"
                        :error-messages="bathrooms.errorMessage.value"
                    />
                </v-col>
               <v-col
                    cols="12"
                    md="4"
               >
                <v-select
                    label="garages"
                    class="mb-5"
                    :items="items"
                    v-model="garages.value.value"
                    :error-messages="garages.errorMessage.value"
                />
               </v-col>
            </v-row>
            <v-textarea class="mb-5" label="Description"
                v-model="description.value.value"
                :error-messages="description.errorMessage.value"
            ></v-textarea>
            <v-checkbox
                label=" balcony"
                v-model="balcony.value.value"
                :error-messages="balcony.errorMessage.value"
            />
            <v-btn
                color="pink-accent-3"
                block
                @click="submit"
            >
                Add
            </v-btn>
        </v-form>
    </v-card>
</template>