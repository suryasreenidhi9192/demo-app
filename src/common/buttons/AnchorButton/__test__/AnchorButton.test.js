import React from 'react'
import { mount } from 'enzyme';
import { matchSnapshot, testComponentOnClick } from '../../../../../__test__/__utils__'

import AnchorButton from '../'

const props = {
    onClick: jest.fn(),
    children: (<span>Click Here, Ron ;)</span>)
}

const underlineProps = {
    ...props,
    underline: true
}

const disabledProps = {
    ...props,
    disabled: true
}

const testClickEventMethodTruthiness = eventMethodName => () => {
    const click = (event) => {
        expect(event[eventMethodName]()).toBe(true)
    }
    const clickTestLinkData = { onClick: click, ...props }
    const clickTestNavItem = mount(
        <AnchorButton { ...clickTestLinkData } />
    )
    clickTestNavItem.simulate('click')
}

describe('AnchorButton:.......................SnapShot Testing:', () => {
    test(
        'Default AnchorButton Matches jest snapshot',
        matchSnapshot(AnchorButton, props)
    )
    test(
        'Underlined AnchorButton Matches jest snapshot',
        matchSnapshot(AnchorButton, underlineProps)
    )
    test(
        'Disabled AnchorButton Matches jest snapshot',
        matchSnapshot(AnchorButton, disabledProps)
    )
})

describe('AnchorButton:.......................Event Handling:', () => {
    test(
        'Clicking AnchorButton fires the handler',
        testComponentOnClick(AnchorButton, props)
    )
    test(
        'Clicking AnchorButton fires the handler with default prevented',
        testClickEventMethodTruthiness('isDefaultPrevented')
    )

})
