# Preval test case

# ssa_if_hoisting_loop3.md

> If hoisting > Ai > Ssa if hoisting loop3
>
> Test if_hoisting and SSA infinite loop: identical var declarations with complex init

## Input

`````js filename=intro
const flag = $("flag");
if (flag) {
  let result = 10 + 20;
  $(result);
} else {
  let output = 10 + 20;
  $(output);
}
`````


## Settled


`````js filename=intro
$(`flag`);
$(30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`flag`);
$(30);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "flag" );
$( 30 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const flag = $(`flag`);
if (flag) {
  let result = 30;
  $(result);
} else {
  let output = 30;
  $(output);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'flag'
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
