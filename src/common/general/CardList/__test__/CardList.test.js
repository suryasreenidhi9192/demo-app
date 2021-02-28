import {
    matchSnapshot,
    snapshotIsMissingSelector,
    snapshotIsMissingSelectorContent
} from '../../../../../__test__/__utils__'

import CardList from '../'

const props = {
    listData: [
        {
            header: 'header 1',
            body: 'body 1'
        },
        {
            header: 'header 2',
            body: 'body 2'
        }
    ]
}

const emptyProps = {
    listData: []
}

const headerlessProps = {
    listData: [
        {
            body: 'body 1'
        },
        {
            body: 'body 2'
        }
    ]
}


describe('CardList:.......................SnapShot Testing:', () => {
    test(
        'CardList Matches jest snapshot',
        matchSnapshot(CardList, props)
    )
    test(
        'Empty CardList Matches jest snapshot',
        matchSnapshot(CardList, emptyProps)
    )
    test(
        'CardList with no contents is missing list items',
        snapshotIsMissingSelector(CardList, emptyProps, '.card:not(.empty-card)')
    )
    test(
        'CardList with cards missing headers have empty headers',
        snapshotIsMissingSelectorContent(CardList, headerlessProps, '.header')
    )
})

