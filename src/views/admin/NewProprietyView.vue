<script setup>
import { useForm, useField } from 'vee-validate'
import { validationSchema, imageSchema } from '@/valition/proprietySchema'

const { handleSubmit } = useForm({
    validationSchema: {
        ...validationSchema,
        ...imageSchema
    }
})

const items = [1, 2, 3, 4, 5]

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
            />
            <v-file-input
                accept="image/jpeg"
                label ="Photo"
                prepend-icon="mdi-camera"
                class="mb-5"
            />
            <v-text-field
                class="mb-5"
                label="Price"
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
                />
               </v-col>
            </v-row>
            <v-textarea class="mb-5" label="Description"></v-textarea>
            <v-checkbox
                label=" balcony"
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