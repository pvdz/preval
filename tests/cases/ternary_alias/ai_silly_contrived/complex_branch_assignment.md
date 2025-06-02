# Preval test case

# complex_branch_assignment.md

> Ternary alias > Ai silly contrived > Complex branch assignment
>
> Assignment to a and tmpArrSpread only in one branch: should NOT alias

## Input

`````js filename=intro
let a = undefined;
let tmpArrSpread = undefined;
let cond = $(true);
if (cond) {
  // nothing
} else {
  a = 42;
  tmpArrSpread = a;
}
const arr = [...tmpArrSpread];
$(arr);
$(a);
// Expect: No aliasing, because a and tmpArrSpread are only assigned in one branch.
`````


## Settled


`````js filename=intro
let a /*:primitive*/ /*ternaryConst*/ = undefined;
const cond /*:unknown*/ = $(true);
if (cond) {
} else {
  a = 42;
}
const arr /*:array*/ = [...a];
$(arr);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if (!$(true)) {
  a = 42;
}
$([...a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( true );
if (b) {

}
else {
  a = 42;
}
const c = [ ...a ];
$( c );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let tmpArrSpread = undefined;
let cond = $(true);
if (cond) {
} else {
  a = 42;
  tmpArrSpread = a;
}
const arr = [...tmpArrSpread];
$(arr);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
