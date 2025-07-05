# Preval test case

# ssa_if_hoisting_loop32.md

> If hoisting > Ai > Ssa if hoisting loop32
>
> Test if_hoisting and SSA infinite loop: identical vars used in subsequent statements

## Input

`````js filename=intro
const used = $("used");
if (used) {
  let var1 = 500;
  $(var1);
  let result1 = var1 * 2;
  $(result1);
} else {
  let var2 = 500;
  $(var2);
  let result2 = var2 * 2;
  $(result2);
}
`````


## Settled


`````js filename=intro
$(`used`);
$(500);
$(1000);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`used`);
$(500);
$(1000);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "used" );
$( 500 );
$( 1000 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const used = $(`used`);
if (used) {
  let var1 = 500;
  $(var1);
  let result1 = var1 * 2;
  $(result1);
} else {
  let var2 = 500;
  $(var2);
  let result2 = var2 * 2;
  $(result2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'used'
 - 2: 500
 - 3: 1000
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
