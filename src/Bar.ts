import * as d3 from 'd3'
import ValueShape from './Value'

export interface BarShapeOptions {
    showValue?: boolean
}

export default class BarShape {
    shape: d3.Selection<any>
    value: d3.Selection<any>

    constructor(data: number, index: number, xScale: any, yScale: any, options?: BarShapeOptions) {
        let element = document.createElementNS(d3.ns.prefix['svg'], 'g')

        this.shape = d3.select(element)
                       .attr('class', 'bar')
                       .attr('transform', () => {
                           return `translate(${xScale(String.fromCharCode(index + 65))}, ${yScale(data) - 30})`
                       })
                       .call((items) => {
                           items.each(function() {
                               d3.select(this)
                                   .append('rect')
                                   .attr('height', () => yScale(0) - yScale(data))
                                   .attr('width', xScale.rangeBand())
                           })
                       }, xScale.rangeBand())

        if (options && options.showValue) {
            this.value = this.shape.append(() => {
                let element = new ValueShape(data, xScale)

                return element.shape.node()
            })
        }
    }

    static draw(chart: d3.Selection<any>, dataset: number[], xScale: any, yScale: any, options?: BarShapeOptions) {
        chart.selectAll('rect')
             .data(dataset)
             .enter()
             .append((datum, index) => {
                 let bar = new BarShape(datum, index, xScale, yScale, options)

                return bar.shape.node()
             })
    }
}
