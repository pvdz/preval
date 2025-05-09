# Preval test case

# if_else_return.md

> One timers > Assign > If else return
>
> Return inlining

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

function f() {
  if ($()) {
    $(1);
  } else {
    return $(2);
  }
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  $(1);
  $(undefined);
  $(undefined);
} else {
  const tmpClusterSSA_x /*:unknown*/ = $(2);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
if ($()) {
  $(1);
  $(undefined);
  $(undefined);
} else {
  const tmpClusterSSA_x = $(2);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $();
if (b) {
  $( 1 );
  $( undefined );
  $( undefined );
}
else {
  const c = $( 2 );
  $( c );
  $( c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
