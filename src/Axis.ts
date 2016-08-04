import * as d3 from 'd3'

export enum AxisType {
    X,
    Y
}

export default class Axis {
    constructor(public type: AxisType = AxisType.X) {}

    static getXAxis(labels: string[] = [], xScale: any) {
        return d3.svg
                 .axis()
                 .scale(xScale)
                 .orient('bottom')
                 .tickSize(1)
                 .tickFormat((item) => {
                     const index = item.charCodeAt() - 65

                     return labels[index]
                 })
    }

    static getYAxis(yScale: any) {
        return d3.svg
                 .axis()
                 .tickFormat('')
                 .scale(yScale)
                 .tickSize(1)
                 .orient('left')
    }

    draw(chart: d3.Selection<any>, scale: any, width: number, height: number, labels: string[] = [], yAxisName?: string) {
        switch (this.type) {
            case AxisType.X:
                this.drawXAxis(chart, scale, width, height, labels)
                break
            case AxisType.Y:
                this.drawYAxis(chart, scale, yAxisName)
                break
        }
    }

    private drawXAxis(chart: d3.Selection<any>, xScale: any, width: number, height: number, labels: string[] = []) {
        let xAxis = Axis.getXAxis(labels, xScale)

        chart.append('g')
             .attr('transform', `translate(0, ${height - 30})`)
             .attr('fill', '#4D546B')
             .call(xAxis)

        const id = Date.now()

        chart.append('circle')
             .attr('id', id)
             .attr('transform', `translate(${width - 4}, ${height - 30})`)
             .attr('fill', '#4D546B')
             .attr('r', 4)

        chart.attr('marker-end', `url(#${id})`)
    }

    private drawYAxis(chart: d3.Selection<any>, yScale: any, name: string) {
        let yAxis = Axis.getYAxis(yScale)

        chart.append('g')
          .attr('transform', `translate(31, 110)`)
          .attr('fill', '#4D546B')
          .call(yAxis)
          .append('text')
          .attr('class', 'label')
          .attr('y', -30)
          .attr('x', -10)
          .attr('dy', '.71em')
          .attr('dx', '.71em')
          .style('text-anchor', 'middle')
          .text(name)

        const id = Date.now()

        chart.append('circle')
             .attr('id', id)
             .attr('transform', `translate(31, 110)`)
             .attr('fill', '#4D546B')
             .attr('r', 4)

        chart.attr('marker-end', `url(#${id})`)
    }

}
