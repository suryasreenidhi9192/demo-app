// import { formatCurrency, formatNumber, formatPercentageFromInt } from 'utils'

export const bringToFront = (elementIndex, elements) => {

    const rearranged = [...elements]
    const element = rearranged.splice(elementIndex, 1)

    return rearranged.concat(element)

}

export const getChartExtremes = ({ lines, minTopValue }) => {

    const flatValues = []
    let xSize = 0
    let hasDataGap = false

    lines.forEach(line => {
        const lineSize = line.data.length - 1

        if (lineSize > xSize) xSize = lineSize
        line.data.forEach((point, index) => {
            const first = index === 0
            const last = index === lineSize
            const previous = line.data[!first ? index - 1 : 0].value
            const next = line.data[!last ? index + 1 : index].value

            if (point.value === null) {
                if ((index !== 0 && previous !== null) && (index !== lineSize && next !== null)) hasDataGap = true
            } else { flatValues.push(point.value) }
        })
    })

    const maxValue = Math.max(...flatValues)
    const minValue = Math.min(...flatValues)

    const maxLength = Math.ceil(maxValue).toString().replace('-', '').length
    const minLength = Math.ceil(minValue).toString().replace('-', '').length

    const maxNthPower = maxLength - 2 < 0 ? 0 : maxLength - 2
    const minNthPower = minLength - 2 < 0 ? 0 : minLength - 2

    const maxInterval = 10 ** maxNthPower
    const minInterval = 10 ** minNthPower

    const guideInterval = maxInterval > minInterval ? maxInterval : minInterval

    const roundedMax = (Math.ceil(maxValue / guideInterval) * guideInterval)
    const roundedMin = (Math.floor(minValue / guideInterval) * guideInterval)

    const max = {
        x: xSize,
        y: roundedMax < minTopValue ? minTopValue : roundedMax
    }

    const min = {
        x: 0,
        y: roundedMin > 0 ? 0 : roundedMin
    }

    return { max, min, hasDataGap }

}

export const getLeftPadding = ({ fontSize, horizontalGuides, maxY, sidePadding }) => {

    if (horizontalGuides === 0) return sidePadding
    const digits = maxY.replace(/,|\./g, '').length + 2

    return digits * (fontSize * 0.67)

}

export const formatData = (data, dataType) => {
    const lines = data[0] && data[0].data ? data : [{ data }]

    if (dataType !== 'percent') return lines

    return lines.map(line => ({
        ...line,
        data: line.data.map(point => ({ ...point, value: point.value ? point.value * 100 : null }))
    }))
}
