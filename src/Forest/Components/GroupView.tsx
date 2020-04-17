import React, { useState } from "react";
import { Group } from "../Models";
import { LeafView } from "./LeafView";
import StatusBug from "./StatusBug";
import { isDescribeNode, InterfaceNode, isAssertNode } from "@packages/tr-common";

const NodeView: React.FC<InterfaceNode> = (props) => {
    let node = props;
    if (isDescribeNode(node)) {
        return <GroupView group={node} />
    } else {
        if (isAssertNode(node)) { //} || isHookNode(node)) {
            return <LeafView leaf={node} />
        }
    }
    return <>unknown node type: {node.kind}</>;
}

type Props = { group: Group }
export const GroupView: React.FC<Props> = (props: Props) => {
    const [toggle, setToggle] = useState(true);
    let { group } = props;
    let { children } = group;
    return <div className="Group">
        <div
          className="Group__meta Row"
          onClick={() => setToggle(!toggle)}
        >
            <span
                data-testid="group.name"
            >
                {group.label}
            </span>
            {/* <StatusBug status={group.status} /> */}
        </div>
        {toggle && <ul>
            {children.map(node => <li key={node.id}>
                <NodeView {...node} />
                
            </li>)}
        </ul>}
    </div>;
}
