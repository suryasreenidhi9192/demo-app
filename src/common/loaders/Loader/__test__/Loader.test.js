import {
    matchSnapshot
} from '../../../../../__test__/__utils__'

import Loader from '../index'

const props = {
    isLoading: true
}

const loadedProps = {
    isLoading: false
}

describe('Loader:.......................SnapShot Testing:', () => {
    test(
        'Loader Matches jest snapshot',
        matchSnapshot(Loader, props)
    )
    test(
        'Loader Doesn\'t appear if content loaded',
        matchSnapshot(Loader, loadedProps)
    )
})

