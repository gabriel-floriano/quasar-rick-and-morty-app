<template>
  <q-page class="flex column justify-center items-center">
    <div v-if="!loading" class="flex row justify-center items-center">
      <q-card
        class="my-card bg-grey text-white"
        v-for="episode in episodes"
        :key="episode.episode"
        style="width: 95%; margin: 0.5vw"
      >
        <q-card-section>
          <div class="text-h6">{{ episode.name }} - {{ episode.episode }}</div>
          <div class="flex row wrap justify-between items-end">
            <div class="text-body1">{{ episode.air_date }}</div>
            <q-btn @click="goToEpisodePage(episode.id)" flat
              >go to episode page</q-btn
            >
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pa-lg flex flex-center">
        <q-pagination
          color="dark"
          v-model="page"
          :max="3"
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
  name: "Episodes",

  data() {
    return {
      episodes: Object,
      page: 1,
      loading: true,
    };
  },
  watch: {
    page() {
      this.getEpisodes();
    },
  },
  methods: {
    goToEpisodePage(id) {
      this.$router.push(`/Episode/${id}`);
    },
    getEpisodes() {
      this.$axios({
        url: "https://rickandmortyapi.com/graphql",
        method: "post",
        data: {
          query: `query {
                    episodes (page: ${this.page}, filter: {}) {
                      results {
                        id,
                        name,
                        air_date,
                        episode,
                      }
                    }
                  }`,
        },
      }).then((res) => {
        this.episodes = res.data.data.episodes.results;
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getEpisodes();
  },
});
</script>
