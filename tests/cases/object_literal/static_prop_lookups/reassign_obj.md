# Preval test case

# reassign_obj.md

> Object literal > Static prop lookups > Reassign obj
>
> Double check whether this can't be broken

## Input

`````js filename=intro
let a = 1;
let b = {
    c()  { b = undefined; },
};
let d = 3;
// This should _NOT_ crash. Despite all attempts to set b to null.
b.c = d;
// b should end up being null, d should end up being null, a should be 3.
$(a, b, d);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { c: 3 };
$(1, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, { c: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { c: 3 };
$( 1, a, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
let b = {
  c() {
    debugger;
    b = undefined;
    return undefined;
  },
};
let d = 3;
b.c = d;
$(a, b, d);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, { c: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
