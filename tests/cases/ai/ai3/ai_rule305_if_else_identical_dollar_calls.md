# Preval test case

# ai_rule305_if_else_identical_dollar_calls.md

> Ai > Ai3 > Ai rule305 if else identical dollar calls
>
> Rule 305: If/else branches with identical opaque effect calls

## Input

`````js filename=intro
// Expected: Preval might hoist the common effect call, or at least preserve the branching structure.
// It's considered "Not Covered" if the effect call isn't hoisted, but structurally correct otherwise.

(function() {
  let r;
  if ($('cond')) {
    r = $('effect');
  } else {
    r = $('effect');
  }
  $('final_r', r);
})();
`````


## Settled


`````js filename=intro
$(`cond`);
const tmpClusterSSA_r /*:unknown*/ = $(`effect`);
$(`final_r`, tmpClusterSSA_r);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`cond`);
$(`final_r`, $(`effect`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "cond" );
const a = $( "effect" );
$( "final_r", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let r = undefined;
  const tmpIfTest = $(`cond`);
  if (tmpIfTest) {
    r = $(`effect`);
    $(`final_r`, r);
    return undefined;
  } else {
    r = $(`effect`);
    $(`final_r`, r);
    return undefined;
  }
};
tmpCallComplexCallee();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'effect'
 - 3: 'final_r', 'effect'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
