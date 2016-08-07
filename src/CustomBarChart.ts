import Options from './Options'
import Scale from './Scale'
import Axis, {AxisType} from './Axis'
import * as d3 from 'd3'
import Ordinal = d3.scale.Ordinal;
import Linear = d3.scale.Linear;

export default class CustomBarChart {
    xAxis = new Axis(AxisType.X);
    yAxis = new Axis(AxisType.Y);

    private width:number;
    private height:number;
    private xScale:any;
    private yScale:any;
    private chart:any;
    private minHeight:number;

    constructor ( element:HTMLElement, public options:Options ) {
        this.width = element.clientWidth;
        this.height = element.clientHeight || this.width / 3;
        this.options = options;
        this.chart = this.createLayout(element);

        this.xScale = Scale.getXScale(this.options.dataset, this.width)
        this.minHeight = d3.min(this.options.dataset);
        this.yScale = d3.scale.linear().domain([ d3.min(this.options.dataset), d3.max(this.options.dataset) ]).range([ this.height - 100, 0 ])


        this.update(this.options.dataset)
        this.drawYAxis(this.yScale);
        this.xAxisDraw(this.xScale, this.width, this.height, this.options.labels);
    }

    private  drawYAxis ( yScale:any ) {
        let yAxis = d3.svg.axis()
            .scale(yScale)
            .tickFormat(( value:string )=> value + '%')
            .tickSize(1)
            .orient('right')

        this.chart.append('g').attr({
            'font-size': '60%',
            transform: `translate(${this.width}, ${this.height - 100})`,
            fill: '#4D546B'
        }).call(yAxis).selectAll('line').attr({
            stroke: 'black',
            'stroke-width': 0.5,
            opacity: 0.3,
            x1: -this.width
        });
    }

    private xAxisDraw ( xScale:any, width:number, height:number, labels:string[] = [] ) {
        var splittedLabels = labels.map(( label:string )=>label.split(' '));
        let xAxis = Axis.getXAxis(splittedLabels.map(function ( l ) {return l[ 0 ]}), xScale)

        this.chart.append('g')
            .attr('transform', `translate(0, ${height - 30})`)
            .attr('fill', '#4D546B')
            .attr('font-size', '70%')
            .call(xAxis)
            .selectAll('.tick')
            .call(function ( elements:any ) {
                elements.each(function ( ignored:any, index:number ) {
                    var tick = d3.select(this);
                    tick.append('text').text(splittedLabels[ index ][ 1 ]).attr({
                        'text-anchor': 'middle',
                        dy: 25,
                    })
                    tick.selectAll('text').attr({ transform: 'translate(0, 15)' })
                })
            });
    }


    private bindData ( selector:String, data:any, attrs:any ) {
        var tagNameAndClassName = selector.split('.');
        var enteredSelection = this.chart.selectAll(selector).data(data);
        enteredSelection.enter().append(tagNameAndClassName[ 0 ]).attr(attrs).classed(tagNameAndClassName[ 1 ], true);
        enteredSelection.exit().remove();
        return enteredSelection;
    }

    private _update ( dataset:any ) {
        var xRange = this.xScale.range();
        var maxY = this.yScale.range()[ 0 ];

        var TEMPORARY_OFFSET = -20;

        this.bindData('rect.bar-shadow', dataset, {
            x: ( ignoredValue:any, index:number ) => {return xRange[ index ];},
            transform: `translate(0, ${maxY + TEMPORARY_OFFSET * 1.2})`,
            opacity: 0.1,
            fill: 'black',
            height: maxY - TEMPORARY_OFFSET * 2.4,
            width: this.xScale.rangeBand()
        });

        var color = '#36a1ce';

        this.bindData('rect.bar', dataset, {
            transform: ( value:number, index:number ) => `translate(${xRange[ index ]}, 0)`,
            opacity: 1,
            fill: color,
            width: this.xScale.rangeBand()
        }).transition().attr({
            y: ( value:number ) => maxY + (value < 0 ? 2 : 1) * this.yScale(Math.abs(value)),
            height: ( value:number ) => Math.abs(this.yScale(value) - this.yScale(0))
        });

        this.bindData('rect.bar-label-box', dataset, {
            transform: ( value:number, index:number )=>`translate(${xRange[ index ]}, ${maxY })`,
            stroke: color,
            'stroke-width': 1,
            fill: 'white',
            rx: 2,
            ry: 2,
            x: 1,
            y: TEMPORARY_OFFSET,
            height: 15,
            width: this.xScale.rangeBand() - 1
        });

        this.bindData('text.bar-label', dataset, {
            transform: ( value:number, index:number )=>`translate(${xRange[ index ] + this.xScale.rangeBand() / 2}, ${maxY + 12})`,
            dy: TEMPORARY_OFFSET,
            'font-size': '80%',
            'text-anchor': 'middle'
        }).text(( value:Number ) => value);
    }

    update ( dataset:any ) {
        this.chart.transition().duration(500).each(()=> {
            this._update(dataset);
        });
    }

    private createLayout ( element:HTMLElement ) {
        return d3.select(element)
            .append('svg')
            .attr('preserveAspectRatio', 'xMidYMid meet')
            .attr('viewBox', `0 0 ${this.width + 50} ${this.height + 50}`)
            .style('background-color', '#f3f4f5')
            .append('g')
            .attr('transform', 'translate(25, 25)')
    }
}
