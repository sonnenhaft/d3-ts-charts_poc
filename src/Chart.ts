import Options from './Options'
import Scale from './Scale'
import BarShape from './Bar'
import Axis, {AxisType} from './Axis'
import * as d3 from 'd3'

namespace Chart {
    export class Bar {
        xAxis = new Axis(AxisType.X)
        yAxis = new Axis(AxisType.Y)

        private width: number
        private height: number

        constructor(element: HTMLElement, public options: Options) {
            this.width = element.clientWidth
            this.height = element.clientHeight || this.width / 3
            this.options = options
            let chart = this.create(element)

            this.xAxis.draw(chart, this.xScale, this.width, this.height, this.options.labels)
            this.yAxis.draw(chart, this.yScale, this.width, this.height, [], options.yAxisName)
            this.draw(chart)
        }

        private get yScale() {
            return Scale.getYScale(this.options.dataset, this.height)
        }

        private get xScale() {
            return Scale.getXScale(this.options.dataset, this.width)
        }

        private create(element: HTMLElement) {
            return d3.select(element)
                     .append('svg')
                     .attr('preserveAspectRatio', 'xMidYMid meet')
                     .attr('viewBox', `0 0 ${this.width + 50} ${this.height + 50}`)
                     .style('background-color', '#f3f4f5')
                     .append('g')
                     .attr('transform', 'translate(25, 25)')
        }

        private draw(chart: d3.Selection<any>) {
            const {showValue, dataset, header} = this.options

            chart.append('text')
                 .attr('x', 5)
                 .attr('y', 25)
                 .attr('text-anchor', 'start')
                 .style('font-size', 20)
                 .style('text-transform', 'uppercase')
                 .text(header)

            BarShape.draw(chart, dataset, this.xScale, this.yScale, { showValue })
        }
    }
}

export default Chart
