import React from "react";
import { Project } from "../Models";
import { SuiteView } from "./SuiteView";

/**
 * test tree presenter is a 'canopy' or main overview of all products health
 *
 */
type Props = { suite: Project }
export class TestTreeView extends React.Component<Props> {
    render() {
        let { suite } = this.props
        return <div className="TestTree">
            <SuiteView suite={suite} />
        </div>;
    }
}
