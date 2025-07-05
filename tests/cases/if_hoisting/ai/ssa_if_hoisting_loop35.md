# Preval test case

# ssa_if_hoisting_loop35.md

> If hoisting > Ai > Ssa if hoisting loop35
>
> Test if_hoisting and SSA infinite loop: identical vars used in function calls

## Input

`````js filename=intro
const func = $("func");
if (func) {
  let var1 = 3000;
  $(var1);
  let result1 = Math.abs(var1);
  $(result1);
} else {
  let var2 = 3000;
  $(var2);
  let result2 = Math.abs(var2);
  $(result2);
}
`````


## Settled


`````js filename=intro
$(`func`);
$(3000);
$(3000);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`func`);
$(3000);
$(3000);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "func" );
$( 3000 );
$( 3000 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const func = $(`func`);
if (func) {
  let var1 = 3000;
  $(var1);
  const tmpMCF = $Math_abs;
  let result1 = $Math_abs(var1);
  $(result1);
} else {
  let var2 = 3000;
  $(var2);
  const tmpMCF$1 = $Math_abs;
  let result2 = $Math_abs(var2);
  $(result2);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Math_abs


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'func'
 - 2: 3000
 - 3: 3000
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
