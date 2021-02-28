import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';

import AnchorButton from '../AnchorButton'

/**
 * @public
 * A component to create a generic back button
 * @param  {Text}    props.text     Text of the button
 * @return {Node}                   React Component
*/
const BackButton = ({ text = 'Back', history }) => (

    <div className="back-button">
        <AnchorButton onClick={ () => history.goBack() }>&lt; { text }</AnchorButton>
    </div>

)

BackButton.propTypes = {
    /** the button text */
    text: PropTypes.string
}

export default withRouter(BackButton)
