import React, { useState } from "react";
import { Spec } from "../Models";
import { GroupView } from "./GroupView";
import StatusBug from "./StatusBug";
import { isDescribeNode } from "@packages/tr-common";

type Props = { spec: Spec }
export const SpecView: React.FC<Props> = (props: Props) => {
    const [toggle, setToggle] = useState(true);
    let { spec } = props;
    let { children } = spec;
    return <div className="Spec">
        <div className="Spec__meta Row">
            <span
                className="Spec__name"
                data-testid="spec.name"
                onClick={() => setToggle(!toggle)}
            >
                {spec.filePath}
            </span>
            {/* <StatusBug status={spec.status} /> -- todo infer? */}
        </div>
        {toggle && <div className="Spec__groups">
            <ul>
                {children.map(group => <li key={group.id}>
                    {isDescribeNode(group) && <GroupView group={group} />}
                </li>)}
            </ul>
        </div>
    }
    </div>;
}