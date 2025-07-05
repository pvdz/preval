# Preval test case

# ssa_if_hoisting_loop19.md

> If hoisting > Ai > Ssa if hoisting loop19
>
> Test if_hoisting and SSA infinite loop: identical var declarations with binary expressions

## Input

`````js filename=intro
const compute = $("compute");
if (compute) {
  let binary1 = 10 * 5;
  $(binary1);
} else {
  let binary2 = 10 * 5;
  $(binary2);
}
`````


## Settled


`````js filename=intro
$(`compute`);
$(50);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`compute`);
$(50);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "compute" );
$( 50 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const compute = $(`compute`);
if (compute) {
  let binary1 = 50;
  $(binary1);
} else {
  let binary2 = 50;
  $(binary2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'compute'
 - 2: 50
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
