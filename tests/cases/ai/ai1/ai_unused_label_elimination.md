# Preval test case

# ai_unused_label_elimination.md

> Ai > Ai1 > Ai unused label elimination
>
> Test: Unused LabeledStatement elimination.

## Input

`````js filename=intro
// Expected: let x = $("A"); { $("B"); } $("C", x);
let x = $("A");
LABEL_UNUSED: {
  $("B");
}
$("C", x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`A`);
$(`B`);
$(`C`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`A`);
$(`B`);
$(`C`, x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "A" );
$( "B" );
$( "C", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`A`);
$(`B`);
$(`C`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'A'
 - 2: 'B'
 - 3: 'C', 'A'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
