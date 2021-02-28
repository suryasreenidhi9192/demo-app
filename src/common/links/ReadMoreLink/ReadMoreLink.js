import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AnchorButton } from '../../../common'

/**
 * @public
 * ReadMore link allows designers to hide bulk content
 * @param {String}      params.text         Text that has to be rendered
 * @param {Number}      params.maxLength    Max length of string before masking text (read more...)
*/

const ReadMoreLink = ({
    text = '',
    maxLength = 1000
}) => {

    const [isTruncated, setIsTruncated] = useState(true)

    const checkTextLength = text.length > maxLength

    const resultString = isTruncated ? text.slice(0, maxLength) : text


    return (

        <section className="read-more">

            <div>

                { resultString }

                { checkTextLength &&

                    <AnchorButton
                        onClick={ () => setIsTruncated(!isTruncated) }
                    >
                        { isTruncated ? ' read more...' : ' see less... ' }
                    </AnchorButton>

                }

            </div>

        </section>

    )

}

ReadMoreLink.prototype = {
    /** Text that has to be rendered */
    text: PropTypes.string,
    /** Max length of string before masking text (read more...) */
    maxLength: PropTypes.number
}

export default ReadMoreLink
