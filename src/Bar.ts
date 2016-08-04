import * as d3 from 'd3'
import ValueShape from './Value'

export interface BarShapeOptions {
    showValue?: boolean
    color?: string
}

export default class BarShape {
    shape: d3.Selection<any>
    value: d3.Selection<any>

    constructor(data: number, index: number, xScale: any, yScale: any, options?: BarShapeOptions) {
        let element = document.createElementNS(d3.ns.prefix['svg'], 'g')

        this.shape = d3.select(element)
                       .attr('class', 'bar')
                       .attr('transform', () => {
                           return `translate(${xScale(String.fromCharCode(index + 65))}, ${yScale(data) + 70})`
                       })
                       .attr('fill', () => {
                           return options.color || '#e261cb'
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
                let element = new ValueShape(data, xScale, options)

                return element.shape.node()
            })
        }
    }

    static draw(chart: d3.selection.Enter<number>, dataset: number[], xScale: any, yScale: any, options?: BarShapeOptions) {
        chart.append((datum, index) => {
                 options.color = '#e261cb'

                 if (dataset.length === 2 && index === 1) {
                     options.color = '#36a1ce'
                 }

                 if (dataset.length > 2) {
                     options.color = '#9c76bf'
                 }

                 let bar = new BarShape(datum, index, xScale, yScale, options)

                return bar.shape.node()
             })
    }
}
