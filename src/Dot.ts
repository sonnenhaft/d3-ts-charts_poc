import * as d3 from 'd3'

export default class DotShape {
    shape: d3.Selection<any>

    constructor(data: number, index: number, xScale: any, yScale: any) {
        let element = document.createElementNS(d3.ns.prefix['svg'], 'g')

        this.shape = d3.select(element)
                       .attr('transform', () => {
                           return `translate(${xScale(String.fromCharCode(index + 65)) - xScale.rangeBand() / 4}, ${yScale(data) + 70})`
                       })
                       .call(this.drawStroke.bind(this, xScale), xScale.rangeBand())
                       .call(this.drawText.bind(this, data), xScale.rangeBand())
    }

    private drawStroke(xScale: any, items: d3.Selection<any>) {
        items.each(function() {
            d3.select(this)
                .append('g')
                .attr('fill', 'none')
                .attr('stroke', '#4D546B')
                .attr('stroke-width', 2)
                .append('path')
                .attr('stroke-dasharray', '10,10')
                .attr('d', `M5 0 l${xScale.rangeBand() * 1.4} -0`)
        })
    }

    private drawText(data: number, items: d3.Selection<any>) {
        items.each(function() {
            d3.select(this)
                .append('text')
                .attr('x', -70)
                .attr('y', 5)
                .attr('text-anchor', 'start')
                .style('font-weight', 'bold')
                .text(`Usually ${data}`)
        })
    }

    static draw(chart: d3.selection.Enter<number>, dataset: number[], xScale: any, yScale: any) {
        chart.append((datum, index) => {
            let dot = new DotShape(dataset[index], index, xScale, yScale)

            return dot.shape.node()
        })
    }
}
