# Preval test case

# two_objects_one_scope.md

> Object literal > Static prop lookups > Two objects one scope
>
> Trying to catch a problem

Part of the included prettier bundle (originating from the performance.now stuff).

This bug would throw an assertion error "the previous ref should be reachable from the current ref" coming through the objlit_prop sweep in phase2.

If either of the object literals were removed then the problem wouldn't trigger. The `var` was also involved somehow.

The problem of this bug was that a certain kind of scope tracking should have used a fresh state per reference but it was sharing them with others. This test case is forcing that situation because two objects were assigned in the same scope.

## Input

`````js filename=intro
var f = function () {
  let problem1 = x || {};
  problem1.now , y;
  var problem2 = {};
  $(problem2);
};

$(f());
`````


## Settled


`````js filename=intro
let problem1 /*:unknown*/ /*ternaryConst*/ = x;
if (x) {
} else {
  problem1 = {};
}
problem1.now;
y;
const problem2 /*:object*/ = {};
$(problem2);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let problem1 = x;
if (!x) {
  problem1 = {};
}
problem1.now;
y;
$({});
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = x;
if (x) {

}
else {
  a = {};
}
a.now;
y;
const b = {};
$( b );
$( undefined );
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

x, y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
