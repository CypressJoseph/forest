import React, { useState } from "react";
import { Group } from "../Models";
import { LeafView } from "./LeafView";
import StatusBug from "./StatusBug";
type Props = { group: Group }

export const GroupView: React.FC<Props> = (props: Props) => {
    const [toggle, setToggle] = useState(true);
    let { group } = props;
    let { nodes } = group;
    return <div className="Group">
        <div
          className="Group__meta Row"
          onClick={() => setToggle(!toggle)}
        >
            <span
                data-testid="group.name"
            >
                {group.name}
            </span>
            <StatusBug status={group.status} />
        </div>
        {toggle && <ul>
            {nodes.map(node => <li key={node.id}>
                {node instanceof Group
                    ? <GroupView group={node} />
                    : <LeafView leaf={node} />}

            </li>)}
        </ul>}
    </div>;
}
