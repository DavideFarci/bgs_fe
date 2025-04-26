import { onBeforeMount, ref } from "vue";
// @ts-ignore
import api from "../api/axios/axiosConfig.js";
import { useRouter } from "vue-router";
import { getAccessToken } from "../api/auth/auth";

export const useAuthGuard = () => {
  const router = useRouter();

  const user = ref<{ username: string; email: string } | null>(null);

  const checkAuth = () => {
    const token = getAccessToken();
    if (!token) {
      router.replace({ name: "login" });
    }
  };

  const fetchUser = async () => {
    try {
      const response = await api.get("/api/auth/me/");
      user.value = response.data;
    } catch (error) {
      console.error("Errore nel recuperare i dati utente", error);
      user.value = null;
    }
  };

  onBeforeMount(() => {
    checkAuth();
    fetchUser();
  });

  return {
    user,
  };
};
