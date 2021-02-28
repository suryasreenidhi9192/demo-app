import React from 'react'
import { mount } from 'enzyme';
import { matchSnapshot } from '../../../../../__test__/__utils__'

import Alert from '../'

const props = {
    retain: false,
    scroll: false,
    children: (<b>This is some copy for the body of the Alert</b>)
}

const errorProps = {
    ...props,
    type: 'error'
}

const successProps = {
    ...props,
    type: 'success'
}

const warningProps = {
    ...props,
    type: 'warning'
}

const infoProps = {
    ...props,
    type: 'info'
}

const headerProps = {
    ...props,
    header: (<h1>Heading</h1>)
}

const footerProps = {
    ...props,
    footer: (<h6>Footer</h6>)
}

const testDismiss = () => {
    const alert = mount(
        <Alert { ...props } />
    )
    alert.find('.layout li:last-child').simulate('click')
    setTimeout(() => {
        expect(alert.find('.hidden').exists()).toBe(true)
    }, 0)
}

const testRetain = () => {
    const retainProps = {
        ...props,
        retain: true
    }
    expect(mount(<Alert { ...retainProps } />).find('.close-icon').exists())
        .toBe(false)
}

const testScroll = () => {
    const scrollProps = {
        ...props,
        scroll: true
    }
    window.scrollTo = jest.fn()
    mount(<Alert { ...scrollProps } />)
    expect(window.scrollTo)
        .toHaveBeenCalled()
}

describe('Alert:.......................SnapShot Testing:', () => {
    test(
        'Error Alert Matches jest snapshot',
        matchSnapshot(Alert, errorProps)
    )
    test(
        'Success Alert Matches jest snapshot',
        matchSnapshot(Alert, successProps)
    )
    test(
        'Warning Alert Matches jest snapshot',
        matchSnapshot(Alert, warningProps)
    )
    test(
        'Info Alert Matches jest snapshot',
        matchSnapshot(Alert, infoProps)
    )
    test(
        'Alert with footer matches jest snapshot',
        matchSnapshot(Alert, footerProps)
    )
    test(
        'Alert with header matches jest snapshot',
        matchSnapshot(Alert, headerProps)
    )
})

describe('Alert:.......................Prop Rendering Logic:', () => {
    test(
        'Alert with retain prop has no dismiss button',
        testRetain
    )
    test(
        'Alert with scroll will scroll to the top',
        testScroll
    )
})

describe('Alert:.......................Event Handling:', () => {
    test(
        'Clicking the dismiss button closes the Alert',
        testDismiss
    )
})
