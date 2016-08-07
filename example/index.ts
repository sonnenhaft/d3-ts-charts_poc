import Chart from '../src/Chart'
import CustomBarChart from "../src/CustomBarChart";

window.onload = () => {
    let element: HTMLElement = document.getElementById('example')
    let optionsChart1 = {
        header: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        labels: ['test'],
        dataset: [4],
        alternative: [3],
        showValue: true,
        yAxisName: 'Test Test'
    }

    let optionsChart2 = {
        header: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        labels: ['test', 'lorem ipsum'],
        dataset: [4, 2],
        alternative: [3, 1],
        showValue: true,
        yAxisName: 'Test Test'
    }

    let optionsChart3 = {
        header: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        labels: ['test', 'lorem ipsum', 'c', 'example', 'test', 'lorem ipsum', 'c', 'example'],
        dataset: [1, 2, 10, 4, 1, 2, 10, 4],
        showValue: true,
        yAxisName: 'Test Test'
    }

    // new Chart.Bar(element, optionsChart1)
    // new Chart.Bar(element, optionsChart2)
    // new Chart.Bar(element, optionsChart3)

    function getShuffledData() {
        return d3.shuffle([1, 2, 10, 4, 1, 2, 10, 4, 15, 20, -10]);
    }

    let customChartData = {
        header: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        labels: ['John Doe', 'Jenny Doe', 'Jorge Jo', 'Gin Gray', 'Lana Del', 'Lorem Ipsum', 'Lorem Ipsum', 'King Larry', 'Potter Harry', 'Vladimir Putin', 'Barak Obama' ],
        dataset: getShuffledData(),
        showValue: true,
        yAxisName: 'Test Test'
    };

    var x = new CustomBarChart(element, customChartData);
    window.setInterval(()=> {
        x.update(getShuffledData())
    }, 1000);
}
