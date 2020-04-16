import React from "react";
import { TestTreeView } from "./Components/TestTreeView";
import { Project, ForestEvent } from "./Models";
import { initialState, fakeEvents, update, State } from "./Controller";

let eventStream: ForestEvent[] = fakeEvents.reverse()

/**
 * Forest 'floor' is the app frame.
 */
export default class Forest extends React.Component<{}, { suite: Project }> {
    state = initialState

    advance() {
        let event: ForestEvent | undefined = this.nextEvent
        if (event) {
            let nextState: State = update(this.state, event)
            this.setState(nextState)
        }
    }

    get nextEvent(): ForestEvent | undefined { return eventStream.pop() }

    render() {
        let { suite } = this.state;
        return <div className="Forest">
            <TestTreeView suite={suite} />
            {/* <button onClick={()=>this.retreat()}>back</button> */}
            <button onClick={()=>this.advance()}>forward</button>
        </div>;
    }
}