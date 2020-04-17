import React from "react";
import classnames from "classnames";
import { initialState, State } from "./Controller";
import { SidebarRow } from "./Models";

type RowMeta = { isUnfolded: boolean, focus: boolean, isLeaf: boolean, index: number }
const Row = ({ data, onClickToggle, onClickTitle }: {
    data: SidebarRow & RowMeta,
    onClickToggle: Function,
    onClickTitle: Function,
}) => {
    let { kind, nesting, isUnfolded, isLeaf, definition, focus } = data
    let { description } = definition
    let isNested = nesting > 1
    let cs = classnames(
        "SidebarRow",
        !isNested && "SidebarRowRoot",
        isLeaf && "SidebarRowLeaf",
        focus && "SidebarRow-focused"
    )
    return <div className={cs} onClick={()=>onClickTitle(data)}>
        <span
          className='SidebarRow__sigils'
          onClick={()=>onClickToggle(data)}
        >
            {/* {focus && '*'} */}
            {isLeaf ? '' : (isUnfolded ? "-" : "+")}
            {isNested ? '|' : ''}
            {((isNested ? '>' : '') + '').padStart(data.nesting - 1, '-')}
        </span>
        &nbsp;&nbsp;
        <span
          className='SidebarRow__desc'
        >
            {description}
        </span>
        {/* <span data-test-id='SidebarRow__nesting'>
            <small>[depth: {nesting}]</small>
        </span> */}
    </div>
}


type ForestState = {
    rowMeta: RowMeta[]
    focusedRow: number
}
/**
 * Forest 'floor' is the app frame.
 */
export default class Forest extends React.Component<{}, State & ForestState> {
    state = { 
        ...initialState,
        rowMeta: Forest.analyzeRows(initialState),
        focusedRow: -1,
    }

    static analyzeRows(state: State): RowMeta[] {
        let { rows } = state
        let meta: RowMeta[] = []
        rows.forEach((row, index) => {
            let metadata: RowMeta = meta[index] || { isUnfolded: false, isLeaf: true, index }
            metadata.isLeaf = rows.length == index + 1 // we are done, or...
                           || rows[index+1].nesting <= row.nesting // next row is less than or eqlly nested

            metadata.index = index;

            meta[index ] = metadata
        })

        return meta
    }

    render() {
        const dontRender = ['step:suite-exit' ]
        let { rows, rowMeta } = this.state;

        // step through each index
        // IF we are toggled off, skip until the same nesting depth again...
        // we may be able to reuse tree builder here and be less onerous (tl)
        let skipping = false
        let skipDepth = -1
        let elements: JSX.Element[] = []
        rows.forEach((row, index) => {
            if (skipping) {
                if (row.nesting > skipDepth) { return }
                skipping = false
            }
            let metadata: RowMeta = rowMeta[index]
            let augmented = { ...row, ...metadata }
            if (!metadata.isUnfolded) {
                skipping = true
                skipDepth = row.nesting
            }

            augmented.focus = this.state.focusedRow === index

            if (dontRender.includes(row.kind)) { return }

            elements.push(
                <Row
                    key={index}
                    data={augmented}
                    onClickToggle={()=>{
                        let meta: RowMeta = rowMeta[augmented.index]
                        meta.isUnfolded = !meta.isUnfolded
                        this.setState({ rowMeta })
                    }}
                    onClickTitle={() => {
                        // let meta: RowMeta = rowMeta[augmented.index]
                        // meta.toggle = !meta.toggle
                        if (this.state.focusedRow === index) {
                            this.setState({ focusedRow: -1 })
                        } else {
                        let meta: RowMeta = rowMeta[augmented.index]
                        meta.isUnfolded = true // !meta.toggle
                            this.setState({ rowMeta, focusedRow: index })
                        }
                    }}
                />
            )
        })

        let analyzed = rows[this.state.focusedRow] //.definition.description
        let parent = analyzed && rows.find(row => row.id === analyzed.definition.parentID)
        let parentId = parent && rows.indexOf(parent)
        return <div className="Forest">
            <div className="Tree">{elements}</div>
            <div className="Analysis">
                {analyzed ? <>
                    <h1>{analyzed.definition.description}</h1>
                    <p>
                        <b>kind:</b>
                        &nbsp;
                        {analyzed.definition.kind}
                    </p>
                    <p>
                        <b>id:</b>
                        &nbsp;
                        {analyzed.definition.id}
                    </p>
                    <p>
                        <b>parent id:</b>
                        &nbsp;
                        {analyzed.definition.parentID}
                        <button 
                        disabled={!parent}
                        onClick={() => {
                            parentId && this.setState({ focusedRow: parentId })
                        }}>visit parent</button>
                    </p>
                    <p>
                        <b>raw def:</b>
                        &nbsp;
                        <code>{JSON.stringify(analyzed.definition)}</code>
                    </p>
                </> : <p>Select a spec to analyze</p>}
            </div>
        </div>;
    }
}