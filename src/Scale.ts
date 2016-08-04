import * as d3 from 'd3'

export default class Scale {
    static getYScale(dataset: number[], height: number, ratio: number = 1.5) {
        return d3.scale
                 .linear()
                 .domain([0, d3.max(dataset) * ratio])
                 .range([height - 100, 0])
    }

    static getXScale(dataset: number[], width: number, ratio: number = 0.4) {
        return d3.scale
                 .ordinal()
                 .domain(dataset.map((item, index) => String.fromCharCode(index + 65)))
                 .rangeBands([0, width], ratio)
    }
}
