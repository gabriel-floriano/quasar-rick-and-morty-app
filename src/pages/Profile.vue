<template>
  <q-page class="flex row justify-center items-center">
    <q-card v-if="!loading" style="width: 98%; min-height: 60vw; margin: 0.5vw">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-3">
            <q-img class="rounded-borders" :src="character.image" />
          </div>
          <div class="flex column col-12 col-md-8 q-pt-md q-pl-md">
            <span class="text-h4">
              {{ character.name }}
            </span>
            <span class="text-h6 q-mt-md">
              Status:
              <span :class="status(character.status)" style="text">{{
                character.status
              }}</span>
            </span>
            <span class="text-body1 q-mt-md">
              Species:
              {{
                !character.type
                  ? character.species
                  : character.species + ", " + character.type
              }}
            </span>
            <span class="text-body1 q-mt-md">
              Gender:
              {{ character.gender }}
            </span>
            <span class="text-body1 q-mt-md">
              Origin:
              {{
                character.origin
                  ? character.origin.name + " - " + character.origin.dimension
                  : ""
              }}
            </span>
            <span class="text-body1 q-mt-md">
              Location:
              {{
                character.location
                  ? character.location.name +
                    " - " +
                    character.location.dimension
                  : ""
              }}
            </span>
          </div>
        </div>
        <div class="text-h4 q-mt-md"></div>
        <q-list bordered separator>
          <q-toolbar class="bg-grey text-white shadow-2">
            <q-toolbar-title>Episode appearances</q-toolbar-title>
          </q-toolbar>

          <q-item
            @click="goToEpisodePage(episode.id)"
            v-for="episode in character.episode"
            :key="episode.id"
            clickable
            v-ripple
          >
            <q-item-section>
              <q-item-label>
                {{ episode.name }} - {{ episode.episode }}
              </q-item-label>
              <q-item-label caption>{{ episode.air_date }}</q-item-label>
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
  name: "Profile",

  data() {
    return {
      id: this.$route.params.id,
      character: Object,
      loading: true,
    };
  },
  methods: {
    status(status) {
      if (status == "Alive") return "text-positive";
      else if (status == "Dead") return "text-negative";
      else return "text-warning";
    },
    goToEpisodePage(id) {
      this.$router.push(`/Episode/${id}`);
    },
  },
  mounted() {
    this.loading = true;
    this.$axios({
      url: "https://rickandmortyapi.com/graphql",
      method: "post",
      data: {
        query: `query {
                  character (id: ${this.id}) {
                    name,
                    image,
                    status,
                    species,
                    type,
                    gender,
                    origin{
                    name,
                    dimension
                    },
                    location{
                    name,
                    dimension
                    },
                    episode {
                        id,
                        name,
                        air_date,
                        episode
                    },
                  }
                }`,
      },
    }).then((res) => {
      this.character = res.data.data.character;
      this.loading = false;
    });
  },
});
</script>
