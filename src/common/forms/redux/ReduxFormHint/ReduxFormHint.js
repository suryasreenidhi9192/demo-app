import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'

import { SvgNotificationHelpLight } from '../../../icons'
import { ClickScreen } from '../../../index'

import './ReduxFormHint.scss'

/**
 * OK - this needs to be restructured
 *
 * This component should be a child component of Input, not a property fron Input so we can pass Persist
 * and Type of "icon" or "link".
 * That is so we can determine whether or not we want the content inside the hint
 * to dismiss the dialog or not.
 *
 * For now just default persist to false and everything will dismiss the hint
 *
 * */

/**
 * @public
 * Creates a ReduxForms compatable checkbox input type
 * @param   {Node}     props.hint       Text or JSX to display as hint
 * @param   {Node}     props.hintLink   Text or JSX to display as hint link
*/

class ReduxFormHint extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleToggle(e) {

        const { persist = false } = this.props
        const { open } = this.state

        if (persist && e.target.id && e.target.id === 'hint-text') return
        this.setState({ open: !open })

    }

    render() {

        const { hint = '', hintLink = '' } = this.props
        const { open } = this.state

        return (

            <li className="redux-form-hint" onClick={ (e) => { this.handleToggle(e) } }>

                { !hintLink &&
                    <SvgNotificationHelpLight className="hint-icon" />
                }
                { hintLink &&
                    <div className="hint-link">{ hintLink }?</div>
                }

                { open &&
                    <Fragment>
                        <div id="hint-text" className="hint-text">{ hint }</div>
                        <ClickScreen />
                    </Fragment>
                }

            </li>

        )

    }

}

ReduxFormHint.propTypes = {
    /** Text or JSX to display as hint */
    hint: PropTypes.node, 
    /** Text or JSX to display as hint link */
    hintLink: PropTypes.node
}

export default ReduxFormHint
