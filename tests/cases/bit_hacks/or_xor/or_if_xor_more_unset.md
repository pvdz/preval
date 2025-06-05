# Preval test case

# or_if_xor_more_unset.md

> Bit hacks > Or xor > Or if xor more unset
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

## Input

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $('then');
} else {
  $('else');
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(3);
x ** 0;
const tmpClusterSSA_x /*:number*/ = x ^ 32;
$(`then`);
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(3);
x ** 0;
const tmpClusterSSA_x = x ^ 32;
$(`then`);
$(tmpClusterSSA_x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
a ** 0;
const b = a ^ 32;
$( "then" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $(`then`);
  $(x);
} else {
  $(`else`);
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 'then'
 - 3: 35
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
