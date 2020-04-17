import React from "react";
import { Leaf } from "../Models";
import StatusBug from "./StatusBug";

export class LeafView extends React.Component<{ leaf: Leaf; }> {
    render() {
        let { leaf } = this.props;
        return <div className="Leaf">
            <div className="Leaf__meta Row">
                <span data-testid="leaf.name">{leaf.label}</span>
                {/* <StatusBug status={leaf.status} /> */}
            </div>
        </div>;
    }
}
