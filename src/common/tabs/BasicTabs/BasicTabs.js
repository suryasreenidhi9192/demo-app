import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
// import autoBind from 'utils/auto-bind'

// import { NoData } from 'app/Messages'

import { AlertInline, LoaderInline } from '../../../common'
import { curryWithPreventDefault } from '../../shared/utils/events'

import './BasicTabs.scss'

/**
 * @public
 * Creates a Tab navigation to show and hide multiple children
 * @param {String}        params.selectedTab - [before|after|undefined]
 * @param {String}        params.className - [before|after|undefined]
 * @param {String}        params.loadingMessage - [before|after|undefined]
 * @param {String}        params.errorMessage - [before|after|undefined]
 * @param {Node}          params.children - [before|after|undefined]
*/
class BasicTabs extends Component {

    constructor(props) {
        super(props)
        // // autoBind.react(this)
        const { selectedTab } = props
        this.state = {
            selectedTab
        }
    }

    setSelected(name) {

        const { onTabChange } = this.props

        return () => {
            if (!!onTabChange) onTabChange(name)
            return this.setState({ selectedTab: name })
        }

    }

    getStageInfo() {

        const { loadingMessage = null, errorMessage = null, hasNoData = false } = this.props
        const stageInfo = { showLoader: false, showError: false, showNoData: false, showSuccess: false }

        if (loadingMessage !== null) return { ...stageInfo, showLoader: true }
        if (errorMessage !== null) return { ...stageInfo, showError: true }
        if (hasNoData) return { ...stageInfo, showNoData: true }
        return { ...stageInfo, showSuccess: true }

    }

    render() {

        const { selectedTab } = this.state

        const { className = '', children, disabled, loadingMessage = null, errorMessage = null } = this.props

        const { showLoader, showError, showNoData, showSuccess } = this.getStageInfo()

        const childrenArray = Children.count(children) < 2 ? Children.toArray(children) : children

        const classList = ['tabs']
        if (className) classList.push(className)
        if (disabled || !showSuccess) classList.push('is-disabled')
        const cls = classList.join(' ')

        const contentClassList = ['tab-content']
        if (showLoader) contentClassList.push('is-loading')
        const contentCls = contentClassList.join(' ')

        const child = childrenArray.filter((item) => {
            return (item.props.name === selectedTab)
        })

        return (

            <div className={ cls }>

                <div className="tab-labels">

                    { childrenArray.map((o) => {

                        const { props: { label, name } } = o

                        const isSelected = (selectedTab === name)

                        const selClass = isSelected ? 'selected' : ''
                        const tabClass = `tab-label ${selClass}`

                        return (
                            <a
                                aria-selected={ isSelected }
                                className={ tabClass }
                                href="#"
                                key={ name }
                                onClick={ curryWithPreventDefault(this.setSelected(name)) }
                                role="tab"
                                tabIndex="0"
                            >
                                {label}
                            </a>
                        )
                    }
                    )}

                </div>

                <div className={ contentCls }>

                    { showLoader && <LoaderInline message={ loadingMessage } /> }

                    { showError && <AlertInline>{ errorMessage }</AlertInline> }

                    { showNoData && <h1>No Data</h1> }

                    { showSuccess && child }

                </div>

            </div>

        )
    }
}

BasicTabs.propTypes = {
    /* String matching the `name` of the tab to select.
    Without this value no tab content will appear until the user interacts. */
    selectedTab: PropTypes.string,
    /** React Component or string to render in the body */
    children: PropTypes.node,
    /* Typical React `className` prop */
    className: PropTypes.string,
    /* String loading message to display.  if null, do not display loader. */
    loadingMessage: PropTypes.string,
    /* String error message to display.  if null, do not display error. */
    errorMessage: PropTypes.string
}

export default BasicTabs
