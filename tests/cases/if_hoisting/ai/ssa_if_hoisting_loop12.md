# Preval test case

# ssa_if_hoisting_loop12.md

> If hoisting > Ai > Ssa if hoisting loop12
>
> Test if_hoisting and SSA infinite loop: identical vars with additional statements

## Input

`````js filename=intro
const state = $("state");
if (state) {
  let var1 = 50;
  $(var1);
  let extra1 = 25;
  $(extra1);
} else {
  let var2 = 50;
  $(var2);
  let extra2 = 25;
  $(extra2);
}
`````


## Settled


`````js filename=intro
$(`state`);
$(50);
$(25);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`state`);
$(50);
$(25);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "state" );
$( 50 );
$( 25 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const state = $(`state`);
if (state) {
  let var1 = 50;
  $(var1);
  let extra1 = 25;
  $(extra1);
} else {
  let var2 = 50;
  $(var2);
  let extra2 = 25;
  $(extra2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'state'
 - 2: 50
 - 3: 25
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
