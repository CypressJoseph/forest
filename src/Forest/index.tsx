import React from "react";
import { TestTreeView } from "./Components/TestTreeView";
import { initialState, State } from "./Controller";
import { SidebarRow } from "./Models";
// import { Project, ForestEvent } from "./Models";
// import { initialState, fakeEvents, update, State } from "./Controller";

// let eventStream: ForestEvent[] = fakeEvents.reverse()

type RowMeta = { toggle: boolean, isLeaf: boolean, index: number }
const Row = ({ data, onClick }: { data: SidebarRow & RowMeta, onClick: Function }) => {
    let { kind, nesting, toggle, isLeaf } = data
    let isNested = nesting > 1
    return <div className="SidebarRow" onClick={()=>onClick(data)}>
        <span data-test-id='SidebarRow__kind'>
            {isLeaf ? '' : (toggle ? "+" : "-")}
            {isNested ? '|' : ''}
            {((isNested ? '>' : '') + kind).padStart(data.kind.length + data.nesting - 1, '-')}
        </span>
        &nbsp;&nbsp;
        <span data-test-id='SidebarRow__nesting'>
            <small>[depth: {nesting}]</small>
        </span>
    </div>
}


type ForestState = {
    rowMeta: RowMeta[]
}
/**
 * Forest 'floor' is the app frame.
 */
export default class Forest extends React.Component<{}, State & ForestState> {
    state = { 
        ...initialState,
        rowMeta: Forest.analyzeRows(initialState),
    }

    static analyzeRows(state: State): RowMeta[] {
        let { rows } = state
        let meta: RowMeta[] = []
        // return []
        rows.forEach((row, index) => {
            // if (skipping) {
            //     if (row.nesting > skipDepth) { return } // next plz
            //     skipping = false
            // }
            let metadata: RowMeta = meta[index] || { toggle: true, isLeaf: true, index }
            // let augmented = { ...row, ...metadata }
            // if (metadata.toggle) {
            //     skipping = true
            //     skipDepth = row.nesting
            // }
            // we are a leaf if...
            metadata.isLeaf = rows.length == index+1 // we are done, or...
                            || rows[index+1].nesting <= row.nesting // next row is less than or eqlly nested

            metadata.index = index;

            meta[index ] = metadata
        })

        return meta
    }

    // advance() {
    //     let event: ForestEvent | undefined = this.nextEvent
    //     if (event) {
    //         let nextState: State = update(this.state, event)
    //         this.setState(nextState)
    //     }
    // }

    // get nextEvent(): ForestEvent | undefined { return eventStream.pop() }

    render() {
        // let { project } = this.state;
        let { rows, rowMeta } = this.state;

        // okay, REALLY what we want:
        // step through each index
        // IF we are toggled off, skip until the same nesting depth again...

        let skipping = false
        let skipDepth = -1
        let elements: JSX.Element[] = []
        rows.forEach((row, index) => {
            if (skipping) {
                if (row.nesting > skipDepth) { return } // next plz
                skipping = false
            }
            let metadata: RowMeta = rowMeta[index] // || { toggle: true, isLeaf: true, index }
            let augmented = { ...row, ...metadata }
            if (metadata.toggle) {
                skipping = true
                skipDepth = row.nesting
            }

            // // we are a leaf if...
            // augmented.isLeaf = rows.length == index+1 // we are done, or...
            //                 || rows[index+1].nesting <= row.nesting // next row is less than or eqlly nested

            // augmented.index = index;

            elements.push(
                <Row
                    key={index}
                    data={augmented}
                    onClick={()=>{
                        console.log("CLICK ROW", augmented)
                        console.log("META", rowMeta)
                        // console.log("INDE", rowMeta)
                        let meta: RowMeta = rowMeta[augmented.index]
                        meta.toggle = !meta.toggle
                        // rowMeta[index].toggle = !rowMeta[index].toggle
                        this.setState({ rowMeta })
                    }}
                />
            )
        })

        // let elements = rows.map((row,index) => {
        //     let metadata: RowMeta = rowMeta[index]
        //     let augmented = { ...row, ...metadata }
        //     return <Row key={row.id} data={augmented} />
        // })

        return <div className="Forest">
            {elements}
            {/* {project && <TestTreeView project={project} />} */}
            {/* <button onClick={()=>this.retreat()}>back</button> */}
            {/* <button onClick={()=>this.advance()}>forward</button> */}
        </div>;
    }
}