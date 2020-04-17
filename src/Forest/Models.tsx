import { RootNode, ContainerNode, DescribeNode, AssertNode, HookNode, TestStep } from '@packages/tr-common';
export type Status = 'unknown' | 'running' | 'failed' | 'passed' | 'skipped'
export type ID = string

export type Project = Spec[]
export type Spec = RootNode // todo: PlanStep[]
export type Group = DescribeNode
export type Leaf = AssertNode //| HookNode

// export type SidebarRow = TestStep

// type PlanStep = // basic entity
// export abstract class Entity {
//    abstract kind: string;
//    constructor(public name: string, public id: ID) {}
// //    get pretty() { return `${this.name} (${this.kind}:${this.id})`}
// //    abstract get children(): Entity[];
// //    get status() {}
// }

// // expect(...)
// export class Leaf extends Entity {
//     kind = 'leaf'
//     status: Status = 'unknown'
//     children = []
// }

// type Node = Leaf | Group
// // test group (describe/context/its)
// export class Group extends Entity {
//     kind = 'group'
//     nodes: Node[] = []
//     status: Status = 'unknown';
//     get leaves(): Leaf[] {
//         return this.nodes.flatMap(node => node instanceof Leaf ? [node] : node.leaves)
//     };
// }

// // a test file
// export class Spec extends Entity {
//     kind = 'spec'
//     groups: Group[] = []
//     status: Status = 'unknown';
//     get leaves(): Leaf[] {
//         return this.groups.flatMap(g => g.leaves)
//     };
// }

// // agg root
// export class Project extends Entity {
//     kind = 'project'
//     status: Status = 'unknown'

//     // list of test files
//     specs: Spec[] = []
//     get leaves(): Leaf[] {
//         return this.specs.flatMap(spec => spec.leaves)
//     };
// }

// // evts

// export type ForestEventKind = 'project:updated'
//                      | 'project:run-started'
//                      | 'spec:run-started'
//                      | 'group:run-started'
//                      | 'leaf:exec-started'
//                      | 'leaf:exec-passed'
//                      | 'leaf:exec-failed'

// export type ProjectRunStarted = { kind: 'project:run-started' }
// export type ProjectUpdated = { kind: 'project:updated', suite: Project }
// export type ProjectEvent = ProjectRunStarted | ProjectUpdated

// export type GroupRunStarted = { kind: 'group:run-started', groupId: ID }
// export type GroupEvent = GroupRunStarted

// export type SpecRunStartedEvent = { kind: 'spec:run-started', specId: ID }
// export type SpecEvent = SpecRunStartedEvent

// export type LeafExecutionEvent = { leafId: ID }
// export type LeafExecutionStarted = LeafExecutionEvent & { kind: 'leaf:exec-started'}
// export type LeafExecutionPassed = LeafExecutionEvent & { kind: 'leaf:exec-passed' }
// export type LeafExecutionFailed = LeafExecutionEvent & { kind: 'leaf:exec-failed' }
// export type LeafEvent = LeafExecutionStarted
//                       | LeafExecutionPassed
//                       | LeafExecutionFailed

// export type ForestEvent = ProjectEvent
//                         | SpecEvent
//                         | GroupEvent
//                         | LeafEvent

