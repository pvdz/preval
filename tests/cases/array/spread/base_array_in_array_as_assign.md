# Preval test case

# base_array_in_array_as_assign.md

> Array > Spread > Base array in array as assign
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
const x = [1, 2, 3];
let y = [];
if ($) {
  y = ['a', ...x, 'b'];
} 
$(y);
`````


## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_y /*:array*/ /*truthy*/ = [`a`, 1, 2, 3, `b`];
  $(tmpClusterSSA_y);
} else {
  const y /*:array*/ /*truthy*/ = [];
  $(y);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $([`a`, 1, 2, 3, `b`]);
} else {
  $([]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = [ "a", 1, 2, 3, "b" ];
  $( a );
}
else {
  const b = [];
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = [1, 2, 3];
let y = [];
if ($) {
  y = [`a`, ...x, `b`];
  $(y);
} else {
  $(y);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['a', 1, 2, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
