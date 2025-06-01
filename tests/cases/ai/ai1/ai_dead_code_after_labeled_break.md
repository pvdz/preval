# Preval test case

# ai_dead_code_after_labeled_break.md

> Ai > Ai1 > Ai dead code after labeled break
>
> Test: Dead code after a labeled break in a non-loop block should be removed.

## Input

`````js filename=intro
// Expected: L1: { $("one"); break L1; } $("three");
L1: {
  $("one");
  break L1;
  $("two"); // This should be removed
}
$("three");
`````


## Settled


`````js filename=intro
$(`one`);
$(`three`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`one`);
$(`three`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "one" );
$( "three" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`one`);
$(`three`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'one'
 - 2: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
