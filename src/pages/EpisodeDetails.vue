<template>
  <q-page class="flex row justify-center items-center">
    <q-card v-if="!loading" style="width: 98%; min-height: 60vw; margin: 0.5vw">
      <q-card-section>
        <div class="row">
          <div class="flex column q-pt-sm q-pl-md">
            <span class="text-h4">
              {{ episode.name + " - " + episode.episode }}
            </span>
            <span class="text-body1 q-mt-md">
              {{ episode.air_date }}
            </span>
          </div>
        </div>
        <q-list class="q-mt-md" bordered separator>
          <q-toolbar class="bg-grey text-white shadow-2">
            <q-toolbar-title>Characters</q-toolbar-title>
          </q-toolbar>

          <q-item
            v-for="character in episode.characters"
            :key="character.id"
            clickable
            v-ripple
            @click="goToCharacterPage(character.id)"
          >
            <q-item-section avatar>
              <q-avatar rounded>
                <img :src="character.image" />
              </q-avatar>
            </q-item-section>
            <q-item-section class="text-body1">
              {{ character.name }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
    <q-spinner-ball v-else color="dark" size="5vw" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Episode Details",

  data() {
    return {
      episode: Object,
      id: this.$route.params.id,
      loading: true,
    };
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
  },
  mounted() {
    this.$axios({
      url: "https://rickandmortyapi.com/graphql",
      method: "post",
      data: {
        query: `query {
                  episode (id: ${this.id}) {
                    name,
                    air_date,
                    episode,
                    characters {
                      id,
                      name,
                      image,
                    }
                  }
                }`,
      },
    }).then((res) => {
      this.episode = res.data.data.episode;
      this.loading = false;
    });
  },
});
</script>
