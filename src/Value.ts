import * as d3 from 'd3'
import {BarShapeOptions} from './Bar'

export default class ValueShape {
    shape: d3.Selection<any>

    private length: number
    private margin: number = 0

    constructor(public value: number | string, xScale: any, private options?: BarShapeOptions) {
        let element = document.createElementNS(d3.ns.prefix['svg'], 'g')

        this.length = xScale.rangeBand() * 0.3
        this.margin = xScale.rangeBand() * 0.35
        this.shape = d3.select(element).call((items) => this.drawBorder(items))
                                       .call((items) => this.drawText(items))
    }

    private drawBorder(items: d3.Selection<any>) {
        let {margin, length, options} = this

        items.each(function() {
            d3.select(this)
              .append('rect')
              .attr('x', margin)
              .attr('y', -margin)
              .attr('height', length)
              .attr('width', length)
              .attr('rx', 2)
              .attr('ry', 2)
              .style('stroke', options.color)
              .style('fill', 'fff')
              .style('stroke-width', '2px')
        })
    }

    private drawText(items: d3.Selection<any>) {
        let {margin, length, value} = this

        items.each(function() {
            d3.select(this)
              .append('text')
              .attr('x', margin + length / 2)
              .attr('y', -(margin - length / 1.4))
              .attr('text-anchor', 'middle')
              .style('font-size', length / 1.5)
              .style('font-weight', 'bold')
              .text(value)
        })
    }

}
