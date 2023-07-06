import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { ref, computed, onMounted } from 'vue'


export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const errorMessage = ref('')

    //error dictionary
    const errorCodes = {
        'auth/wrong-password': 'Wrong password',
        'auth/user-not-found': 'User not found'
    }

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                //console.log(user)
                authUser.value = user
            }
        })
    })

    const login = ({ email, password}) => {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //console.log(userCredential)
            const user = userCredential.user
            authUser.value = user
            //console.log(authUser.value)
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