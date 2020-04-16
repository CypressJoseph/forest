// import assertNever from 'assert-never';
import { Project, ForestEvent, ProjectUpdated, Spec, Group, Leaf } from './Models';


export type State = { suite: Project }
let fakeExpect = new Leaf("expect(working).toBe(true)", 'leaf:-1')

let fakeDescribe = new Group("When I open the product", 'group:-1')
let fakeNestedDescribe = new Group("And I look at it", 'group:-2')
let fakeIts = new Group("Then it should be working", 'group:-3')

fakeIts.nodes.push(fakeExpect)
fakeNestedDescribe.nodes.push(fakeIts)
fakeDescribe.nodes.push(fakeNestedDescribe)

let fakeSpec = new Spec("The product should have a feature", 'spec:-1')
fakeSpec.groups.push(fakeDescribe)

let nullProject: Project = new Project('(no project)', 'project:null') 
let fakeProject: Project = new Project('my-first-project', 'project:-1')
fakeProject.specs.push(fakeSpec)

export const initialState = { suite: nullProject }

export const fakeEvents: ForestEvent[] = [
    { kind: 'project:updated', suite: fakeProject },
    { kind: 'leaf:exec-started', leafId: 'leaf:-1' },
    { kind: 'leaf:exec-passed', leafId: 'leaf:-1' }
]

const eventHandlerNotImplemented = (e: ForestEvent) => {
    console.warn("Handler not impl for event: " + e.kind)
}

export function update(state: State, event: ForestEvent): State {
    let { suite } = state;
    let newState = { suite };
    // let kind: ForestEventKind = event.kind
    switch(event.kind) {
        case 'project:updated':
            newState.suite = (event as ProjectUpdated).suite
            break
        case 'project:run-started':
            newState.suite.status = 'running' // hmmm
            break
        case 'group:run-started':  eventHandlerNotImplemented(event); break;
        case 'spec:run-started':  eventHandlerNotImplemented(event); break;
        case 'leaf:exec-started':
            let leaf: Leaf | undefined = suite.leaves.find(leaf => leaf.id === event.leafId)
            if (leaf) {
                leaf.status = 'running'
            }
            break;
        case 'leaf:exec-passed':
            let lf: Leaf | undefined = suite.leaves.find(leaf => leaf.id === event.leafId)
            if (lf) {
                lf.status = 'passed'
            }
            break;
        case 'leaf:exec-failed':  eventHandlerNotImplemented(event); break;
        default: 
            // throw UnreachableCaseError(event.kind)
            break //assertNever(kind);
    }

    return newState;
}