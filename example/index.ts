import Chart from '../src/Chart'

window.onload = () => {
    let element: HTMLElement = document.getElementById('example')
    let options = {
        labels: ['test', 'lorem ipsum', 'c', 'example'],
        dataset: [1, 2, 10, 4],
        showValue: true
    }

    new Chart.Bar(element, options)
}
