<template>
  <q-layout view="hHh Lpr fFf">
    <q-header reveal elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img
              src="https://i.pinimg.com/originals/cc/77/f7/cc77f7e056dda01a8d435ca61ea13a02.jpg"
            />
          </q-avatar>
          Rick and Morty Character List
        </q-toolbar-title>
        <q-btn :disable="$route.path == '/'" @click="$router.push('/')" flat>
          Characters
        </q-btn>
        <q-btn
          :disable="$route.path == '/Episodes'"
          @click="$router.push('/Episodes')"
          flat
        >
          Episodes
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  setup() {},
});
</script>
