# Preval test case

# phase1_label_store.md

> Normalize > Label > Phase1 label store
>
> Regression

This is a minimal test case that somehow uncovered that the label store
was not properly set in phase1 (only in prepare).

## Input

`````js filename=intro
const f = function (x) {
  while (1) {
    let t = 1;
    if (3 === s) t = 0;
    stop: {
      break stop;
    }
  }
  x + 1;
};
f();
f();
`````


## Settled


`````js filename=intro
s;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
s;
`````


## PST Settled
With rename=true

`````js filename=intro
s;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function ($$0) {
  let x = $$0;
  debugger;
  while (true) {
    let t = 1;
    const tmpIfTest = 3 === s;
    if (tmpIfTest) {
      t = 0;
    } else {
    }
  }
  return undefined;
};
f();
f();
`````


## Todos triggered


- (todo) Support this node type in isFree: DebuggerStatement
- (todo) do we want to support BinaryExpression as expression statement in free loops?


## Globals


BAD@! Found 1 implicit global bindings:

s


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
