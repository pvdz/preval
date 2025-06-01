# Preval test case

# ai_if_identical_dollar_branches.md

> Ai > Ai1 > Ai if identical dollar branches
>
> Test: Redundant if statement with identical then and else branches with $() calls.

## Input

`````js filename=intro
// Expected: $('cond'); $('A'); $('B');
if ($('cond')) {
  $('A');
} else {
  $('A');
}
$('B');
`````


## Settled


`````js filename=intro
$(`cond`);
$(`A`);
$(`B`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`cond`);
$(`A`);
$(`B`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "cond" );
$( "A" );
$( "B" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = $(`cond`);
if (tmpIfTest) {
  $(`A`);
  $(`B`);
} else {
  $(`A`);
  $(`B`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'cond'
 - 2: 'A'
 - 3: 'B'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
