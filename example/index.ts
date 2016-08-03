import Chart from '../src/Chart'

window.onload = () => {
    let element: HTMLElement = document.getElementById('example')
    let options = {
        labels: ['a', 'b', 'c', 'd'],
        dataset: [1, 2, 10, 4],
        showValue: true
    }

    new Chart.Bar(element, options)
}
