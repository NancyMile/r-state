import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref, computed } from 'vue'


export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const errorMessage = ref('')

    //error dictionary
    const errorCodes = {
        'auth/wrong-password': 'Wrong password',
        'auth/user-not-found': 'User not found'
    }

    const login = ({ email, password}) => {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        }).catch(error => {
            // console.log(error.code)
            // console.log(error.message)
            //console.log(errorCodes[error.code])
            errorMessage.value = errorCodes[error.code]
        })
    }

    const hasError = computed(() => {
        return errorMessage.value
    })


    return {
        login,
        errorMessage,
        hasError
    }
})