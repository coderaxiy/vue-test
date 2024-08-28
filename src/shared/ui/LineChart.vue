<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale)

export default {
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('myChart').getContext('2d')

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [
            'M',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            'N',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7'
          ],
          datasets: [
            {
              label: 'Driver Activity',
              data: [
                1672531200000, 1672534800000, 1672538400000, 1672542000000, 1672545600000,
                1672549200000, 1672552800000, 1672556400000, 1672560000000, 1672563600000,
                1672567200000, 1672570800000, 1672574400000, 1672578000000, 1672581600000,
                1672585200000, 1672588800000, 1672592400000
              ],
              borderColor: 'orange',
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              position: 'top',
              grid: {
                display: true,
                color: '#d3d3d3',
                drawTicks: true,
                tickLength: 10,
                lineWidth: 1
              },
              ticks: {
                display: true,
                padding: 10
              }
            },
            y: {
              type: 'category',
              labels: ['OFF', 'SB', 'DR', 'ON'],
              grid: {
                display: true,
                color: '#d3d3d3',
                drawTicks: false
              },
              ticks: {
                display: true,
                padding: 10,
                callback: function (value, index) {
                  return this.getLabelForValue(index)
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          layout: {
            padding: {
              right: 50
            }
          }
        },
        plugins: [
          {
            afterDraw: (chart) => {
              let ctx = chart.ctx
              chart.data.datasets.forEach((dataset, i) => {
                let meta = chart.getDatasetMeta(i)
                meta.data.forEach((point, index) => {
                  let data = dataset.data[index]
                  ctx.fillStyle = '#666'
                  let formattedTime = this.formatToHours(data)
                  ctx.fillText(formattedTime, chart.chartArea.right + 10, point.y + 3)
                })
              })
            }
          }
        ]
      })
    },
    formatToHours(timestamp) {
      let date = new Date(timestamp)
      let hours = date.getHours()
      let minutes = date.getMinutes()
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
    }
  }
}
</script>
