import React from "react";
import { Project } from "../Models";
// import { SuiteView } from "./SuiteView";
import { SpecView } from "./SpecView";

/**
 * test tree presenter is a 'canopy' or main overview of all products health
 *
 */
type Props = { project: Project }
export class TestTreeView extends React.Component<Props> {
    render() {
        let { project } = this.props
        return <div className="TestTree">
            {project.map(spec => <SpecView spec={spec} />)}
        </div>;
    }
}
