# Preval test case

# closure_before_trapped.md

> Ssa > Closure before trapped
>
> Contrived example

The closure prevents SSA if the function that contains it "escapes"

## Input

`````js filename=intro
function f() {
  const g = function() {
    return x;
  };
  let x = $(5);
  $(x);
  x = $(10);
  $(x);
  // g does not "escape" so we should be able to safely infer it entirely
  $(g());
}
if ($) $(f());
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(5);
  $(x);
  const tmpClusterSSA_x /*:unknown*/ = $(10);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
  $(undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $($(5));
  const tmpClusterSSA_x = $(10);
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  $( a );
  const b = $( 10 );
  $( b );
  $( b );
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const g = function () {
    debugger;
    return x;
  };
  let x = $(5);
  $(x);
  x = $(10);
  $(x);
  let tmpCalleeParam = g();
  $(tmpCalleeParam);
  return undefined;
};
if ($) {
  let tmpCalleeParam$1 = f();
  $(tmpCalleeParam$1);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 10
 - 4: 10
 - 5: 10
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
