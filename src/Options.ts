interface Options {
    header?: string
    labels: Array<string>
    dataset: Array<number>
    tooltips?: Array<string>
    onItemClick?: () => void
    showValue?: boolean
}

export default Options;
