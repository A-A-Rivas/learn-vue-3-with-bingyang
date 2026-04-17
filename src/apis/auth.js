import { ref } from "vue";

const isAuthenticated = ref(false) // a global state that tracks whether the user is logged in
const login = async (username, password) => {

    // simulates a successful login
    isAuthenticated.value = true
}

const logout = async () => {

    // simulates a successful logout
    isAuthenticated.value = false
}

export { isAuthenticated, login, logout }