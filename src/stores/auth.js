import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'


export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const errorMessage = ref('')
    const router  = useRouter()

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
            router.push({name: 'admin-proprieties'})
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

    const isAuth = computed(() => {
        return authUser.value
    })

    const logout = () => {
        //console.log('closing session')
        signOut(auth).then(() => {
            authUser.value = null
            router.push({name:'login'})
        }).catch(error => console.log(error))

    }


    return {
        login,
        errorMessage,
        hasError,
        isAuth,
        logout
    }
})