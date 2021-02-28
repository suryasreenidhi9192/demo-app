import React from 'react'
import PropTypes from 'prop-types'
import './AdherenceBars.scss'
import { AnchorButton } from '../../../common'
// import { formatPercentage, formatNumber } from 'utils'
// import { ADHERENCE_DISEASE_STATE_CHART_COLORS } from 'app/Outcome/OutcomeHome/shared/constants'

const AdherenceBars = ({ data, onViewDetails }) => {

    const handleViewDetails = (diseaseStateCode, ruleId) => event => {
        event.stopPropagation()
        if (onViewDetails) onViewDetails(diseaseStateCode, ruleId)
    }

    return (
        <div className="adherence-bars">
            { data.map((item, index) => {
                const {
                    code,
                    description,
                    adherent,
                    adherentPercentage,
                    nonAdherent,
                    nonAdherentPercentage
                } = item

                const adherentNumber = adherent
                const adherentPercent = adherentPercentage
                const nonAdherentNumber = nonAdherent
                const nonAdherentPercent = nonAdherentPercentage
                const color = code
                const adherentStyles = { width: adherentPercent, backgroundColor: color }
                const nonAdherentStyles = { width: nonAdherentPercent, backgroundColor: color }

                return (
                    <section className={ code.toLowerCase() } key={ code }>
                        <table>
                            <thead>
                                <tr>
                                    <th className="description">{ description }</th>
                                    <th>{ index === 0 ? 'Pop.' : '' }</th>
                                    <th>{ index === 0 ? '%' : '' }</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="adherent">
                                    <td className="bar-container">
                                        <div className="bar">
                                            <div className="percent" style={ adherentStyles } />
                                        </div>
                                    </td>
                                    <td>
                                        <AnchorButton onClick={ handleViewDetails(code, 'ADHRP') }>
                                            { adherentNumber }
                                        </AnchorButton>
                                    </td>
                                    <td>{ adherentPercent }</td>
                                </tr>
                                <tr className="non-adherent">
                                    <td className="bar-container">
                                        <div className="bar">
                                            <div className="percent" style={ nonAdherentStyles } />
                                        </div>
                                    </td>
                                    <td>
                                        <AnchorButton onClick={ handleViewDetails(code, 'NADHP') }>
                                            { nonAdherentNumber }
                                        </AnchorButton>
                                    </td>
                                    <td>{ nonAdherentPercent }</td>
                                </tr>
                            </tbody>
                        </table>
                        { (index !== data.length - 1) && <hr /> }
                    </section>
                )
            })}
        </div>
    )

}

AdherenceBars.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.any,
            description: PropTypes.string,
            adherent: PropTypes.node,
            adherentPercent: PropTypes.node,
            nonAdherent: PropTypes.node,
            nonAdherentPercent: PropTypes.node
        })
    ),
    onViewDetails: PropTypes.func
}

export default AdherenceBars
