# Preval test case

# ssa_if_hoisting_loop40.md

> If hoisting > Ai > Ssa if hoisting loop40
>
> Test if_hoisting and SSA infinite loop: identical vars used in comparison expressions

## Input

`````js filename=intro
const compare = $("compare");
if (compare) {
  let var1 = 100;
  $(var1);
  let result1 = var1 > 50;
  $(result1);
} else {
  let var2 = 100;
  $(var2);
  let result2 = var2 > 50;
  $(result2);
}
`````


## Settled


`````js filename=intro
$(`compare`);
$(100);
$(true);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`compare`);
$(100);
$(true);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "compare" );
$( 100 );
$( true );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const compare = $(`compare`);
if (compare) {
  let var1 = 100;
  $(var1);
  let result1 = var1 > 50;
  $(result1);
} else {
  let var2 = 100;
  $(var2);
  let result2 = var2 > 50;
  $(result2);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'compare'
 - 2: 100
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
