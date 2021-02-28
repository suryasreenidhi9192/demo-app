import React from 'react'

import './ListMenu.scss'

const ListMenu = ({
    data,
    orientation = 'vertical'
}) => {

    return (

        <div className="list-menu">

            { !!data && data.map((item, i) => {

                const { className, label, onClick, value } = item

                return (

                    <>

                        { orientation === 'vertical' &&
                            <dl className={ className } key={ i } onClick={ onClick }>
                                <dt className="label">{ label }</dt>
                                <dd className="value">{ value }</dd>
                            </dl>
                        }

                        { orientation === 'horizontal' &&
                            <ol className={ className } key={ i } onClick={ onClick }>
                                <li className="label">{ label }</li>
                                <li className="spacer" />
                                <li className="value">
                                    { value }
                                </li>
                            </ol>
                        }

                    </>

                )

            }) }

        </div>

    )

}


export default ListMenu
