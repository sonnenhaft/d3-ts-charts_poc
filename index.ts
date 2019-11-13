import CustomBarChart from './src/CustomBarChart'
import Chart from './src/Chart'
import { shuffle } from 'd3'

window.onload = () => {
  new Chart.Bar(document.getElementById('example1'), {
      header: 'Printing and typesetting industry',
      labels: ['test'],
      dataset: [4],
      alternative: [3],
      showValue: true,
      yAxisName: 'Test Test'
  })

  new Chart.Bar(document.getElementById('example2'), {
      header: 'Typesetting industry',
      labels: ['test', 'lorem ipsum'],
      dataset: [4, 2],
      alternative: [3, 1],
      showValue: true,
      yAxisName: 'Test Test'
  })

  new Chart.Bar(document.getElementById('example3'), {
      header: 'Lorem Ipsum is simply dummy text',
      labels: ['test', 'lorem ipsum', 'c', 'example', 'test', 'lorem ipsum', 'c', 'example'],
      dataset: [1, 2, 10, 4, 1, 2, 10, 4],
      showValue: true,
      yAxisName: 'Test Test'
  })

  function getShuffledData() {
    return shuffle([1, 2, 10, 4, 1, 2, 10, 4, 15, 20, -10])
  }

  const customBarChart = new CustomBarChart(document.getElementById('example4'), {
    header: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    labels: [
      'John Doe', 'Jenny Doe', 'Jorge Jo', 'Gin Gray', 'Lana Del',
      'Lorem Ipsum', 'Lorem Ipsum', 'King Larry', 'Potter Harry', 'Vladimir Putin', 'Barak Obama'
    ],
    dataset: getShuffledData(),
    showValue: true,
    yAxisName: 'Test Test'
  })

  window.setInterval(() => {
    customBarChart.update(getShuffledData())
  }, 1000)
}
