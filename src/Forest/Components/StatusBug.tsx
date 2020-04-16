import React from "react";
import { Status } from "../Models";
import assertNever from "assert-never";

export default class StatusBug extends React.Component<{ status: Status }> {
    get icon() {
        let it = '-';
        switch(this.props.status) {
            case 'passed': it = '✔'; break
            case 'running': it = '🚲'; break
            case 'failed': it = '❌'; break
            case 'skipped': it = '🟡'; break
            case 'unknown': it = '❓'; break

            default: assertNever(this.props.status);
        }
        return it;
    }
    render() {
        let { status } = this.props;
        return <span className={`Status Status--${String(status)}`}>
            {this.icon}
        </span>
    }
}