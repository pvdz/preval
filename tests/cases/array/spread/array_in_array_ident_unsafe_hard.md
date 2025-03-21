# Preval test case

# array_in_array_ident_unsafe_hard.md

> Array > Spread > Array in array ident unsafe hard
>
> Spreading an array into another array that is assigned to a binding

## Input

`````js filename=intro
let a = $(10);
const x = [1, a, 3];
if ($) a = $(20);
const y = ['a', ...x, 'b'];
$(y);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(10);
if ($) {
  $(20);
} else {
}
const y /*:array*/ = [`a`, 1, a, 3, `b`];
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(10);
if ($) {
  $(20);
}
$([`a`, 1, a, 3, `b`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
if ($) {
  $( 20 );
}
const b = [ "a", 1, a, 3, "b" ];
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: ['a', 1, 10, 3, 'b']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
