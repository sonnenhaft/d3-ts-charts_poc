import * as d3 from 'd3'

export default class ValueShape {
    shape: d3.Selection<any>

    private length: number
    private margin: number = 0

    constructor(public value: number | string, xScale: any) {
        let element = document.createElementNS(d3.ns.prefix['svg'], 'g')

        this.length = xScale.rangeBand() * 0.3
        this.margin = xScale.rangeBand() * 0.35
        this.shape = d3.select(element).call((items) => this.drawBorder(items))
                                       .call((items) => this.drawText(items))
    }

    private drawBorder(items: d3.Selection<any>) {
        let {margin, length} = this

        items.each(function() {
            d3.select(this)
              .append('rect')
              .attr('x', margin)
              .attr('y', -80)
              .attr('height', length)
              .attr('width', length)
              .attr('rx', 5)
              .attr('ry', 5)
              .style('stroke', '#000')
              .style('fill', '#fff')
              .style('stroke-width', '2px')
        })
    }

    private drawText(items: d3.Selection<any>) {
        let {margin, length, value} = this

        items.each(function() {
            d3.select(this)
              .append('text')
              .attr('x', margin + length / 2)
              .attr('y', -54)
              .attr('text-anchor', 'middle')
              .style('font-size', '22px')
              .style('font-weight', 'bold')
              .text(value)
        })
    }

}
