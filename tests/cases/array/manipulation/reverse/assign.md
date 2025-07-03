# Preval test case

# assign.md

> Array > Manipulation > Reverse > Assign
>
> Simple case

## Input

`````js filename=intro
let arr = [1, 2];
const rra = arr.reverse();
if ($) {
  arr = $
}
$(rra);
`````


## Settled


`````js filename=intro
const arr /*:array*/ /*truthy*/ = [2, 1];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([2, 1]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 2, 1 ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = [1, 2];
const tmpMCF = arr.reverse;
const rra = $dotCall(tmpMCF, arr, `reverse`);
if ($) {
  arr = $;
  $(rra);
} else {
  $(rra);
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [2, 1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
