<template>
  <q-page class="flex row justify-center items-center">
    <div v-if="!loading" class="flex row justify-center items-center">
      <q-card
        v-for="character in characters"
        :key="character.name"
        style="width: 24em; margin: 0.5vw"
      >
        <q-img :src="character.image" />
        <q-card-section>
          <div class="flex column wrap">
            <div>
              <div class="text-h6">{{ character.name }}</div>
              <div class="flex row wrap justify-between">
                <q-chip :class="status(character.status)" style="text">{{
                  character.status
                }}</q-chip>
                <q-btn @click="goToCharacterPage(character.id)" flat>
                  To Character page
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          color="dark"
          v-model="page"
          :max="34"
          :max-pages="6"
          direction-links
        ></q-pagination>
      </div>
    </div>
    <q-spinner-ball v-else color="dark" size="5vw" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Index",
  data() {
    return {
      characters: Object,
      page: 1,
      loading: true,
    };
  },
  watch: {
    page() {
      this.getCharacters();
    },
  },
  methods: {
    goToCharacterPage(id) {
      this.$router.push(`/Profile/${id}`);
    },
    status(status) {
      if (status == "Alive") return "bg-positive text-white";
      else if (status == "Dead") return "bg-negative text-white";
      else return "bg-warning text-white";
    },
    getCharacters() {
      this.loading = true;
      this.$axios({
        url: "https://rickandmortyapi.com/graphql",
        method: "post",
        data: {
          query: `query {
                  characters (page: ${this.page}, filter: {}) {
                    results {
                      id,
                      name,
                      image,
                      status,
                      species,
                      type,
                      gender,
                    }
                  }
                }
        `,
        },
      }).then((res) => {
        this.characters = res.data.data.characters.results;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getCharacters();
  },
});
</script>
