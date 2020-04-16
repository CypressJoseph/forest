import React, { useState } from "react";
import { Project } from "../Models";
import { SpecView } from "./SpecView";
import StatusBug from "./StatusBug";

type Props = { suite: Project }
export const SuiteView: React.FC<Props> = (props: Props) => {
    const [toggle, setToggle] = useState(true);
    // render() {
    let { suite } = props
    let { specs } = suite
    return <div className="Suite">
        <div className='Suite__meta Row'>
            <span
                className="Suite__name"
                data-testid="suite.name"
                onClick={() => setToggle(!toggle)}
            >
                {suite.name}
            </span>
            <StatusBug status={suite.status} />
        </div>
        {toggle && <div className="Suite__specs">
            {specs.map(spec => <li key={spec.id}>
                <SpecView spec={spec} />
            </li>)}
        </div>}
    </div>
}