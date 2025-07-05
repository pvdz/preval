# Preval test case

# ssa_if_hoisting_loop6.md

> If hoisting > Ai > Ssa if hoisting loop6
>
> Test if_hoisting and SSA infinite loop: identical var declarations with array literals

## Input

`````js filename=intro
const valid = $("valid");
if (valid) {
  let arr1 = [1, 2, 3];
  $(arr1);
} else {
  let arr2 = [1, 2, 3];
  $(arr2);
}
`````


## Settled


`````js filename=intro
$(`valid`);
const arr1 /*:array*/ /*truthy*/ = [1, 2, 3];
$(arr1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`valid`);
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "valid" );
const a = [ 1, 2, 3 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const valid = $(`valid`);
if (valid) {
  let arr1 = [1, 2, 3];
  $(arr1);
} else {
  let arr2 = [1, 2, 3];
  $(arr2);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'valid'
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
