import { ref } from "vue";
import { useRouter } from "vue-router";

const navRoutes = ref([])   // stores all navigable routes

export function useNavStore() {
    const router = useRouter()

    const updateNavRoutes = () => {
        const allRoutes = router.getRoutes()
        navRoutes.value = allRoutes.filter((route) => 
            route.meta?.isNavLink)
    }

    // auto-run once
    if (navRoutes.value.length === 0) {
        updateNavRoutes()
    }

    return {
        navRoutes,
        updateNavRoutes
    }
}