# Preval test case

# reassign_obj_computed.md

> Object literal > Static prop lookups > Reassign obj computed
>
> Double check whether this can't be broken

## Input

`````js filename=intro
let a = 1;
let b = {
    [c]()  { b = undefined; },
};
let d = 3;
// This should _NOT_ crash. Despite all attempts to set b to null.
b.c = d;
// b should end up being null, d should end up being null, a should be 3.
$(a, b, d);
`````


## Settled


`````js filename=intro
let b /*:unknown*/ = {
  [c]() {
    debugger;
    b = undefined;
    return undefined;
  },
};
b.c = 3;
$(1, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let b = {
  [c]() {
    b = undefined;
  },
};
b.c = 3;
$(1, b, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = { [ c ](  ) {
  debugger;
  a = undefined;
  return undefined;
}, };
a.c = 3;
$( 1, a, 3 );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
