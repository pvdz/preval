# Preval test case

# ssa_if_hoisting_loop9.md

> If hoisting > Ai > Ssa if hoisting loop9
>
> Test if_hoisting and SSA infinite loop: identical var declarations with null literals

## Input

`````js filename=intro
const ready = $("ready");
if (ready) {
  let null1 = null;
  $(null1);
} else {
  let null2 = null;
  $(null2);
}
`````


## Settled


`````js filename=intro
$(`ready`);
$(null);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`ready`);
$(null);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "ready" );
$( null );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const ready = $(`ready`);
if (ready) {
  let null1 = null;
  $(null1);
} else {
  let null2 = null;
  $(null2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ready'
 - 2: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
