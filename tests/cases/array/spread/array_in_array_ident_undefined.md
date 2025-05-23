# Preval test case

# array_in_array_ident_undefined.md

> Array > Spread > Array in array ident undefined
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
let a = $(10);
const x = [1, undefined, 3];
if ($) a = $(20);
const y = ['a', ...x, 'b'];
$(y);
`````


## Settled


`````js filename=intro
$(10);
if ($) {
  $(20);
} else {
}
const y /*:array*/ = [`a`, 1, undefined, 3, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
if ($) {
  $(20);
}
$([`a`, 1, undefined, 3, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
if ($) {
  $( 20 );
}
const a = [ "a", 1, undefined, 3, "b" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = $(10);
const x = [1, undefined, 3];
if ($) {
  a = $(20);
} else {
}
const y = [`a`, ...x, `b`];
$(y);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: ['a', 1, undefined, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
