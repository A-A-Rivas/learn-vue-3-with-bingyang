import { ref } from "vue";

const isAuthenticated = ref(false) // a global state that tracks whether the user is logged in
const userRole = ref('')           // stores 'regular' or 'vip

const login = async (username, password) => {

    // simulates a successful login
    isAuthenticated.value = true
    userRole.value = username === 'vipUser' ? 'vip' : 'regular'
}

const logout = async () => {

    // simulates a successful logout
    isAuthenticated.value = false
    userRole.value = ''
}

const getUserRole = () => {
    return userRole.value
}

export { isAuthenticated, login, logout, getUserRole }