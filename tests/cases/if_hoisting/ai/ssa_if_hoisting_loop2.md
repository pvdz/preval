# Preval test case

# ssa_if_hoisting_loop2.md

> If hoisting > Ai > Ssa if hoisting loop2
>
> Test if_hoisting and SSA infinite loop: identical var declarations with different names

## Input

`````js filename=intro
const condition = $("condition");
if (condition) {
  let temp1 = 42;
  $(temp1);
} else {
  let temp2 = 42;
  $(temp2);
}
`````


## Settled


`````js filename=intro
$(`condition`);
$(42);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`condition`);
$(42);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "condition" );
$( 42 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const condition = $(`condition`);
if (condition) {
  let temp1 = 42;
  $(temp1);
} else {
  let temp2 = 42;
  $(temp2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'condition'
 - 2: 42
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
