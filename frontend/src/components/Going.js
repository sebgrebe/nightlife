import React from 'react'

const Going = ({state,place_id}) => {
    var going = 0
    Object.keys(state.listGoing).map((key) => {
        if (state.listGoing[key].place_id === place_id) {
            going += state.listGoing[key].going.length
        }
    })
    return (
        <div className="going">{going} going</div>
    )
}

export default Going