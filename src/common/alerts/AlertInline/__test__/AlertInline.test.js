import React from 'react'
import { mount } from 'enzyme';
import { matchSnapshot } from '../../../../../__test__/__utils__'

import AlertInline from '../'

const props = {
    children: (<b>This is some copy for the body of the AlertInline</b>)
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

const checkDefaultType = () => {
    expect(mount(
        <AlertInline { ...props } />
    ).find('.error').exists()).toBe(true)
}

describe('AlertInline:.......................SnapShot Testing:', () => {
    test(
        'Error AlertInline Matches jest snapshot',
        matchSnapshot(AlertInline, errorProps)
    )
    test(
        'Success AlertInline Matches jest snapshot',
        matchSnapshot(AlertInline, successProps)
    )
    test(
        'Warning AlertInline Matches jest snapshot',
        matchSnapshot(AlertInline, warningProps)
    )
    test(
        'Info AlertInline Matches jest snapshot',
        matchSnapshot(AlertInline, infoProps)
    )
})

describe('AlertInline:.......................Prop Rendering Logic:', () => {
    test(
        'Error AlertInline is the default value',
        checkDefaultType
    )
})
