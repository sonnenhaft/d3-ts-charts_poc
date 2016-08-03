import * as d3 from 'd3'

export enum AxisType {
    X,
    Y
}

export default class Axis {
    constructor(public type: AxisType = AxisType.X) {}

    static getXAxis(xScale: any) {
        return d3.svg
                 .axis()
                 .scale(xScale)
                 .tickSize(1)
                 .orient('bottom')
    }

    static getYAxis(yScale: any) {
        return d3.svg
                 .axis()
                 .tickFormat('')
                 .scale(yScale)
                 .tickSize(1)
                 .orient('left')
    }

    draw(chart: d3.Selection<any>, scale: any, width: number, height: number) {
        switch (this.type) {
            case AxisType.X:
                this.drawXAxis(chart, scale, width, height)
                break
            case AxisType.Y:
                this.drawYAxis(chart, scale)
                break
        }
    }

    private drawXAxis(chart: d3.Selection<any>, xScale: any, width: number, height: number) {
            chart.append('g')
              .attr('transform', `translate(0, ${height - 30})`)
              .call(Axis.getXAxis(xScale))

            const id = Date.now()

            chart.append('circle')
                 .attr('id', id)
                 .attr('transform', `translate(${width - 4}, ${height - 30})`)
                 .attr('r', 4)

            chart.attr('marker-end', `url(#${id})`)
    }

    private drawYAxis(chart: d3.Selection<any>, yScale: any) {
        chart.append('g')
          .attr('transform', `translate(31, 10)`)
          .call(Axis.getYAxis(yScale))

        const id = Date.now()

        chart.append('circle')
             .attr('id', id)
             .attr('transform', `translate(31, 10)`)
             .attr('r', 4)

        chart.attr('marker-end', `url(#${id})`)
    }

}
