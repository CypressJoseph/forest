import React, { useState } from "react";
import { Spec } from "../Models";
import { GroupView } from "./GroupView";
import StatusBug from "./StatusBug";

type Props = { spec: Spec }
export const SpecView: React.FC<Props> = (props: Props) => {
    const [toggle, setToggle] = useState(true);
    let { spec } = props;
    let { groups } = spec;
    return <div className="Spec">
        <div className="Spec__meta Row">
            <span
                className="Spec__name"
                data-testid="spec.name"
                onClick={() => setToggle(!toggle)}
            >
                {spec.name}
            </span>
            <StatusBug status={spec.status} />
        </div>
        {toggle && <div className="Spec__groups">
            <ul>
                {groups.map(group => <li key={group.id}>
                    <GroupView group={group} />
                </li>)}
            </ul>
        </div>}
    </div>;
}