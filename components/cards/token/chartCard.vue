<template>
  <div class="backgroundChart">
    <LineChart :labels="labels" :data="prices" :style="css" />
  </div>
</template>

<script>
/* import { onMounted } from "@nuxtjs/composition-api"; */
import LineChart from "~/components/atoms/LineChart.vue";
import PopFromShadow from "../../atoms/popFromShadow.vue";
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  useFetch,
} from "@nuxtjs/composition-api";
import useCoingecko from "~/composables/useCoingecko";
// import dateFormat from 'dateformat';

export default defineComponent({
  name: "TestChart",
  components: {
    LineChart,
    PopFromShadow,
  },
  setup() {
    const { fetchCoinChart } = useCoingecko();

    const labels = reactive({ list: [] });
    const prices = reactive({ list: [] });

    useFetch(async () => {
      const chartData = await fetchCoinChart("sugarland-token");
      const timestamps = [];
      chartData?.prices.map((e, i) => {
        if (i % 3 == 0) {
          let hh = "0" + new Date(e[0]).getHours().toString();
          hh = hh.slice(hh.length - 2, hh.length);
          timestamps.push(hh + ":" + new Date(e[0]).getMinutes());
          prices.list.push(e[1].toFixed(10));
        }
        return e;
      });
      labels.list = timestamps;
    });

    onMounted(() => {
      setInterval(async () => {
        const chartData = await fetchCoinChart("sugarland-token");
        const timestamps = [];
        chartData?.prices.map((e, i) => {
          if (i % 3 == 0) {
            let hh = "0" + new Date(e[0]).getHours().toString();
            hh = hh.slice(hh.length - 2, hh.length);
            timestamps.push(hh + ":" + new Date(e[0]).getMinutes());
            prices.list.push(e[1].toFixed(10));
          }
          return e;
        });
        labels.list = timestamps;
      }, 600000);
    });

    return { labels, prices };
  },
  computed: {
    css() {
      if (process.client) {
        let width = window.innerWidth;
        let mobile = {
          width: `350px`,
          height: `350px`,
          position: "relative",
          color: `white`,
        };
        let desktop = {
          width: `690px`,
          height: `350px`,
          position: "relative",
          color: `white`,
        };
        if (width < 700) {
          return mobile;
        }
        if (width >= 700) {
          return desktop;
        } else {
          return {};
        }
      }
    },

    myStyles() {
      return {
        width: `690px`,
        height: `350px`,
        position: "relative",
        color: `white`,
      };
    },
  },
});
</script>

<style>
#app {
  font-family: "Montserrat", sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-secondary);
  margin-top: 60px;
}
canvas#line-chart {
  background-color: transparent;
  border-radius: 20px;
  padding: 25px;
}

.backgroundChart {
  background: linear-gradient(179.98deg, #321a54 0.02%, #43246b 99.98%);
  box-shadow: 0px 24px 74px rgba(37, 0, 84, 0.5);
  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

@media (min-width: 320px) {
  .testChart {
    padding-inline: 120px;
    margin-inline: 120px;
  }
  .backgroundChart {
    margin-inline: 20px;
  }

  .testChartStyle {
    width: 350px;
    height: 350px;
    position: relative;
    color: white;
  }
}
@media (min-width: 620px) {
  .testChart {
    margin-inline: 0;
    padding-inline: 0;
  }
  .backgroundChart {
    margin-inline: 0;
    padding-inline: 0;
  }

  .testChartStyle {
    width: 690px;
    height: 350px;
    position: relative;
    color: white;
  }
}
</style>
