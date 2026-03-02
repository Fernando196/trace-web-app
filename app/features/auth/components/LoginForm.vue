<script setup lang="ts">
import { useAuth } from '../composables/useAuth';


const { email, password, handleLogin } = useAuth();

</script>

<template>
    <div class="max-w-[500px] flex flex-col shadow-md bg-white px-16 py-10 border border-gray-100 gap-5">
        <span>Iniciar Sesión</span>
        <label>
            Email
            <input class="mt-2 shadow-sm w-full border border-gray-100 text-gray-500 rounded-md py-2 px-2" type="email" v-model="email">
        </label>
        <label class="mt-4">
            Contraseña
            <input class="mt-2 shadow-sm w-full border border-gray-100 text-gray-500 rounded-md py-2 px-2" type="password" v-model="password">
        </label>
        <button class="bg-gray-500 mx-auto text-white rounded-md py-2 px-6 font-semibold" @click="handleLogin">
            ENTRAR
        </button>
    </div>
</template>