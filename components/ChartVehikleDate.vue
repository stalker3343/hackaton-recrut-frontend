<template>
  <v-card>
    <v-card-title>{{ header }}</v-card-title>
    <v-card-text>
      <div class="d-flex">
        <v-btn-toggle v-model="dateFilter" mandatory>
          <v-btn value="six" x-small>6 месяцев </v-btn>
          <v-btn value="last" x-small>прошлый месяц </v-btn>
          <v-btn value="curent" x-small>текущий месяц </v-btn>
        </v-btn-toggle>
      </div>
    </v-card-text>

    <v-progress-linear v-if="$fetchState.pending" indeterminate />
    <v-alert v-else-if="$fetchState.error" type="error">
      Ошибка: {{ $fetchState.error.message }}
    </v-alert>
    <client-only>
      <apex-charts height="350" :options="chartOptions" :series="series" />
    </client-only>
  </v-card>
</template>

<script>
import ru from 'apexcharts/dist/locales/ru.json'
import dayjs from 'dayjs'
const getDefaultFilters = () => ({
  vehicle: [],
})
export default {
  props: {
    header: {
      type: String,
      required: true,
    },
    repository: {
      type: Function,
      required: true,
    },
    baseFilters: {
      type: Object,
      default: () => ({}),
    },
    needCategs: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dateFilter: 'six',

      series: [],
      chartOptions: {
        colors: ['#3C7EF5', '#DDECFF'],
        noData: {
          text: 'Нет данных',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: '20px',
            fontFamily: undefined,
          },
        },
        chart: {
          toolbar: {
            show: false,
          },

          fontFamily: 'Montserrat, sans-serif',
          foreColor: '#797F95',

          type: 'bar',
          height: 350,
          locales: [ru],
          defaultLocale: 'ru',
        },
        grid: {
          show: false,
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          fontSize: '12px',
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 400,
          markers: {
            width: 6,
            height: 6,
            radius: 20,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded',
          },
        },
        dataLabels: {
          enabled: true,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent'],
        },
        // labels: ['2', '3', '43'],
        // xaxis: {
        //   type: 'datetime',
        // },
        // yaxis: {
        //   labels: {
        //     formatter: (value) => {
        //       return formatThousandSeparator(value)
        //     },
        //   },
        // },
        fill: {
          opacity: 1,
        },
        // labels: {
        //   show: true,
        // },
      },
    }
  },
  async fetch() {
    const arr = await this.repository({ ...this.filters, ...this.baseFilters })
    // console.log('🚀 ~ file: ChartVehikleDate.vue:128 ~ fetch ~ arr:', arr)
    this.series = [
      {
        name: 'График',
        data: arr,
      },
    ]
    if (this.needCategs) {
      this.chartOptions.xaxis = {
        categories: arr.map((el) => el.x),
      }
      this.series = [{ data: arr.map((el) => el.y), name: 'График' }]
    }
  },
  computed: {
    filters() {
      const dateValueToFilters = {
        six: {
          date_after: dayjs().subtract(6, 'months').format('YYYY-MM-DD'),
          date_before: dayjs().format('YYYY-MM-DD'),
        },
        last: {
          date_after: dayjs().subtract(2, 'months').format('YYYY-MM-DD'),
          date_before: dayjs().subtract(1, 'months').format('YYYY-MM-DD'),
        },
        curent: {
          date_after: dayjs().startOf('month').format('YYYY-MM-DD'),
          date_before: dayjs().endOf('month').format('YYYY-MM-DD'),
        },
      }
      return dateValueToFilters[this.dateFilter]
    },
  },
  watch: {
    filters() {
      this.$fetch()
    },
  },
}
</script>

<style></style>
