import Chart from '../src/Chart'

window.onload = () => {
    let element: HTMLElement = document.getElementById('example')
    let options = {
        header: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
        labels: ['test', 'lorem ipsum', 'c', 'example'],
        dataset: [1, 2, 10, 4],
        showValue: true,
        yAxisName: 'Test Test'
    }

    new Chart.Bar(element, options)
}
