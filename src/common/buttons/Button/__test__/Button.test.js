import React from 'react'
// import { mount } from 'enzyme';
import { matchSnapshot, testComponentOnClick, snapshotIsMissingSelector } from '../../../../../__test__/__utils__'

import Button from '../'

const props = {
    onClick: jest.fn(),
    children: (<span>Click Here, Ron ;)</span>),
    type: 'submit',
    disabled: false
}

const disabledProps = {
    ...props,
    disabled: true
}

const customProps = {
    ...props,
    size: 'arbitrary',
    display: 'arbitrary'
}


describe('Button:.......................SnapShot Testing:', () => {
    test(
        'Button Matches jest snapshot',
        matchSnapshot(Button, props)
    )
    test(
        'Disabled Button Matches jest snapshot',
        matchSnapshot(Button, disabledProps)
    )
    test(
        'Button with custom size props doesn\'t match default',
        snapshotIsMissingSelector(Button, customProps, '.normal')
    )
    test(
        'Button with custom display props doesn\'t match default',
        snapshotIsMissingSelector(Button, customProps, '.primary')
    )
})

describe('Button:.......................Event Handling:', () => {
    test(
        'Clicking Button fires the handler',
        testComponentOnClick(Button, props)
    )
})
