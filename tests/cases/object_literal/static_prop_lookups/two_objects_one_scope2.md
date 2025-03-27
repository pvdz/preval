# Preval test case

# two_objects_one_scope2.md

> Object literal > Static prop lookups > Two objects one scope2
>
> Trying to catch a problem

Part of the included prettier bundle (originating from the performance.now stuff).

This bug would throw an assertion error "the previous ref should be reachable from the current ref" coming through the objlit_prop sweep in phase2.

The problem of this bug was that a certain kind of scope tracking should have used a fresh state per reference but it was sharing them with others. This test case is forcing that situation because two objects were assigned in the same scope.

## Input

`````js filename=intro
let problem2 = undefined;
let problem1 = undefined;
if (problem1) {
} else {
  problem1 = {};
}
problem1.now;
problem2 = {};
$(problem2);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_problem2 /*:object*/ = {};
$(tmpClusterSSA_problem2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
