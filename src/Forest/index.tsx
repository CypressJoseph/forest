import React from "react";
import { TestTreeView } from "./Components/TestTreeView";
import { initialState, State } from "./Controller";
// import { Project, ForestEvent } from "./Models";
// import { initialState, fakeEvents, update, State } from "./Controller";

// let eventStream: ForestEvent[] = fakeEvents.reverse()

/**
 * Forest 'floor' is the app frame.
 */
export default class Forest extends React.Component<{}, State> {
    state = initialState

    // advance() {
    //     let event: ForestEvent | undefined = this.nextEvent
    //     if (event) {
    //         let nextState: State = update(this.state, event)
    //         this.setState(nextState)
    //     }
    // }

    // get nextEvent(): ForestEvent | undefined { return eventStream.pop() }

    render() {
        let { project } = this.state;
        return <div className="Forest">
            {project && <TestTreeView project={project} />}
            {/* <button onClick={()=>this.retreat()}>back</button> */}
            {/* <button onClick={()=>this.advance()}>forward</button> */}
        </div>;
    }
}