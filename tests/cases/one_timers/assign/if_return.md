# Preval test case

# if_return.md

> One timers > Assign > If return
>
> Return inlining

## Input

`````js filename=intro
let x = $(100, 'init');
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return $(x, 'closure-return');
}
$(closure(), 'closure-global1');

function f() {
  if ($()) {
    return $(1, 'f-return');
  }
}

x = f(); // This x should not be SSA'd due to the closure
$(x, 'x-global');
$(closure(), 'closure-global2');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100, `init`);
const tmpCalleeParam /*:unknown*/ = $(x, `closure-return`);
$(tmpCalleeParam, `closure-global1`);
let tmpClusterSSA_x /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:unknown*/ = $();
if (tmpIfTest) {
  tmpClusterSSA_x = $(1, `f-return`);
  $(tmpClusterSSA_x, `x-global`);
} else {
  $(undefined, `x-global`);
}
const tmpCalleeParam$1 /*:unknown*/ = $(tmpClusterSSA_x, `closure-return`);
$(tmpCalleeParam$1, `closure-global2`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($(100, `init`), `closure-return`), `closure-global1`);
let tmpClusterSSA_x = undefined;
if ($()) {
  tmpClusterSSA_x = $(1, `f-return`);
  $(tmpClusterSSA_x, `x-global`);
} else {
  $(undefined, `x-global`);
}
$($(tmpClusterSSA_x, `closure-return`), `closure-global2`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100, "init" );
const b = $( a, "closure-return" );
$( b, "closure-global1" );
let c = undefined;
const d = $();
if (d) {
  c = $( 1, "f-return" );
  $( c, "x-global" );
}
else {
  $( undefined, "x-global" );
}
const e = $( c, "closure-return" );
$( e, "closure-global2" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100, 'init'
 - 2: 100, 'closure-return'
 - 3: 100, 'closure-global1'
 - 4: 
 - 5: undefined, 'x-global'
 - 6: undefined, 'closure-return'
 - 7: undefined, 'closure-global2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
