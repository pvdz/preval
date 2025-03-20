# Preval test case

# back2back_arr_with_many_refs_var_assign.md

> Ssa > Back2back arr with many refs var assign
>
> Silly case but trying to catch something on a generic level; a double assign where the rhs contains multiple references.

## Input

`````js filename=intro
function f() {
  if ($) {
    let x = $(undefined);
    x = $(2);
    // This assign should be SSA but all the refs in the rhs must keep the same name
    x = [1, x, 2, x, 3, x, 4, x];
    $(x);
    // This bit prevents other optimizations from eliminating the above entirely immediately
    const g = function(){ if ($) $(x); };
    g();
  }
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  $(undefined);
  const x /*:unknown*/ = $(2);
  const tmpSSA_x /*:array*/ = [1, x, 2, x, 3, x, 4, x];
  $(tmpSSA_x);
  if ($) {
    $(tmpSSA_x);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(undefined);
  const x = $(2);
  const tmpSSA_x = [1, x, 2, x, 3, x, 4, x];
  $(tmpSSA_x);
  if ($) {
    $(tmpSSA_x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( undefined );
  const a = $( 2 );
  const b = [ 1, a, 2, a, 3, a, 4, a ];
  $( b );
  if ($) {
    $( b );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 2
 - 3: [1, 2, 2, 2, 3, 2, 4, 2]
 - 4: [1, 2, 2, 2, 3, 2, 4, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
